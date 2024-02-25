import { Box, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import { FC, useEffect, useRef } from 'react';
import { format } from 'date-fns';

import { ChatHandler, IMessage } from '../../common/types';
import useStore from '../../hooks/useStore';
import { Comment } from 'react-loader-spinner';

interface IChatView {
    isPending: boolean;
    isTyping: boolean;
    messages: Array<IMessage>;
}

const ChatView: FC<IChatView> = ({ isPending, isTyping, messages }) => {
    const { store } = useStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        const element = messagesEndRef.current;
        const scrollHeight = element?.scrollHeight;

        element?.scrollTo({
            top: scrollHeight,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    if (isPending) {
        return (
            <VStack h="full" w="full" justifyContent="end">
                <Box
                    w="full"
                    maxH="35rem"
                    overflowY="scroll"
                    className="no-scrollbar"
                    pos="relative"
                    pr="10px"
                    ref={messagesEndRef}
                >
                    {Array(3)
                        .fill(0)
                        .map((_, index) => {
                            const isCurrentUser = index % 2 === 0;
                            return (
                                <HStack
                                    key={`dummy-${index}`}
                                    justifyContent={isCurrentUser ? 'end' : 'start'}
                                    mb="16px"
                                >
                                    <Skeleton
                                        endColor={isCurrentUser ? '#363665' : '#191919'}
                                        h="2.5rem"
                                        rounded="10px"
                                        startColor={isCurrentUser ? '#696998' : '#464646'}
                                        w="80%"
                                    />
                                </HStack>
                            );
                        })}
                </Box>
            </VStack>
        );
    }

    return (
        <VStack h="full" w="full" justifyContent="end">
            {messages.length ? (
                <Box
                    w="full"
                    maxH="35rem"
                    overflowY="scroll"
                    className="no-scrollbar"
                    pos="relative"
                    pr="10px"
                    ref={messagesEndRef}
                >
                    {messages.map(({ body, senderId, createdAt }, index) => {
                        const isCurrentUser = store.currentUser?.id === senderId;
                        return (
                            <HStack
                                key={`${senderId}-${createdAt}-${index}`}
                                justifyContent={isCurrentUser ? 'end' : 'start'}
                                mb="4px"
                            >
                                <VStack
                                    maxW="80%"
                                    px="10px"
                                    py="4px"
                                    bg={isCurrentUser ? '#363665' : '#191919'}
                                    rounded="10px"
                                    alignItems="start"
                                    spacing={0}
                                    border={`1px solid ${isCurrentUser ? '#696998' : '#464646'}`}
                                >
                                    <Text fontSize="12px">{body}</Text>
                                    <Text fontSize="10px" ml="auto">
                                        {format(createdAt, 'hh:mm')}
                                    </Text>
                                </VStack>
                            </HStack>
                        );
                    })}

                    <Box>
                        <Comment
                            visible={isTyping}
                            height="70"
                            width="80"
                            ariaLabel="comment-loading"
                            wrapperStyle={{}}
                            wrapperClass="comment-wrapper"
                            color="#fff"
                            backgroundColor="#191919"
                        />
                    </Box>
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
