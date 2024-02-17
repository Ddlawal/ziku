import http from '../common/http';
import { IResponse, ISignUpRequest, IUser } from '../common/types';

export const signUpRequest = async (payload: ISignUpRequest): Promise<IResponse<IUser>> => {
    return http.post<ISignUpRequest>({
        url: '/v1/users',
        body: payload,
    });
};
