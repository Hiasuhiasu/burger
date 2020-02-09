import * as actionType from '../actions/actonType';

const initialState={
    ingredients:null,
    totalPrice:6,
    error:false
};
const INGREDIENT_PRICE={
    salad:0.3,
    cheese:0.5,
    bacon:0.4,
    meat:0.8
}
const reduce =(state=initialState, action)=>{
    switch(action.type){
        case actionType.ADDINGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice+INGREDIENT_PRICE[action.ingredientName]
            };
        case actionType.REMOVEINGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICE[action.ingredientName]
            };
        case actionType.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false
            };
        case actionType.FETCH_INGREDIENT_FAILD:
            return {
                ...state,
                error:true
            }
        default:
            return state;
    }
};

export default reduce;