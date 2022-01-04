export interface UserCredentials {
    username: string;
    password: string;
}

export interface IUser {
}

export interface IUserState {
    user: IUser | null;
    error: string | null;
    isFetching: boolean
}