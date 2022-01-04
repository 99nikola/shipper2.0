import { UserCredentials } from "../../typescript";
import { setAuthToken } from "../../utils/auth";

export enum EUserActions {
    LOGIN_SUCCESS = "user::LOGIN_SUCCESS",
    LOGIN_START = "user::LOGIN_START",
    LOGIN_FAIL = "user::LOGIN_FAIL"
}

export const loginUser = (userCredentials: UserCredentials) => (
    (dispatch: any) => {
        dispatch(loginStart());
        fetch("http://localhost:3030/api/auth/login", {
            method: "POST",
            body: userCredentials as any
        })
            .then(res => res.json())
            .then(data => {
                dispatch(loginSuccess(data.user));
                setAuthToken(data.token);
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

export const loginStart = () => ({
    type: EUserActions.LOGIN_START
});

export const loginSuccess = (user: any) => ({
    type: EUserActions.LOGIN_SUCCESS,
    payload: user
});

export const loginFail = (error: string) => ({
    type: EUserActions.LOGIN_FAIL,
    payload: error
});