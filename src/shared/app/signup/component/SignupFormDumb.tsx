import * as React from "react";

import DiscreteLink from "../../../ui/link/DiscreteLink";
import PrimaryButton from "../../../ui/button/PrimaryButton";

const styles = require("../../login/component/LoginForm.css");

interface Props {
  handleSubmit: (email: string, password: string) => void;
  submitError: string;
}

interface State {
  currentEmail: string;
  currentPassword: string;
  currentConfirmPassword: string;
  error: string;
}

class SignupFormDumb extends React.Component<Props, State> {
  state = {
    currentEmail: "",
    currentPassword: "",
    currentConfirmPassword: "",
    error: ""
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

  render() {
    const { submitError } = this.props;
    const {
      currentEmail,
      currentPassword,
      currentConfirmPassword,
      error
    } = this.state;

    // Elements
    const errorElt = error && <span className={styles.error}>{error}</span>;
    const submitErrorElt = submitError && (
      <span className={styles.error}>{submitError}</span>
    );

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
          {submitErrorElt}
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
          {errorElt}
        </div>
        <DiscreteLink href="/login">Already have an account?</DiscreteLink>
        <PrimaryButton
          positionClass={styles.submitBtn}
          handleClick={this.onSubmit}
          ref={this.confirmPasswordRef}
        >
          Register
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
      currentPassword: e.target.value,
      error: ""
    });
  }

  onConfirmPasswordChange(e: Event) {
    this.setState({
      currentConfirmPassword: e.target.value,
      error: ""
    });
  }

  onSubmit() {
    const {
      currentEmail,
      currentPassword,
      currentConfirmPassword
    } = this.state;

    if (currentConfirmPassword !== currentPassword) {
      this.setState({
        error: "Your passwords don't match."
      });
    } else {
      this.props.handleSubmit(currentEmail, currentPassword);
    }
  }
}

export default SignupFormDumb;
