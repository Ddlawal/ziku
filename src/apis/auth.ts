import http from '../common/http';
import {
    IEmailConfirmation,
    ILoginRequest,
    IResponse,
    ISendEmailConfirmation,
    IUser,
    IValidateEmailConfirmation,
} from '../common/types';

export const loginRequest = async (payload: ILoginRequest): Promise<IResponse<IUser>> => {
    return http.post<ILoginRequest>({
        url: '/v1/auth/login',
        body: payload,
    });
};

export const logoutRequest = async (): Promise<IResponse> => {
    return http.post<ILoginRequest>({ url: '/v1/auth/logout' });
};

export const sendEmailConfirmationRequest = async (
    payload: ISendEmailConfirmation
): Promise<IResponse<IEmailConfirmation>> => {
    return http.post<ISendEmailConfirmation>({
        url: '/v1/auth/send-confirmation-code',
        body: payload,
    });
};

export const validateEmailConfirmationRequest = async (
    payload: IValidateEmailConfirmation
): Promise<IResponse<IEmailConfirmation>> => {
    return http.post<IValidateEmailConfirmation>({
        url: '/v1/auth/validate-confirmation-code',
        body: payload,
    });
};
