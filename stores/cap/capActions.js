import axios from "axios";

export const GET_CAP_START = "GET_CAP_START"
export const GET_CAP_SUCCESS = "GET_CAP_SUCCESS"
export const GET_CAP_FAIL = "GET_CAP_FAIL"

export const getCapStart = () => ({
    type: GET_CAP_START
})

export const getCapSuccess = (data) => ({
    type: GET_CAP_SUCCESS,
    payload: { data }
})

export const getCapFail = (error) => ({
    type: GET_CAP_FAIL,
    payload: { error }
})

export function getCap() {
    return dispatch => {
        dispatch(getCapStart())

        let apiUrl = `https://api.coingecko.com/api/v3/global`

        return axios({
            url: apiUrl,
            method: 'GET',
            header: {
                Accept: "application/json"
            }
        }).then((response) => {
            console.log("GetCap")
            if (response.status == 200) {
                dispatch(getCapSuccess(response.data.data))
            } else {
                dispatch(getCapFail(response.data))
            }
        }).catch((error) => {
            dispatch(getCapFail(error))
        })
    }
}