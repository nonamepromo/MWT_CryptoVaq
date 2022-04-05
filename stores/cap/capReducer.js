import * as capActions from "./capActions"

const initialState = {
    data: [],
    error: null,
    loading: false
}

const capReducer = (state = initialState, action) => {
    switch (action.type) {
        case capActions.GET_CAP_START:
            return {
                ...state,
                loading: true
            }
        case capActions.GET_CAP_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
        case capActions.GET_CAP_FAIL:
            return {
                ...state,
                error: action.payload.error
            }     
        default:
            return state
    }
}

export default capReducer;