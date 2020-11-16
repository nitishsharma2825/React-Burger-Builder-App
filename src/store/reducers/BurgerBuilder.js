import * as actionTypes from '../actions/actionTypes'
const initState={
    ingredients:null,
    totalPrice:0.0,
    error:false,
    building:false
}

const INGREDIENTS_PRICE={
    salad:0.5,
    meat:1.3,
    bacon:0.7,
    cheese:0.4
}

const Reducer=(state=initState, action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice: state.totalPrice+INGREDIENTS_PRICE[action.ingredientName],
                building:true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return  {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice: state.totalPrice-INGREDIENTS_PRICE[action.ingredientName],
                building:true
            }
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients:action.ingredients,
                totalPrice:0,
                error:false,
                building:false
            }
        case actionTypes.FETCH_INGREDIENT_FAIL:
            return {
                ...state,
                error:action.error
            }
        default:
            return state
    }
}
export default Reducer