import classNames from "classnames";
import * as React from "react";
import SecondaryButton from "../../../ui/button/SecondaryButton";
import { SHOW_ALL } from "../constant/todoConstants";

const styles = require("./TodoItem.css");

interface Props {
  id: number;
  text: string;
  isCompleted: boolean;
  handleToggleTodo: (id: number) => void;
  visibilityFilter: string;
}

interface State {
  isEditModalShown: boolean;
  isFadingOut: boolean;
}

export default class TodoItem extends React.Component<Props> {
  state = {
    isEditModalShown: false,
    isFadingOut: false
  };

  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  render() {
    const { text, isCompleted, visibilityFilter } = this.props;
    const { isFadingOut } = this.state;

    // Classes

    const rootClasses = classNames(styles.root, {
      [styles["root-isVisible"]]: !isFadingOut || visibilityFilter === SHOW_ALL
    });

    const checkClasses = classNames(styles.check, {
      [styles["check-isCompleted"]]: isCompleted || isFadingOut
    });

    return (
      <li className={rootClasses}>
        <button className={checkClasses} onClick={this.onClick} />
        {text}
      </li>
    );
  }

  onClick() {
    const { id, handleToggleTodo, visibilityFilter } = this.props;

    if (visibilityFilter === SHOW_ALL) {
      handleToggleTodo(id);
    } else {
      this.setState({
        isFadingOut: true
      });

      setTimeout(() => {
        handleToggleTodo(id);

        this.setState({
          isFadingOut: false
        });
      }, 500);
    }
  }

  onEditClick() {
    this.setState({
      isEditModalShown: true
    });
  }
}
