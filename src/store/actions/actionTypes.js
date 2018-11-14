export const ARTICLE = "ARTICLE";
export const PRICE_TO_CART = "PRICE_TO_CART";
export const ARTICLE_TO_CART = "ARTICLE_TO_CART";
export const DELETE_ARTICLE_IN_CART = "DELETE_ARTICLE_IN_CART";

export const fetchedArticle = (art, brnd, typ, qtity, prc, iurl) => {
  return {
    type: ARTICLE,
    art: art,
    brnd: brnd,
    typ: typ,
    qtity: qtity,
    prc: prc,
    iurl: iurl
  };
};

export const article = (art, brnd, typ, qtity, prc, iurl) => {
  return dispatch => {
    dispatch(fetchedArticle(art, brnd, typ, qtity, prc, iurl));
  };
};

export const priceToCart = totalSum => {
  return {
    type: PRICE_TO_CART,
    totalSum: totalSum
  };
};

export const articleToCart = (brnd, typ, qtity, prc) => {
  return {
    type: ARTICLE_TO_CART,
    brnd: brnd,
    typ: typ,
    qtity: qtity,
    prc: prc
  };
};

export const deleteArticleInCart = id => {
  return {
    type: DELETE_ARTICLE_IN_CART,
    id: id
  };
};
