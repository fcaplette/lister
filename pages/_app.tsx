// pages/_app.js
import * as React from "react";

import App, { Container } from "next/app";

import { Provider } from "react-redux";
import { configureStore } from "../src/shared/app/base/store/store";
import withRedux from "next-redux-wrapper";
import Head from "../src/shared/app/base/components/Head";

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Head />
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore, { debug: true })(MyApp);
