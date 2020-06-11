import App from "next/app";
import "../css/main.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import wrapper, { store, persistor } from "../store";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Component {...pageProps}></Component>
        </PersistGate>
      </Provider>
    );
  }
}

export default wrapper.withRedux(MyApp);
