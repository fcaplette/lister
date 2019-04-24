import LoginForm from "../src/shared/app/login/component/LoginForm";
import PageTitle from "../src/shared/ui/text/PageTitle";

const styles = require("../style/login.css");

export default (): React.ReactNode => (
  <div className={styles.root}>
    <div className={styles.content}>
      <PageTitle> Login </PageTitle>
      <LoginForm />
    </div>
  </div>
);
