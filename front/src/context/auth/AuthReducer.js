import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS, SET_AUTHORITY } from "./AuthActions";

const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                isFetching: true
            };
        case LOGIN_SUCCESS: case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                loggedIn: true,
            };
        
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                loggedIn: false,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                loggedIn: false,
            }
        case SET_AUTHORITY:
            return {
                ...state,
                authorized: action.payload
            }

        default:
            return state;
    }
}

export default AuthReducer;