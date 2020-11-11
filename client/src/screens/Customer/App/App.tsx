import React from "react";
import {
  Router,
  Route,
  Switch,
  useLocation,
  withRouter,
  useRouteMatch
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Header from '../Header';
import Menu from './Menu';
import Cart from './Cart';
import Orders from './Orders';
const AnimatedSwitch = () => {
  const location = useLocation();
  let { path, url } = useRouteMatch();
  return (
    <div>
    <Header/>
      {/* <TransitionGroup>
        <CSSTransition key={location.key} classNames="slide" timeout={10}> */}
          <Switch location={location}>
            <Route path={`${path}/menu`} render={() => <Menu />}/>
            <Route path={`${path}/cart`} render={() => <Cart />}/>
            <Route path={`${path}/orders`} render={() => <Orders />}/>
          </Switch>
        {/* </CSSTransition>
      </TransitionGroup> */}
    </div>
  );
};
export default React.memo(AnimatedSwitch);
