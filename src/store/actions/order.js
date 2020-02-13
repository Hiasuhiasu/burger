import * as actionTypes from './actonType';
import axios from '../../axios-orders';

export const purchaseBurgerStart =()=>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurgerSuccess =(id, orderData)=>{
    return {
        type:  actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    };
};

export const purchaseBurgerFail =(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    };
};

export const purchaseBurger =(orderData, token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData)
            .then(resp=>{
                console.log(resp.data);
               dispatch(purchaseBurgerSuccess(resp.data.name,resp.orderData));
            })
            .catch(err=>{
                dispatch(purchaseBurgerFail(err));
            });
    };
}

export const purchaseInit =()=>{
    return  {
        type:actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess =(orders)=>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
};

export const fetchOrdersFail =(error)=>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
};
export const fetchOrdersStart=()=>{
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fethcOrders =(token)=>{
    return dispatch =>{
        dispatch(fetchOrdersStart());
        axios.get('orders.json?auth='+token)
            .then(res=>{
                const fetchOrder=[];
                for(let key in res.data){
                    fetchOrder.push({
                        ...res.data[key],
                        id:key});}
                dispatch(fetchOrdersSuccess(fetchOrder));        
            })
            .catch(err=>
                dispatch(fetchOrdersFail(err)))
    };
}