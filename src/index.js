import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import authReducer from './store/reducers/auth';
import flatsReducer from './store/reducers/flats';
import traderReducer from './store/reducers/trader';
import todos from './store/reducers/todos';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  flats: flatsReducer,
  trader: traderReducer,
  auth: authReducer,
  todos,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.register();
