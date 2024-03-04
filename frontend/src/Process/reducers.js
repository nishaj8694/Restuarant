import { 
    ADDFOOD_LOAD,ADDFOOD_SUCCESS,ADDFOOD_FAIL,UPDATE_OFFER,DELETE_FOOD,UPDATE_MEALS,SORTED_MEALS,
    CREATEUSER_LOAD,CREATEUSER_SUCCESS,CREATEUSER_FAIL,
    LOGIN_LOAD,LOGIN_SUCCESS,LOGIN_FAIL, 
    LOGOUT_LOAD,LOGOUT_SUCCESS,LOGOUT_FAIL,
    UPDATE_ROLE,
    CART_ADD,CART_REMOVE,CART_DEC,CART_INC, 
    ORDER_ADD,ORDER_COMPLETE,ORDER_WAY,
    ADMINORDER_ADD,    
} from "./action";
import {combineReducers} from 'redux';
import { jwtDecode }  from "jwt-decode";

const frstState = {
    food:[],
    copyFood:[],
    loading:true,
    error:null,
}
const userState = {
    user:[],
    loading:true,
    error:null,
}
const loginState = {
    Person:[],
    loading:true,
    loginPerson:localStorage.getItem("LoginTokens")? true : false,
    error:null,
}
const roleState = {
    loading:true,
    role:localStorage.getItem("LoginTokens")? true : false,
    error:null,
}

const cartState = {
    cart:JSON.parse(localStorage.getItem("cart"))||[]
}
const orderState = {
    order:[],
    fullorder:[]
}

const adminorderState = {
    adminorder:[],
    count:0
}


export const adminorderReducers=(state=adminorderState,action)=>{
    switch(action.type){
        case ADMINORDER_ADD:
            return{
            ...state,adminorder:[...state.adminorder, action.payload],count:state.count+1
            }     
        default:
            return state;    
    }
}


export const orderReducers=(state=orderState,action)=>{
    switch(action.type){
        case ORDER_ADD:
            return{
            fullorder:action.payload,order:action.payload,
            }
        case ORDER_COMPLETE:
            const completeorder = state.fullorder.filter((foodItem) => foodItem.status == 'deliverd');
            return{...state,order:completeorder} 

        case ORDER_WAY:
            const wayorder = state.fullorder.filter((foodItem) => foodItem.status !== 'deliverd');
            return{...state,order:wayorder}     
        default:
            return state;    
    }
}

export const cartReducers=(state=cartState,action)=>{
    switch(action.type){
     case CART_ADD:
        return{
            ...state,cart:JSON.parse(localStorage.getItem("cart"))||[]
        }
     case CART_REMOVE:
        const deletedFood = state.cart.filter((foodItem) => foodItem.id !== action.payload);
        return{...state,cart:deletedFood}  

     case CART_DEC:
        const updatedFood = state.cart.map((foodItem,index) => {
                    if (foodItem.id === action.payload.id) {
                        // let item=action.payload.itemNo-1
                        let item=action.payload.itemNo

                        return {
                            ...foodItem,
                            itemNo: item,
                        };
                    }
                    else {
                        return foodItem;
                    }
               });
        return {
            ...state,
            cart: updatedFood,
        }; 
     case CART_INC:
        const updatFood = state.cart.map((foodItem,index) => {
                    if (foodItem.id === action.payload.id) {
                        // let item=action.payload.itemNo+1
                        let item=action.payload.itemNo

                        return {
                            ...foodItem,
                            itemNo: item,
                        };
                    }
                    else {
                        return foodItem;
                    }
               });
        return {
            ...state,
            cart: updatFood,
        }; 
     default:
        return state;    

    } 
}


export const roleReducers=(state=roleState,action)=>{
    switch(action.type){
        case UPDATE_ROLE:
         const rolesys = jwtDecode(action.payload.access)
         return{...state,loading: false,role:rolesys.role,}
        }
    return state; 
 }

export const foodReducers=(state=frstState,action)=>{
    switch(action.type){
        case ADDFOOD_LOAD:
            return{
                ...state,loading:true,
            }
        
        case ADDFOOD_SUCCESS:
            return{
                loading:false,food:action.payload,copyFood:action.payload
            }
         
        case UPDATE_OFFER:
            const updatedFood = state.food.map((item,index) => {
                if (Array.isArray(item)) {
                    return item.map(foodItem => {
                        if (foodItem.id === action.payload.id) {
                            return {
                                ...foodItem,
                                Offer: action.payload.Offer,
                            };
                        }
                        return foodItem; 
                    });
                }   
                else {
                    return item;
                }
                
            });

            return {
                ...state,
                loading: false,
                food: updatedFood,
            };

        case DELETE_FOOD:
            const deletedFood = state.food.map((product) => {
                return product.filter((foodItem) => foodItem.id !== action.payload);
              });
            
              return {
                ...state,
                loading: false,
                food: deletedFood
              };

        case UPDATE_MEALS:
            state.food=state.copyFood
            let upFood
            action.payload ? upFood = state.food.filter((product) =>product.Vegetarian == true)
            :upFood = state.food.filter((product) =>product.Vegetarian == false)            
              return {
                ...state,
                loading: false,
                food: upFood
              };

        case SORTED_MEALS:
                // state.food=state.copyFood
                console.log('sorted is work')
                let sortFood
                sortFood = state.food.slice().sort((a, b) => a.Price - b.Price);

                  return {
                    ...state,
                    loading: false,
                    food: sortFood
                  };

        case ADDFOOD_FAIL:
            console.log('error occured')
            return{
                ...state,loading:false,error:action.payload
            }
        
        default:
            return state;    
        
    }
}


export const userReducers=(state=userState,action)=>{
    switch(action.type){
        case CREATEUSER_LOAD:
            return{
                ...state,loading:true,
            }
        
        case CREATEUSER_SUCCESS:
            return{
                ...state,loading:false,user:[...state.user,action.payload]
            }

        case CREATEUSER_FAIL:
            return{
                ...state,loading:false,error:action.payload
            }
        default:
            return state;    
        
    }
}


export const loginReducers=(state=loginState,action)=>{
    switch(action.type){
        case LOGIN_LOAD:
            return{
                ...state,loading:true,
            }
        
        case LOGIN_SUCCESS:
            const roletype = jwtDecode(action.payload.access)
            return{
                ...state,loading:false, loginPerson:true ,role:roletype.role, Person:[action.payload]
            }

        case LOGIN_FAIL:
            return{
                ...state,loading:false,error:action.payload
            }
        default:
            return state;    
        
    }
}

export const logoutReducers=(state=loginState,action)=>{
    switch(action.type){ 
        case LOGOUT_SUCCESS:
            return{
                ...state,loading:false, loginPerson:false ,Person:[]
            }

        case LOGOUT_FAIL:
            return{
                ...state,loading:false,error:action.payload
            }
        default:
            return state;    
        
    }
}