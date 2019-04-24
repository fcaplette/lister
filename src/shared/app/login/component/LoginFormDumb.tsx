import * as React from "react";
import PrimaryButton from "../../../ui/button/PrimaryButton";
import DiscreteLink from "../../../ui/link/DiscreteLink";

const styles = require("./LoginForm.css");

interface Props {
  handleSubmit: (email: string, password: string) => void;
}

interface State {
  currentEmail: string;
  currentPassword: string;
}

class LoginFormDumb extends React.Component<Props, State> {
  state = {
    currentEmail: "",
    currentPassword: ""
  };

  constructor(props: Props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  render() {
    const { currentEmail, currentPassword } = this.props;

    return (
      <form className={styles.root}>
        <div className={styles.section}>
          <label htmlFor="email">Email </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            onChange={this.onEmailChange}
            value={currentEmail}
          />
        </div>
        <div className={styles.section}>
          <label htmlFor="password">Password </label>
          <input
            className={styles.input}
            name="password"
            type="password"
            onChange={this.onPasswordChange}
            value={currentPassword}
          />
        </div>
        <DiscreteLink href="/signup">Don't have an account?</DiscreteLink>
        <PrimaryButton
          positionClass={styles.submitBtn}
          handleClick={this.onSubmit}
        >
          Login{" "}
        </PrimaryButton>
      </form>
    );
  }

  onEmailChange(e: Event) {
    this.setState({
      currentEmail: e.target.value
    });
  }

  onPasswordChange(e: Event) {
    this.setState({
      currentPassword: e.target.value
    });
  }

  onSubmit() {
    const { currentEmail, currentPassword } = this.state;

    this.props.handleSubmit(currentEmail, currentPassword);
  }
}

export default LoginFormDumb;
