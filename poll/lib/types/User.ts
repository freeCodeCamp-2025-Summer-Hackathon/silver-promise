export interface BaseUser {

}

export interface BaseUserPayload {
    password: string;
}

export interface UserRegisterPayload extends BaseUserPayload {
    username: string;
    email: string;
    confirmPassword: string;
    country: string;
}

export interface UserLoginPayload extends BaseUserPayload {
    /**
     * User identifier can be either email or username.
     */
    userIdentifier: string;
}

export interface User extends BaseUser {
    id: string;
    username: string;
    email: string;
    country: string;
}
