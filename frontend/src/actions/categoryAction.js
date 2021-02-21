import {CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL} from "../constants/CategoryConstants";
import axios from "axios";

export const CreateCategory = (category) => async (dispatch,getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/category`, category,config)

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data

        })

    } catch (error) {

        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message

        })

    }
}
