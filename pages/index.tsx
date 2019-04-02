/* @flow */

import * as React from "react";

import Nav from "../src/shared/app/nav/Nav";
import Head from "../src/shared/app/base/components/Head";
import PrimaryButton from "../src/shared/ui/button/PrimaryButton";
import EmptySectionText from "../src/shared/ui/text/EmptySectionText";

const styles = require("../style/index.css");

export default (): React.ReactNode => (
  <React.Fragment>
    <Head />
    <div className={styles.root}>
      <Nav />
      <div className={styles.content}>
        <EmptySectionText>Empty list of TODOS</EmptySectionText>
        <input type="text" placeholder="Add your todo" />
        <PrimaryButton handleClick={() => null}>Add</PrimaryButton>
      </div>
    </div>
  </React.Fragment>
);
