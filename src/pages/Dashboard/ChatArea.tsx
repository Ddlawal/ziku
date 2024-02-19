import { VStack } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import ChatInput from './ChatInput';
import ChatView from './ChatView';
import { EVENTS, IMessage } from '../../common/types';
import useSocket from '../../hooks/useSocket';

const ChatArea: FC = () => {
    const [messages, setMessage] = useState<Array<IMessage>>([]);
    const { socket } = useSocket();

    const listenToEvents = useCallback(() => {
        socket.on(EVENTS.NEW_MESSAGE, (data) => {
            console.log('Received message from server:', data);
            setMessage((prev) => [...prev, data]);
        });
    }, []);

    useEffect(listenToEvents, []);

    const handleSendMessage = (body: IMessage) => {
        socket.emit(EVENTS.NEW_MESSAGE, body);
        setMessage((prev) => [...prev, body]);
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
            <ChatView messages={messages} />
            <ChatInput handleSendMessage={handleSendMessage} />
        </VStack>
    );
};

export default ChatArea;
