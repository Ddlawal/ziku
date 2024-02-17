import { VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';

import ChatInput from './ChatInput';
import ChatView from './ChatView';
import { EVENTS } from '../../common/types';
import { IMessage } from '../../common/types';
import { useSocket } from '../../hooks/useSocket';

const ChatArea: FC = () => {
    const [messages, setMessage] = useState<Array<IMessage>>([]);

    const handleSendMessage = (msg: IMessage) => setMessage((prev) => [...prev, msg]);

    useSocket({ [EVENTS.NEW_CONVERSATION]: (data) => setMessage((prev) => [...prev, data]) });

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
