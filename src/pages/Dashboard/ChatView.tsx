import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';

import { ChatHandler, EVENTS, IMessage } from '../../common/types';
import useStore from '../../hooks/useStore';
import useSocketEvent from '../../hooks/useSocketEvent';
import { Comment } from 'react-loader-spinner';

interface IChatView {
    messages: Array<IMessage>;
}

const ChatView: FC<IChatView> = ({ messages }) => {
    const { store } = useStore();
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Function to scroll to the bottom of the chat view
    const scrollToBottom = () => {
        // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        const element = messagesEndRef.current;
        console.log(element?.scrollHeight);
        const scrollHeight = element?.scrollHeight;
        element?.scrollTo({
            top: scrollHeight,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        scrollToBottom();
    }, [messages, isTyping]);

    useSocketEvent([
        {
            name: EVENTS.TYPING,
            cb: (data) => setIsTyping(data),
        },
    ]);

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
                    {messages.map(({ body, senderId, timestamp }) => {
                        const isCurrentUser = store.currentUser?.id === senderId;
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
                                    bg={isCurrentUser ? '#363665' : '#191919'}
                                    rounded="10px"
                                    alignItems="start"
                                    spacing={0}
                                    border={`1px solid ${isCurrentUser ? '#696998' : '#464646'}`}
                                >
                                    <Text fontSize="12px">{body}</Text>
                                    <Text fontSize="10px" ml="auto">
                                        {format(timestamp, 'hh:mm')}
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
