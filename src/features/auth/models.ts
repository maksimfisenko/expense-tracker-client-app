export interface Credentials {
    username: string;
    password: string;
}

export interface AxiosErrorResponseData {
    detail: string;
    instance: string;
    status: number;
    title: string;
}

export interface AccessToken {
    idToken: string;
}