import * as React from "react";

import DiscreteLink from "../../../ui/link/DiscreteLink";
import PrimaryButton from "../../../ui/button/PrimaryButton";
import { isValidEmail } from "../util/signupUtils";

const styles = require("../../login/component/LoginForm.css");

interface Props {
  handleSubmit: (email: string, password: string) => void;
  submitError: string;
}

interface State {
  showSubmitError: boolean;
  currentEmail: string;
  currentPassword: string;
  currentConfirmPassword: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
}

class SignupFormDumb extends React.Component<Props, State> {
  state = {
    showSubmitError: false,
    currentEmail: "",
    currentPassword: "",
    currentConfirmPassword: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: ""
  };

  constructor(props: Props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
  }

  componentDidMount() {
    // Required for browser autofill value to be used as valid form value
    const domEmailValue = this.emailRef.current.value;
    const domPasswordValue = this.passwordRef.current.value;
    const domConfirmPasswordValue = this.confirmPasswordRef.current.value;

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

    if (domConfirmPasswordValue !== this.state.currentConfirmPassword) {
      this.setState({
        currentConfirmPassword: domConfirmPasswordValue
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { submitError } = this.props;
    const {
      showSubmitError,
      currentEmail,
      currentPassword,
      currentConfirmPassword,
      emailError,
      passwordError,
      confirmPasswordError
    } = this.state;

    const isPasswordTooShort = currentPassword.length < 6;

    //  Submit error removal
    if (
      currentEmail !== prevState.currentEmail &&
      submitError &&
      showSubmitError
    ) {
      this.setState({
        showSubmitError: false
      });
    }

    // Email Validation
    if (currentEmail && !isValidEmail(currentEmail) && !emailError) {
      this.setState({
        emailError: "Your email is not valid."
      });
    } else if (
      currentEmail &&
      !isValidEmail(prevState.currentEmail) &&
      isValidEmail(currentEmail)
    ) {
      this.setState({
        emailError: ""
      });
    }

    // Password Validation
    if (currentPassword && isPasswordTooShort && !passwordError) {
      this.setState({
        passwordError: "Your password must be at least 6 characters."
      });
    } else if (currentPassword && !isPasswordTooShort && passwordError) {
      this.setState({
        passwordError: ""
      });
    }

    // Confirm Password Validation
    if (
      currentConfirmPassword &&
      currentConfirmPassword !== currentPassword &&
      !confirmPasswordError
    ) {
      this.setState({
        confirmPasswordError: "Your passwords don't match."
      });
    } else if (
      currentConfirmPassword &&
      currentConfirmPassword === currentPassword &&
      confirmPasswordError
    ) {
      this.setState({
        confirmPasswordError: ""
      });
    }
  }

  render() {
    const { submitError } = this.props;
    const {
      showSubmitError,
      currentEmail,
      currentPassword,
      currentConfirmPassword,
      emailError,
      passwordError,
      confirmPasswordError
    } = this.state;

    const isPasswordTooShort = currentPassword.length < 6;

    // Elements
    const emailErrorElt = emailError && currentEmail && (
      <div className={styles.error}>{emailError}</div>
    );

    const passwordErrorElt = currentPassword && passwordError && (
      <div className={styles.error}>{passwordError}</div>
    );

    const confirmPasswordErrorElt = currentConfirmPassword &&
      confirmPasswordError && (
        <div className={styles.error}>{confirmPasswordError}</div>
      );

    const submitErrorElt = submitError && showSubmitError && (
      <div className={styles.submitError}>{submitError}</div>
    );

    // conditions
    const isFormNotFilled =
      !currentEmail || !currentPassword || !currentConfirmPassword;

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
            placeholder="Email used to login"
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
            placeholder="Min. 6 characters"
            ref={this.passwordRef}
          />
          {passwordErrorElt}
        </div>
        <div className={styles.section}>
          <label htmlFor="confirm-password">Confirm Password </label>
          <input
            className={styles.input}
            name="confirm-password"
            type="password"
            onChange={this.onConfirmPasswordChange}
            value={currentConfirmPassword}
          />
          {confirmPasswordErrorElt}
        </div>
        <div className={styles.errorSection}>{submitErrorElt}</div>
        <div className={styles.footer}>
          <DiscreteLink href="/login">Already have an account?</DiscreteLink>
          <PrimaryButton
            positionClass={styles.submitBtn}
            handleClick={this.onSubmit}
            ref={this.confirmPasswordRef}
            isDisabled={
              isFormNotFilled ||
              currentConfirmPassword !== currentPassword ||
              isPasswordTooShort
            }
          >
            Register
          </PrimaryButton>
        </div>
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

  onConfirmPasswordChange(e: Event) {
    this.setState({
      currentConfirmPassword: e.target.value
    });
  }

  onSubmit() {
    const {
      currentEmail,
      currentPassword,
      currentConfirmPassword,
      error
    } = this.state;

    this.setState({
      showSubmitError: true
    });

    this.props.handleSubmit(currentEmail, currentPassword);
  }
}

export default SignupFormDumb;
