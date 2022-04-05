import * as marketActions from "./marketActions"

const initialState = {
    coins: [],
    error: null,
    loading: false
}

const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case marketActions.GET_MARKET_START:
            return {
                ...state,
                loading: true
            }
        case marketActions.GET_MARKET_SUCCESS:
            return {
                ...state,
                coins: action.payload.coins
            }
        case marketActions.GET_MARKET_FAIL:
            return {
                ...state,
                error: action.payload.error
            }     
        default:
            return state
    }
}

export default marketReducer;