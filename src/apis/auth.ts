import http from '../common/http';
import { IResponse, IUser } from '../common/types';

export interface ILoginRequest {
    email: string;
    password: string;
}

export const loginRequest = async (payload: ILoginRequest): Promise<IResponse<IUser>> => {
    return http.post<ILoginRequest>({
        url: '/v1/auth/login',
        body: payload,
    });
};

export const logoutRequest = async (): Promise<IResponse> => {
    return http.post<ILoginRequest>({ url: '/v1/auth/logout' });
};
