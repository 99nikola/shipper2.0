import { AnyAction } from "redux";
import { EUserActions } from "./UserActions";
import { IUserState } from "../../typescript";

const initialUser: IUserState = {
    user: null,
    isFetching: false,
    error: null
}

const UserReducer = (state = initialUser, action: AnyAction) => {
    switch (action.type) {
        case EUserActions.LOGIN_START:
            return ({
                ...state,
                isFetching: true
            });

        case EUserActions.LOGIN_FAIL:
            return ({
                ...state,
                isFetching: false,
                error: action.payload
            });
        
        case EUserActions.LOGIN_SUCCESS:
            return ({
                ...state,
                user: action.payload,
                isFetching: false
            });

        case EUserActions.REGISTER_START:
            return ({
                ...state,
                isFetching: true
            });

        case EUserActions.REGISTER_FAIL:
            return ({
                ...state,
                isFetching: false,
                error: action.payload
            });
        
        case EUserActions.REGISTER_SUCCESS:
            return ({
                ...state,
                isFetching: false,
                user: action.payload
            });

        case EUserActions.LOGOUT:
            return ({
                ...state,
                user: null
            });

        default: 
            return state;
    }
}

export default UserReducer;