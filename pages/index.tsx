/* @flow */

import * as React from "react";

import Head from "../src/shared/app/base/components/Head";
import Header from "../src/shared/app/base/components/Header";
import Router from "next/router";
import TodoAddItem from "../src/shared/app/todo/component/TodoAddItem";
import TodoList from "../src/shared/app/todo/component/TodoList";
import { accessToken } from "../src/shared/app/login/settings/loginSettings";
import { getCookie } from "../src/shared/app/base/browser/browserUtils";

const styles = require("../style/index.css");

export default class IndexPage extends React.Component {
  componentDidMount() {
    let token;

    if (document && document.cookie) {
      token = getCookie(accessToken);
    }

    if (!token) {
      Router.push("/login");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Head />
        <div className={styles.root}>
          <div className={styles.content}>
            <Header />
            <TodoAddItem />
            <TodoList />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
