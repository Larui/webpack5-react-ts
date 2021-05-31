import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { LocaleProvider } from "antd";
import zhCN from "antd/es/locale-provider/zh_CN";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import getStore from "./store";
import SignOffline from "./sign/SignOffline";

import "./common.css";

function renderDOM() {
  const routes: Array<JSX.Element> = [
    <Route path="/home" component={SignOffline} key="sign" />,
    <Redirect to="/home" key="redirect" />,
  ];

  const SwitchRoute = () => <Switch>{routes}</Switch>;

  hot(SwitchRoute);

  return (
    <LocaleProvider locale={zhCN}>
      <Provider store={getStore()}>
        <Router>
          <SwitchRoute />
        </Router>
      </Provider>
    </LocaleProvider>
  );
}

ReactDOM.render(renderDOM(), document.getElementById("content"));
