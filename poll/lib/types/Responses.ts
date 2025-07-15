export interface BaseResponseData {
    success: boolean;
    message?: string;
}

export interface LoginResponseData extends BaseResponseData {
    user?: {
        id: string;
        username: string;
        email: string;
        country?: string;
    };
}
