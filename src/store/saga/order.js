/* eslint-disable max-len */
import {put} from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response =yield axios.post('/orders.json?auth='+action.token, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, response.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fethcOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParam ='?auth='+action.token+'&orderBy="userId"&equalTo="'+action.userId+'"';
  try {
    const response=yield axios.get('orders.json'+queryParam);
    const fetchOrder=[];
    for (const key in response.data) {
      if (Object.prototype.hasOwnProperty(key)) {
        fetchOrder.push({
          ...response.data[key],
          id: key},
        );
      }
    }
    yield put(actions.fetchOrdersSuccess(fetchOrder));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
