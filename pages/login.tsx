import Router from "next/router";

import PageTitle from "../src/shared/ui/text/PageTitle";
import LoginForm from "../src/shared/app/login/component/LoginForm";
import { accessToken } from "../src/shared/app/login/settings/loginSettings";
import { getCookie } from "../src/shared/app/base/browser/browserUtils";
import { render } from "react-dom";

const styles = require("../style/login.css");

interface Props {}

export default class LoginPage extends React.Component {
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
          <PageTitle> Login </PageTitle>
          <LoginForm />
        </div>
      </div>
    );
  }
}
