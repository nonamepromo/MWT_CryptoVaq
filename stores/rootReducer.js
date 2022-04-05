import { combineReducers } from "redux";

import tabReducer from "./tab/tabReducer";
import marketReducer from "./market/marketReducer";
import trendingReducer from "./trending/trendingReducer";
import globalReducer from "./global/globalReducer";

export default combineReducers({
    tabReducer,
    marketReducer,
    trendingReducer,
    globalReducer
})