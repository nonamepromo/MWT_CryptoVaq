import axios from "axios";

export const GET_GLOBAL_START = "GET_GLOBAL_START"
export const GET_GLOBAL_SUCCESS = "GET_GLOBAL_SUCCESS"
export const GET_GLOBAL_FAIL = "GET_GLOBAL_FAIL"

export const getGlobalStart = () => ({
    type: GET_GLOBAL_START
})

export const getGlobalSuccess = (data) => ({
    type: GET_GLOBAL_SUCCESS,
    payload: { data }
})

export const getGlobalFail = (error) => ({
    type: GET_GLOBAL_FAIL,
    payload: { error }
})

export function getGlobal() {
    return dispatch => {
        dispatch(getGlobalStart())

        let apiUrl = `https://api.coingecko.com/api/v3/global`

        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json"
            }
        }).then((response) => {
            console.log("GetGlobal")
            if (response.status == 200) {
                dispatch(getGlobalSuccess(response.data.data))
            } else {
                dispatch(getGlobalFail(response.data))
            }
        }).catch((error) => {
            dispatch(getGlobalFail(error))
        })
    }
}