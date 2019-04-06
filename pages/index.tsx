/* @flow */

import * as React from "react";

import Head from "../src/shared/app/base/components/Head";
import Header from "../src/shared/app/base/components/Header";
import TodoList from "../src/shared/app/todo/component/TodoList";

const styles = require("../style/index.css");

export default class IndexPage extends React.Component {
  static getInitialProps({ store, isServer, pathname, query }) {
    store.dispatch({ type: "FOO", payload: "foo" }); // component will be able to read from store's state when rendered
    return { custom: "custom" }; // you can pass some custom props to component from here
  }
  render() {
    return (
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
  }
}
