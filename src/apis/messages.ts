import http from '../common/http';
import { ILoginRequest, IMessage, IResponse } from '../common/types';

export const getMessagesRequest = async ({
    conversationId,
}: {
    conversationId: string;
}): Promise<IResponse<Array<IMessage>>> => {
    return http.get<ILoginRequest>({
        url: `/v1/messages/${conversationId}`,
    });
};
