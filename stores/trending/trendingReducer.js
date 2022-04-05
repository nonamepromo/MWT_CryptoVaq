import * as trendingActions from "./trendingActions"

const initialState = {
    coins: [],
    error: null,
    loading: false
}

const trendingReducer = (state = initialState, action) => {
    switch (action.type) {
        case trendingActions.GET_TRENDING_START:
            return {
                ...state,
                loading: true
            }
        case trendingActions.GET_TRENDING_SUCCESS:
            return {
                ...state,
                coins: action.payload.coins
            }
        case trendingActions.GET_TRENDING_FAIL:
            return {
                ...state,
                error: action.payload.error
            }     
        default:
            return state
    }
}

export default trendingReducer;