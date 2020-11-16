import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const addIngredient=(ingredientName)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName

    }
}
export const removeIngredient=(ingredientName)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName 
    }
}

const setIngredient=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients
    }
}

const fetchIngredientFail=(error)=>{
    return {
        type:actionTypes.FETCH_INGREDIENT_FAIL,
        error:error
    }
}

export const initIngredient=()=>{
    return async (dispatch)=>{
        try{
            const ingredients=await axios.get('/ingredients.json')
            dispatch(setIngredient(ingredients.data))
        } catch(e){
            dispatch(fetchIngredientFail(true))
        }

    }
}