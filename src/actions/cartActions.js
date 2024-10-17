import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";


export const addToCart = (id, qty) => async (dispatch, getState) =>{
    const {data} = await axios.get(`/api/v1/product/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.productname,
            image:data.image,
            price:data.price,
            stockcount: data.stockcount,
            qty

        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id)=>(dipatch, getState)=>{
    dipatch({
        type:CART_REMOVE_ITEM,
        payload:id,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}