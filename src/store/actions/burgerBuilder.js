import * as actionType from './actonType';
import axios from '../../axios-orders';

export const addIngredient =(name)=>{
    return {
        type:actionType.ADDINGREDIENT,
        ingredientName:name
    };
};

export const removeIngredient =(name)=>{
    return {
        type:actionType.REMOVEINGREDIENT,
        ingredientName:name
    };
};
export const setIngredients=(ingredients)=>{
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients:ingredients
    };
};
export const fetchIngredientFaild=()=>{
    return{
        type: actionType.FETCH_INGREDIENT_FAILD
    }
};
export const initIngredients =()=>{
    return {
        type:actionType.INIT_INGREDIENT
    }
};