import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk }  from 'redux-thunk';
import { foodReducers,userReducers,loginReducers,logoutReducers,
  roleReducers,cartReducers,orderReducers,adminorderReducers } from './reducers';
import { jwtDecode } from 'jwt-decode'; 

const initialLoginTokens = localStorage.getItem("LoginTokens")
  ? JSON.parse(localStorage.getItem("LoginTokens"))
  : null;
const initialUser = initialLoginTokens ? jwtDecode(initialLoginTokens.access) : null;

const initialState = {
    role: initialUser,
  };


const rootReducer = combineReducers({
    food: foodReducers,
    user: userReducers,
    login: loginReducers,
    logout:loginReducers,
    role:roleReducers,
    cart:cartReducers,
    order:orderReducers,
    adminorder:adminorderReducers,

});

const store = createStore(rootReducer, initialState,  applyMiddleware(thunk));

export default store;
