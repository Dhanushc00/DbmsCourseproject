interface IArticle {
    id: number
    title: string
    body: string
  }
  
  type ArticleState = {
    articles: IArticle[]
  }
  
  type ArticleAction = {
    type: string
    article: IArticle
  }
  
type DispatchType = (args: ArticleAction) => ArticleAction

export const ADD_ARTICLE = "ADD_ARTICLE"
export const REMOVE_ARTICLE = "REMOVE_ARTICLE"

export function addArticle(article: IArticle) {
    const action: ArticleAction = {
      type: ADD_ARTICLE,
      article,
    }
  
    return simulateHttpRequest(action)
  }
  
  export function removeArticle(article: IArticle) {
    const action: ArticleAction = {
      type: REMOVE_ARTICLE,
      article,
    }
    return simulateHttpRequest(action)
  }
  
  export function simulateHttpRequest(action: ArticleAction) {
    return (dispatch: DispatchType) => {
      setTimeout(() => {
        dispatch(action)
      }, 500)
    }
  }

  const initialState: ArticleState = {
    articles: [
      {
        id: 1,
        title: "post 1",
        body:
          "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
      },
      {
        id: 2,
        title: "post 2",
        body:
          "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
      },
    ],
  }

  const reducer = (
    state: ArticleState = initialState,
    action: ArticleAction
  ): ArticleState => {
    switch (action.type) {
      case ADD_ARTICLE:
        const newArticle: IArticle = {
          id: Math.random(), // not really unique
          title: action.article.title,
          body: action.article.body,
        }
        return {
          ...state,
          articles: state.articles.concat(newArticle),
        }
      case REMOVE_ARTICLE:
        const updatedArticles: IArticle[] = state.articles.filter(
          article => article.id !== action.article.id
        )
        return {
          ...state,
          articles: updatedArticles,
        }
    }
    return state
  }
  
  export default reducer