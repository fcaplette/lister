/* @flow */

import * as React from "react";

import Nav from "../../nav/Nav";
import PageTitle from "../../../ui/text/PageTitle";

const styles = require("./Header.css");

export default (): React.ReactElement => (
  <div className={styles.root}>
    <Nav />
    <PageTitle children={"Listr"} />
  </div>
);
