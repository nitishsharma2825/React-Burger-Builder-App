import * as actionTypes from '../actions/actionTypes'

const initialState={
    token:null,
    userId:null,
    loading:false,
    error:null,
    redirectPath:'/'
}

const reducer=(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token:action.token,
                userId:action.userId,
                loading:false,
                error:null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error:action.error,
                loading:false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                userId:null,
                token:null
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                redirectPath:action.path
            }
        default:
            return state
    }
}
export default reducer