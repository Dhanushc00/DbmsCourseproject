export interface DeskAgtID {
    id: number
}
export type DeskAgtIDState = {
    id: number
}
export type DeskAgtIDAction = {
    type: string
    id: DeskAgtID
}
  
type DispatchType = (args: DeskAgtIDAction) => DeskAgtIDAction

export const ADD_ID_DA = "ADD_ID_DA"


export function addID(DeskAgtID: DeskAgtIDState) {
    console.log(DeskAgtID);
    const action: DeskAgtIDAction = {
      type: ADD_ID_DA,
      id:DeskAgtID,
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
  
  export function simulateHttpRequest(action: DeskAgtIDAction) {
    return (dispatch: DispatchType) => {
      setTimeout(() => {
        dispatch(action)
      }, 500)
    }
  }

  const initialState: DeskAgtIDState = { id: 301 };

  const reducer = (
    state: DeskAgtIDState = initialState,
    action: DeskAgtIDAction
  ): DeskAgtIDState => {
    switch (action.type) {
      case ADD_ID_DA:
        console.log(action.id);
        return {id: Number(action.id)};
      default:
            return state;
    }
  }
  
  export default reducer