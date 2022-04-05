import axios from "axios";

export const GET_TRENDING_START = "GET_TRENDING_START"
export const GET_TRENDING_SUCCESS = "GET_TRENDING_SUCCESS"
export const GET_TRENDING_FAIL = "GET_TRENDING_FAIL"

export const getTrendingStart = () => ({
    type: GET_TRENDING_START
})

export const getTrendingSuccess = (coins) => ({
    type: GET_TRENDING_SUCCESS,
    payload: { coins }
})

export const getTrendingFail = (error) => ({
    type: GET_TRENDING_FAIL,
    payload: { error }
})

export function getTrending() {
    return dispatch => {
        dispatch(getTrendingStart())

        let apiUrl = `https://api.coingecko.com/api/v3/search/trending`

        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json"
            }
        }).then((response) => {
            console.log("GetTrending")
            console.log(response)
            if (response.status == 200) {
                dispatch(getTrendingSuccess(response.data.coins))
            } else {
                dispatch(getTrendingFail(response.data))
            }
        }).catch((error) => {
            dispatch(getTrendingFail(error))
        })
    }
}