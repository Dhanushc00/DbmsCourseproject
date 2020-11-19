export interface DelAgtID {
    id: number
}
export type DelAgtIDState = {
    id: number
}
export type DelAgtIDAction = {
    type: string
    id: DelAgtID
}
  
type DispatchType = (args: DelAgtIDAction) => DelAgtIDAction;

export const ADD_ID_DelA = "ADD_ID_DelA";


export function addID(DelAgtID: DelAgtIDState) {
    console.log(DelAgtID);
    const action: DelAgtIDAction = {
      type: ADD_ID_DelA,
      id: DelAgtID,
    }
    return (dispatch: DispatchType) => dispatch(action);
  }
  
//   export function removeArticle(article: IArticle) {
//     const action: ArticleAction = {
//       type: REMOVE_ARTICLE,
//       article,
//     }
//     return simulateHttpRequest(action)
//   }
  
  export function simulateHttpRequest(action: DelAgtIDAction) {
    return (dispatch: DispatchType) => {
      setTimeout(() => {
        dispatch(action)
      }, 500)
    }
  }

  const initialState: DelAgtIDState = { id: 0 };

  const reducer = (
    state: DelAgtIDState = initialState,
    action: DelAgtIDAction
  ): DelAgtIDState => {
    switch (action.type) {
      case ADD_ID_DelA:
        console.log(action.id);
        return {id: Number(action.id)};
      default:
            return state;
    }
  }
  
  export default reducer