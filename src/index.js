import React from "react";
import ReactDOM from "react-dom";
import "./assets/sass/index.scss";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  defaultDataIdFromObject
} from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI,
  cache: new InMemoryCache({
    dataIdFromObject: (object) => {
      switch (object.__typename) {
        case "AttributeSet":
          return `AttributeSet:${object.name}_${new Date().getTime()}`;
        default:
          return defaultDataIdFromObject(object);
      }
    }
  })
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
