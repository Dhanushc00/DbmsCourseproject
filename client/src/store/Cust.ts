export interface CustID {
    id: number
}
export type CustIDState = {
    id: number
}
export type CustIDAction = {
    type: string
    id: CustID
}
  
type DispatchType = (args: CustIDAction) => CustIDAction

export const ADD_ID = "ADD_ID"


export function addID(CustID: CustIDState) {
    console.log(CustID);
    const action: CustIDAction = {
      type: ADD_ID,
      id:CustID,
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
  
  export function simulateHttpRequest(action: CustIDAction) {
    return (dispatch: DispatchType) => {
      setTimeout(() => {
        dispatch(action)
      }, 500)
    }
  }

  const initialState: CustIDState = { id: 101 };

  const reducer = (
    state: CustIDState = initialState,
    action: CustIDAction
  ): CustIDState => {
    switch (action.type) {
      case ADD_ID:
        console.log(action.id);
        return {id: Number(action.id)};
      default:
            return state;
    }
  }
  
  export default reducer