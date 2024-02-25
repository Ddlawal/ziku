import { Box, VStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import ChatInput from './ChatInput';
import ChatView from './ChatView';
import { EVENTS, IMessage, IMessageData } from '../../common/types';
import useSocket from '../../hooks/useSocket';
import useSocketEvent from '../../hooks/useSocketEvent';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../common/constants';
import { getMessagesRequest } from '../../apis/messages';
import useStore from '../../hooks/useStore';

const ChatArea: FC = () => {
    const [messages, setMessage] = useState<Array<IMessage>>([]);
    const [isTyping, setIsTyping] = useState(false);
    const { socket } = useSocket();
    const { store } = useStore();

    const conversationId = store.currentUser?.recentConversation?.id;
    const { data, isPending } = useQuery({
        queryKey: [QUERY_KEYS.MESSAGES.GET_MESSAGES, conversationId],
        queryFn: () => getMessagesRequest({ conversationId: String(conversationId) }),
        enabled: !!conversationId,
    });

    const initialMessages = data?.data;

    useEffect(() => {
        if (!isPending && initialMessages?.length) {
            setMessage(initialMessages);
        }
    }, [isPending]);

    const handleTypingEvent = (data: IMessage | null) => {
        if (!data) {
            setIsTyping(false);
        } else {
            setIsTyping(true);
            setMessage((prev) => [...prev, data]);
        }
    };

    const handleMessageEvent = (data: IMessage) => setMessage((prev) => [...prev, data]);

    useSocketEvent([
        {
            name: EVENTS.TYPING,
            cb: handleTypingEvent,
        },
        {
            name: EVENTS.NEW_MESSAGE,
            cb: handleMessageEvent,
        },
    ]);

    const handleSendMessage = (body: IMessageData) => {
        const conversationId = messages.at(-1)?.conversationId;
        const data: Partial<IMessage> = { ...body, conversationId };

        socket.emit(EVENTS.NEW_MESSAGE, data);
    };

    return (
        <VStack
            border="none"
            h="full"
            w="full"
            overflow="hidden"
            rounded="10px"
            px={{ base: '5%', md: '15%' }}
        >
            <Box h="90%" w="full">
                <ChatView isPending={isPending} isTyping={isTyping} messages={messages} />
            </Box>
            <Box w="full">
                <ChatInput handleSendMessage={handleSendMessage} />
            </Box>
        </VStack>
    );
};

export default ChatArea;
