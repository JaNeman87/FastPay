import * as actionTypes from "../actions/actionTypes";

const initialState = {
  articles: {
    article: [],
    brand: [],
    type: [],
    quantity: [],
    price: [],
    imageUrl: []
  },
  cartTotalSum: [],
  cartArticle: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ARTICLE:
      return {
        ...state,
        articles: {
          ...state.articles,
          article: action.art,
          brand: action.brnd,
          type: action.typ,
          quantity: action.qtity,
          price: action.prc,
          imageUrl: action.iurl
        }
      };
    // case actionTypes.PRICE_TO_CART:
    //   return {
    //     ...state,
    //     cartTotalSum: state.cartTotalSum.concat(parseInt(action.totalSum))
    //   };
    case actionTypes.ARTICLE_TO_CART:
      return {
        ...state,
        cartArticle: state.cartArticle.concat(
          `${action.brnd}, ${action.typ}, ${action.qtity}, ${action.prc}`
        ),
        cartTotalSum: state.cartTotalSum.concat(parseInt(action.prc))
      };

    case actionTypes.DELETE_ARTICLE_IN_CART:
      const id = action.id;
      const newArray = [...state.cartArticle];
      newArray.splice(id, 1);
      console.log(id);
      const newPrice = [...state.cartTotalSum];
      newPrice.splice(id, 1);

      return {
        ...state,
        cartArticle: newArray,
        cartTotalSum: newPrice
      };

    default:
      return state;
  }
};

export default reducer;
