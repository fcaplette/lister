/* @flow */

import * as React from "react";

import Nav from "../src/shared/app/nav/Nav";
import Head from "../src/shared/app/base/components/Head";
import TodoList from "../src/shared/app/todo/TodoList";

const styles = require("../style/index.css");

export default (): React.ReactNode => (
  <React.Fragment>
    <Head />
    <div className={styles.root}>
      <Nav />
      <div className={styles.content}>
        <TodoList />
      </div>
    </div>
  </React.Fragment>
);
