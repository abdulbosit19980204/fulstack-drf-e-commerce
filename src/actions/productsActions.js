import axios from "axios";
import {
  PROUDUCT_LIST_FAIL,
  PROUDUCT_LIST_REQUEST,
  PROUDUCT_LIST_SUCCESS,

  PROUDUCT_DETAILS_FAIL,
  PROUDUCT_DETAILS_REQUEST,
  PROUDUCT_DETAILS_SUCCESS,
} from "../constants/productsConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PROUDUCT_LIST_REQUEST });
    const { data } = await axios.get(`/api/v1/products/`);
    dispatch({
      type: PROUDUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PROUDUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}
export const listProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PROUDUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/product/${id}`);
      dispatch({
        type: PROUDUCT_DETAILS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: PROUDUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  }