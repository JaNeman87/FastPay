import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Warning: Cannot update during an existing state transition "
]);

import configureStore from "./src/store/configureStore";
import reducer from "./src/store/reducers/root";

const logger = store => {
  return next => {
    return action => {
      console.log("[Middleware] Dispatching", action);
      const result = next(action);
      console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent("payqr", () => RNRedux);
