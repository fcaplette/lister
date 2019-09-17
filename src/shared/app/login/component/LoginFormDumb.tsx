import * as React from "react";

import DiscreteLink from "../../../ui/link/DiscreteLink";
import Notification from "../../notification/component/Notification";
import PrimaryButton from "../../../ui/button/PrimaryButton";
import { isValidEmail } from "../../signup/util/signupUtils";
import { string } from "prop-types";

const styles = require("./LoginForm.css");

interface Props {
  handleSubmit: (email: string, password: string) => void;
  hasNotification: boolean;
}

interface State {
  currentEmail: string;
  currentPassword: string;
  emailError: string;
}

class LoginFormDumb extends React.Component<Props, State> {
  state = {
    currentEmail: "",
    currentPassword: "",
    emailError: ""
  };

  constructor(props: Props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  componentDidMount() {
    // Required for browser autofill
    const domEmailValue = this.emailRef.current.value;
    const domPasswordValue = this.passwordRef.current.value;

    if (domEmailValue !== this.state.currentEmail) {
      this.setState({
        currentEmail: domEmailValue
      });
    }

    if (domPasswordValue !== this.state.currentPassword) {
      this.setState({
        currentPassword: domPasswordValue
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentEmail, emailError } = this.state;

    if (currentEmail && !isValidEmail(currentEmail) && !emailError) {
      this.setState({
        emailError: "This is not a valid email."
      });
    }
  }

  render() {
    const { currentEmail, currentPassword, emailError } = this.state;
    const { submitError, hasNotification } = this.props;

    const emailErrorElt = emailError && (
      <span className={styles.error}>{emailError}</span>
    );

    const submitErrorElt = submitError && (
      <span className={styles.error}>{submitError}</span>
    );

    const notifcationElt = hasNotification && <Notification />;

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
            ref={this.emailRef}
          />
          {emailErrorElt}
        </div>
        <div className={styles.section}>
          <label htmlFor="password">Password </label>
          <input
            className={styles.input}
            name="password"
            type="password"
            onChange={this.onPasswordChange}
            value={currentPassword}
            ref={this.passwordRef}
          />
          {submitErrorElt}
        </div>
        <DiscreteLink href="/signup">Don't have an account?</DiscreteLink>
        <PrimaryButton
          positionClass={styles.submitBtn}
          handleClick={this.onSubmit}
          isDisabled={
            !currentPassword || !currentEmail || !isValidEmail(currentEmail)
          }
        >
          Login
        </PrimaryButton>
        {notifcationElt}
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
