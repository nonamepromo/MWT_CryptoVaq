import * as globalActions from "./globalActions"

const initialState = {
    data: [],
    error: null,
    loading: false
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case globalActions.GET_GLOBAL_START:
            return {
                ...state,
                loading: true
            }
        case globalActions.GET_GLOBAL_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
        case globalActions.GET_GLOBAL_FAIL:
            return {
                ...state,
                error: action.payload.error
            }     
        default:
            return state
    }
}

export default globalReducer;