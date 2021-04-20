import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import orderReducer from './store/reducers/order';
import burgerBuilderRreducer from './store/reducers/burgerBuilder';
import authReducer from './store/reducers/auth';
import {watchAuth, watchBurgerBuilder, watchOrder} from './store/saga/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({
  burgerBuilder: burgerBuilderRreducer,
  order: orderReducer,
  auth: authReducer,
});

const sagaMiddleware =createSagaMiddleware();

const store=createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware),
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app=(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
