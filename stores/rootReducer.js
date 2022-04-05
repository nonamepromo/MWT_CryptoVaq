import { combineReducers } from "redux";

import tabReducer from "./tab/tabReducer";
import marketReducer from "./market/marketReducer";
import trendingReducer from "./trending/trendingReducer";
import capReducer from "./cap/capReducer";

export default combineReducers({
    tabReducer,
    marketReducer,
    trendingReducer,
    capReducer
})