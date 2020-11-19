import React from "react";
import {
  Router,
  Route,
  Switch,
  useLocation,
  withRouter,
  useRouteMatch
} from "react-router-dom";
import {Box} from '@chakra-ui/core'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Header from '../Header';
import Menu from './Menu';
import Cart from './Cart';
import Orders from './Orders';
import NotFound from '../../../assets/notfound.svg';
import {useDispatch,useSelector} from 'react-redux';
import { rootReducerType } from "../../../store/store";
const AnimatedSwitch = () => {
  const location = useLocation();
  let { path, url } = useRouteMatch();
  const id: number = useSelector((state: rootReducerType) => {
    console.log(state.CustID);
    return Number(state.CustID.id);
  });
  if(id==0){
    return(<Box d="flex" h="87vh" w="100%" justifyContent="center" alignItems="center" fontFamily={"monospace"} flexDirection="column" fontSize={"2xl"}>
        <img src={NotFound} height={500} width={800} />
        The Page you are looking for is not AVAILABLE
    </Box>);
  }
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
