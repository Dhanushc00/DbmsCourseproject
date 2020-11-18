import * as React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, Store,combineReducers } from "redux"

import thunk from "redux-thunk"
import DelReducer from './DelAgent';
///import App from "./App"
import CustReducer from "./Cust";
import DeskReducer from './DeskAgent';

// export const store: Store<ArticleState, ArticleAction> & {
//   dispatch: DispatchType
// } = createStore(reducer, applyMiddleware(thunk))

const rootReducer = combineReducers({
    CustID: CustReducer,
    DeskID: DeskReducer,
    DelID: DelReducer,
});
export type rootReducerType =ReturnType<typeof rootReducer>;  
export const store = createStore(rootReducer, applyMiddleware(thunk));
  
export type AppDispatch = typeof store.dispatch;