import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {createStore,combineReducers, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import burgerReducer from './store/reducers/BurgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
const rootReducer=combineReducers({
  burger:burgerReducer,
  order:orderReducer,
  auth:authReducer
})

const composeEnhancers =process.env.NODE_ENV?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        </BrowserRouter>    
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
