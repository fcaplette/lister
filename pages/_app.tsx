// pages/_app.js
import * as React from "react";

import App, { Container } from "next/app";

import { Provider } from "react-redux";
import { configureStore } from "../src/shared/app/base/store/store";
import withRedux from "next-redux-wrapper";

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }) {
    // we can dispatch from here too
    // ctx.store.dispatch({ type: "FOO", payload: "foo" });
    // const pageProps = Component.getInitialProps
    //   ? await Component.getInitialProps(ctx)
    //   : {};
    // return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore, { debug: true })(MyApp);
