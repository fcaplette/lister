import SignupForm from "../src/shared/app/signup/component/SignupForm";
import PageTitle from "../src/shared/ui/text/PageTitle";

const styles = require("../style/login.css");

export default (): React.ReactNode => (
  <div className={styles.root}>
    <div className={styles.content}>
      <PageTitle> Signup </PageTitle>
      <SignupForm />
    </div>
  </div>
);
