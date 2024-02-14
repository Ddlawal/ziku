import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { format } from 'date-fns';

import { ChatHandler, IMessage } from '../../common/types';
import useStore from '../../hooks/useStore';

interface IChatView {
    messages: Array<IMessage>;
}

const currentUser = '22';

const ChatView: FC<IChatView> = ({ messages }) => {
    const { store } = useStore();
    console.log(store);

    return (
        <VStack h="full" w="full" justifyContent="end">
            {messages.length ? (
                <Box
                    w="full"
                    maxH="35rem"
                    overflowY="scroll"
                    className="customScrollBar"
                    pos="relative"
                    pr="10px"
                >
                    {messages.map(({ body, senderId, timestamp }) => {
                        const isCurrentUser = currentUser === senderId;
                        return (
                            <HStack
                                key={`${senderId}-${timestamp}`}
                                justifyContent={isCurrentUser ? 'end' : 'start'}
                                mb="4px"
                            >
                                <VStack
                                    maxW="80%"
                                    px="10px"
                                    py="4px"
                                    bg={isCurrentUser ? '#44447F' : '#191919'}
                                    rounded="10px"
                                    alignItems="start"
                                    spacing={0}
                                    // _after={{
                                    //     content: '',
                                    //     h: '30px',
                                    //     w: '30px',
                                    // }}
                                >
                                    <Text fontSize="sm">{body}</Text>
                                    <Text fontSize="10px" ml="auto">
                                        {format(timestamp, 'hh:mm')}
                                    </Text>
                                </VStack>
                            </HStack>
                        );
                    })}
                </Box>
            ) : (
                <VStack h="full" justifyContent="center">
                    <Text fontSize="2rem">
                        Chat with {store.chatHandler === ChatHandler.BOT ? 'Ziku' : 'a psychic'}
                    </Text>
                </VStack>
            )}
        </VStack>
    );
};

export default ChatView;
