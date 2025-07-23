import { User } from "@/lib/types/User";
import { PollResult } from "@/lib/types/Poll";

export interface BaseResponse {
    success: boolean;
    message?: string;
}

export interface LoginResponse extends BaseResponse {
    user?: User;
    token?: string;
}

export interface RegisterResponse extends BaseResponse {
    user?: User;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogoutResponse extends BaseResponse {}

export interface MeResponseData extends BaseResponse {
    user?: User;
}

export interface PollResultResponse extends BaseResponse {
    poll: PollResult
}
