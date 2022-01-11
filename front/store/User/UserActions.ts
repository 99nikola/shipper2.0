import { ILogin, IRegister, IUser } from "../../typescript";
import { setAuthToken } from "../../utils/auth";

export enum EUserActions {
    LOGIN_SUCCESS = "user::LOGIN_SUCCESS",
    LOGIN_START = "user::LOGIN_START",
    LOGIN_FAIL = "user::LOGIN_FAIL",
    REGISTER_START = "user::REGISTER_START",
    REGISTER_FAIL = "user::REGISTER_FAIL",
    REGISTER_SUCCESS = "user::REGISTER_SUCCESS",
    LOGOUT = "user::LOGOUT"
}

export const logoutUser = () => {
    removeAuthToken();
    return logout();
}

export const registerUser = (credentials: IRegister, callback?: Function) => (
    (dispatch: any) => {
        dispatch(registerStart());
        if (credentials.password !== credentials.passwordCheck) {
            dispatch(registerFail("Passwords don't match"));
            return;
        }

        const user = {
            username: credentials.username.trim(),
            email: credentials.email.trim(),
            password: credentials.password,
            name: credentials.name.trim()
        }

        fetch("http://localhost:3030/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                user
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch(registerSuccess(data.user));
                setAuthToken(data.token);  
                callback?.apply(null);
            })
            .catch(error => {
                const status = error?.response?.status;
                const message = error?.response?.data?.message;

                if (status === 409) {
                    dispatch(registerFail(message));
                    return;
                }

                console.error(error);
            });        
    }
);

export const loginUser = (credentials: ILogin, callback?: Function) => (
    (dispatch: any) => {
        dispatch(loginStart());
        fetch("http://localhost:3030/api/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(data => {
            dispatch(loginSuccess(data.user));
            setAuthToken(data.token);
            callback?.apply(null);
        })
        .catch(error => {
            const status = error?.response?.status;
            const message = error?.response?.data?.message;
            if (status === 404 || status === 403) {
                dispatch(loginFail(message))
                return;
            }
            console.error(error);
        });
    }
);

const logout = () => ({
    type: EUserActions.LOGOUT
});

const registerStart = () => ({
    type: EUserActions.REGISTER_START
});

const registerFail = (error: string) => ({
    type: EUserActions.REGISTER_FAIL,
    payload: error
});

const registerSuccess = (user: IUser) => ({
    type: EUserActions.REGISTER_SUCCESS,
    payload: user
});

const loginStart = () => ({
    type: EUserActions.LOGIN_START
});

const loginSuccess = (user: any) => ({
    type: EUserActions.LOGIN_SUCCESS,
    payload: user
});

const loginFail = (error: string) => ({
    type: EUserActions.LOGIN_FAIL,
    payload: error
});