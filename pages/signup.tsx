import Router from "next/router";

import SignupForm from "../src/shared/app/signup/component/SignupForm";
import PageTitle from "../src/shared/ui/text/PageTitle";
import { getCookie } from "../src/shared/app/base/browser/browserUtils";
import { accessToken } from "../src/shared/app/login/settings/loginSettings";

const styles = require("../style/login.css");

interface Props {}

export default class SignupPage extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    let token;

    if (document && document.cookie) {
      token = getCookie(accessToken);
    }

    if (token) {
      Router.push("/");
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <PageTitle> Signup </PageTitle>
          <SignupForm />
        </div>
      </div>
    );
  }
}
