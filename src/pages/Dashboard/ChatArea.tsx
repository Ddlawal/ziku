import { Box, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';

import ChatInput from './ChatInput';
import ChatView from './ChatView';
import { EVENTS, IMessage } from '../../common/types';
import useSocket from '../../hooks/useSocket';
import useSocketEvent from '../../hooks/useSocketEvent';

const ChatArea: FC = () => {
    const [messages, setMessage] = useState<Array<IMessage>>([]);

    const { socket } = useSocket();
    useSocketEvent([
        {
            name: EVENTS.NEW_MESSAGE,
            cb: (data: IMessage) => setMessage((prev) => [...prev, data]),
        },
    ]);

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
            <Box h="90%" w="full">
                <ChatView messages={messages} />
            </Box>
            <Box w="full">
                <ChatInput handleSendMessage={handleSendMessage} />
            </Box>
        </VStack>
    );
};

export default ChatArea;
