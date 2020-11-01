import React from "react";
import {
  Router,
  Route,
  Switch,
  useLocation,
  withRouter,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SignIn from "./SignInScreen";
import SignOut from "./SignUpScreen";
import Otp from './OTP';
import CustApp from './App/App';
import Header from './Header';
import Menu from './App/Menu';
import Cart from './App/Cart';
const AnimatedSwitch = () => {
  const location = useLocation();
  return (
    <div>
      {/* <TransitionGroup>
        <CSSTransition key={location.key} classNames="slide" timeout={10}> */}
          <Switch location={location}>
            <Route path="/signinc"  render={() => <SignIn />} exact />
            <Route path="/signoutc" render={() => <SignOut />} exact/>
            <Route path="/otp" render={() => <Otp />} exact/>
            <Route path="/CustApp" render={() => <CustApp />}/>
            {/* <Route path="/menu" component={Menu} exact />
            <Route path="/cart" component={Cart} exact /> */}
          </Switch>
        {/* </CSSTransition>
      </TransitionGroup> */}
    </div>
  );
};
export default AnimatedSwitch;
