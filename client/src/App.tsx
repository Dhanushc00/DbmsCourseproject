import React from "react";
//import { Box, Input, Flex, Text, Button, Link } from "@chakra-ui/core";
import createBrowserHistory from "history/createBrowserHistory";
import { Router, Route, Switch, useLocation,Redirect } from "react-router-dom";
import SignIn from "./screens/Customer/SignInScreen";
import SignOut from "./screens/Customer/SignUpScreen";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Routes1 from "./screens/Routes";
import { Provider } from "react-redux";
import {store} from './store/store';
const history = createBrowserHistory();

const Routes: React.FC<{}> = () => {
  //const location =useLocation<unknown|any>();
  return (
    <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signinc" />
        </Route>
        <Route path="*">
          <Routes1/>
        </Route>
      </Switch>
    </Router>
    </Provider>
  );
};

export default Routes;
