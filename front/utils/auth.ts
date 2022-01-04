const authToken = null;

export function setAuthToken(token: string) {
    token = "Bearer " + token;
    localStorage.setItem("token", token);
}

export function authFetch(input: RequestInfo, init?: RequestInit) {
    fetch(input, {
        ...init,
        headers: {
            authorization: authToken as any,
            ...init?.headers
        }
    });
}