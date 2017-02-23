import "babel-polyfill";
import * as React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRedirect, hashHistory } from "react-router";
import { Home } from "./pages/home";
import { App } from "./app";

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} />
    </Route>
  </Router>
), document.getElementById("content"));