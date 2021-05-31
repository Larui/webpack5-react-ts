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
import PCRoom from "./pc/Home";
import MRoom from "./m/Home";
import { isMobile } from "./utils";

import "./common.css";

function renderDOM() {
  const routes: Array<JSX.Element> = [];

  if (isMobile()) {
    routes.push(<Route path="/m/home" component={MRoom} key="page" />);
    routes.push(<Redirect to="/m/home" key="redirect" />);
  } else {
    routes.push(<Route path="/home" component={PCRoom} key="page" />);
    routes.push(<Redirect to="/home" key="redirect" />);
  }

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
