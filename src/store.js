import { combineReducers, createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { getRequest, cartReducer, searchReducer, getByIdRequestReducer } from "./redux/reducers";


const reducer = combineReducers({
  productList: getRequest('products'),
  cart: cartReducer,
  search: searchReducer, 
  productDetail: getByIdRequestReducer
});





const store = createStore(reducer, applyMiddleware(thunk));

export default store;
