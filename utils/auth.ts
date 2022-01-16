let authToken: null | string = null;

export function setAuthToken(token: string) {
    token = "Bearer " + token;
    localStorage.setItem("token", token);
}

export function authFetch(input: RequestInfo, init?: RequestInit) {
    return new Promise<Response>((resolve, reject) => {
        if (authToken === null) {
            reject({
                message: "Auth token is null"
            });
            return;
        }

        fetch(input, {
            ...init,
            headers: {
                authorization: authToken,
                ...init?.headers
            }
        })
            .then(res => resolve(res))
            .catch(error => reject(error));
    });
}

export function removeAuthToken() {
    authToken = null;
    localStorage.removeItem("token");
}