import React from "react";
//import { Box, Input, Flex, Text, Button, Link } from "@chakra-ui/core";
import createBrowserHistory from "history/createBrowserHistory";
import { Router, Route, Switch, useLocation,Redirect } from "react-router-dom";
import SignIn from "./screens/Customer/SignInScreen";
import SignOut from "./screens/Customer/SignUpScreen";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Routes1 from "./screens/Routes";
const history = createBrowserHistory();

const Routes: React.FC<{}> = () => {
  //const location =useLocation<unknown|any>();
  return (
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
  );
};

export default Routes;