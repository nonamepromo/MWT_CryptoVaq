import axios from "axios";

export const GET_MARKET_START = "GET_MARKET_START"
export const GET_MARKET_SUCCESS = "GET_MARKET_SUCCESS"
export const GET_MARKET_FAIL = "GET_MARKET_FAIL"

export const getMarketStart = () => ({
    type: GET_MARKET_START
})

export const getMarketSuccess = (coins) => ({
    type: GET_MARKET_SUCCESS,
    payload: { coins }
})

export const getMarketFail = (error) => ({
    type: GET_MARKET_FAIL,
    payload: { error }
})

export function getMarket(currency = "eur", orderBy = "market_cap_desc", sparkline = true, priceChangePerc = "30d", perPage = 30, page = 1) {
    return dispatch => {
        dispatch(getMarketStart())

        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`

        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json"
            }
        }).then((response) => {
            console.log("GetMarket")
            console.log(response)
            if (response.status == 200) {
                dispatch(getMarketSuccess(response.data))
            } else {
                dispatch(getMarketFail(response.data))
            }
        }).catch((error) => {
            dispatch(getMarketFail(error))
        })
    }
}



