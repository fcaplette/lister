import * as React from "react";

import classNames from "classnames";

const styles = require("./TextInput.css");

interface Props {
  value: string;
  positionClass?: string;
  isFocused?: boolean;
  maxLength?: number;
  handleChange: (value: string) => void;
  handleClose?: () => void;
  placeholder?: string;
}

interface State {
  currentValue: string;
  isActive: boolean;
}

export default class TextInput extends React.Component<Props, State> {
  state = {
    currentValue: this.props.value,
    isActive: false
  };

  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.isFocused) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { placeholder, value, maxLength } = this.props;
    const { currentValue, isActive } = this.state;

    // Classes
    const borderClasses = classNames(styles.border, {
      [styles["border-isActive"]]: isActive
    });

    return (
      <div className={styles.root}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          ref={this.inputRef}
        />
        <span className={borderClasses} />
      </div>
    );
  }

  onChange(e) {
    this.setState({
      currentValue: e.target.value
    });

    this.props.handleChange(e.target.value);
  }

  onFocus() {
    this.setState({
      isActive: true
    });
  }

  onBlur() {
    this.setState({
      isActive: false
    });

    this.props.handleClose();
  }
}
