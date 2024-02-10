import { Divider, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { IMessage } from '../../common/types';

import ChatInput from './ChatInput';
import ChatView from './ChatView';

const ChatArea: FC = () => {
    const [messages, setMessage] = useState<Array<IMessage>>([
        {
            body: 'Welcome Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae sint aut voluptatibus veritatis provident non ipsum placeat soluta quibusdam a! Ratione suscipit animi odio ducimus at illum dolorum temporibus nobis!',
            senderId: 'bot',
            timestamp: new Date(),
        },
    ]);

    const handleSendMessage = (msg: IMessage) => setMessage((prev) => [...prev, msg]);

    return (
        <VStack
            border="1px solid lavender"
            borderLeft="none"
            borderRight="none"
            h={{ base: '60vh' }}
            w={{ base: '30rem' }}
            overflow="hidden"
            rounded="10px"
            px="10px"
        >
            <ChatView messages={messages} />
            <Divider color="red" size="10" w="full" borderColor="red" />
            <ChatInput handleSendMessage={handleSendMessage} />
        </VStack>
    );
};

export default ChatArea;
