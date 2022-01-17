export interface ILogin {
    username: string,
    password: string
}

export interface IRegister {
    name: string,
    email: string,
    username: string,
    password: string,
    passwordCheck: string
}

export interface IUser {
}

export interface IUserState {
    user: IUser | null,
    error: string | null,
    isFetching: boolean
}

export interface ISliderItem {
    id: string | number
}

export interface ISlider {
    left: {
        src: number;
        handle: boolean | (() => void);
    };
    right: {
        dest: number;
        handle: boolean | (() => void);
    };
}

export type Nullable<T> = T | null;

export interface ISliderNav {
    left: number,
    right: number
}