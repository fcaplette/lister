import Router from "next/router";
import { render } from "react-dom";

import LoginForm from "../src/shared/app/login/component/LoginForm";
import PageTitle from "../src/shared/ui/text/PageTitle";
import { getCookie } from "../src/shared/app/base/browser/browserUtils";

const styles = require("../style/login.css");

interface Props {}

export default class LoginPage extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    let accessToken;

    if (document && document.cookie) {
      accessToken = getCookie("access_token");
    }

    if (accessToken) {
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
