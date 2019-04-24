import Header from "../src/shared/app/base/components/Header";
import Head from "../src/shared/app/base/components/Head";

const styles = require("../style/index.css");

export default (): React.ReactNode => (
  <React.Fragment>
    <Head />
    <div className={styles.root}>
      <div className={styles.content}>
        <Header />
        This is the about page
      </div>
    </div>
  </React.Fragment>
);
