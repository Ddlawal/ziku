import { Divider, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { EVENTS } from '../../common/constants';
import { IMessage } from '../../common/types';
import { useSocket } from '../../hooks/useSocket';

import ChatInput from './ChatInput';
import ChatView from './ChatView';

const ChatArea: FC = () => {
    const [messages, setMessage] = useState<Array<IMessage>>([]);

    const handleSendMessage = (msg: IMessage) => setMessage((prev) => [...prev, msg]);

    useSocket({ [EVENTS.NEW_CONVERSATION]: (data) => setMessage((prev) => [...prev, data]) });

    return (
        <VStack
            border="none"
            h="75vh"
            w={{ base: '30rem' }}
            overflow="hidden"
            rounded="10px"
            px="10px"
        >
            <ChatView messages={messages} />
            <ChatInput handleSendMessage={handleSendMessage} />
        </VStack>
    );
};

export default ChatArea;
