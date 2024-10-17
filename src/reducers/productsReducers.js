import {
  PROUDUCT_LIST_FAIL,
  PROUDUCT_LIST_REQUEST,
  PROUDUCT_LIST_SUCCESS,

  PROUDUCT_DETAILS_FAIL,
  PROUDUCT_DETAILS_REQUEST,
  PROUDUCT_DETAILS_SUCCESS,
} from "../constants/productsConstants";

export const productsListReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PROUDUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PROUDUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PROUDUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    
    default:
        return state
  }
}

export const productDetailsReducers = (state = { product: [] }, action) => {
    switch (action.type) {
      case PROUDUCT_DETAILS_REQUEST:
        return { loading: true, ...state };
      case PROUDUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PROUDUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      
      default:
          return state
    }
  }