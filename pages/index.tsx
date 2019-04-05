/* @flow */

import * as React from "react";

import Head from "../src/shared/app/base/components/Head";
import Header from "../src/shared/app/base/components/Header";
import TodoList from "../src/shared/app/todo/TodoList";

const styles = require("../style/index.css");

export default (): React.ReactNode => (
  <React.Fragment>
    <Head />
    <Header />
    <div className={styles.root}>
      <div className={styles.content}>
        <TodoList todos={[]} />
      </div>
    </div>
  </React.Fragment>
);
