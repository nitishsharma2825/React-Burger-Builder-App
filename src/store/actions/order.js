import axios from '../../axios-orders'
import * as actionTypes from './actionTypes'

export const purchaseSuccessHandler=(id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_ORDER_SUCCESS,
        id:id,
        orderData: orderData
    }
}
export const purchaseFailHandler=(error)=>{
    return {
        type:actionTypes.PURCHASE_ORDER_FAIL,
        error:error
    }
}

export const onPurchased=()=>{
    return {
        type:actionTypes.ONPURCHASED
    }
}

export const purchaseBurgerStart=()=>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger=(orderData,token)=>{
    return async (dispatch)=>{
        try{
            dispatch(purchaseBurgerStart())
            const resp=await axios.post('/orders.json?auth='+token,orderData)
            dispatch(purchaseSuccessHandler(resp.data.name,orderData))

        } catch (err) {
            dispatch(purchaseFailHandler(true))
        }

    }
}

export const fetchOrderSuccess=(orders)=>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrderFail=(error)=>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrderStart=()=>{
    return {
        type:actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders=(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrderStart())
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('/orders.json'+queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch(err => {
            dispatch(fetchOrderFail(err))
        });
    }
}