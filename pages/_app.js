import App from "next/app";
import "../css/main.scss";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps}></Component>
      </Provider>
    );
  }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
