import React from "react";
import {
  Router,
  Route,
  Switch,
  useLocation,
  withRouter,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SignIn from "./Customer/SignInScreen";
import SignOut from "./Customer/SignUpScreen";
import Otp from './Customer/OTP';
import CustApp from './Customer/App/App';
import Header from './Customer/Header';
import Menu from './Customer/App/Menu';
import Cart from './Customer/App/Cart';
import EmpSignIn from './Employee/SignInEmployee';
import DeskApp from './Employee/desk/AppDesk';
import AppDelivery from './Employee/delivery/OrdersPage';
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
            <Route path="/EmpSignIn" render={() => <EmpSignIn />}/>
            <Route path="/DeskApp" render={() => <DeskApp />}/>
            <Route path="/DeliveryApp" render={() => <AppDelivery />}/>
            {/* <Route path="/menu" component={Menu} exact />
            <Route path="/cart" component={Cart} exact /> */}
          </Switch>
        {/* </CSSTransition>
      </TransitionGroup> */}
    </div>
  );
};
export default AnimatedSwitch;
