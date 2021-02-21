import {
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_RESET,
    CATEGORY_CREATE_SUCCESS
} from "../constants/CategoryConstants";

export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return {loading: true}
        case CATEGORY_CREATE_SUCCESS:
            return {loading: false, success: true, category: action.payload}
        case CATEGORY_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case CATEGORY_CREATE_RESET:
            return {}
        default:
            return state
    }
}