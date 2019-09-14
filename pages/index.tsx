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
  static getInitialProps({ store, isServer, pathname, query }) {
    store.dispatch({ type: "FOO", payload: "foo" }); // component will be able to read from store's state when rendered
    return { custom: "custom" }; // you can pass some custom props to component from here
  }

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
