import * as React from "react";
import PrimaryButton from "../../../ui/button/PrimaryButton";
import DiscreteLink from "../../../ui/link/DiscreteLink";

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
