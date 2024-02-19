import { Box, Button, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from 'react';
import { BsSendFill } from 'react-icons/bs';
import { IMessage } from '../../common/types';
import useStore from '../../hooks/useStore';

interface IChatInput {
    handleSendMessage: (msg: IMessage) => void;
}

const ChatInput: FC<IChatInput> = ({ handleSendMessage }) => {
    const { store } = useStore();
    const [message, setMessage] = useState('');

    const handleClick: ChangeEventHandler<HTMLInputElement> = (e) =>
        setMessage(e.currentTarget.value);
    const handleSubmit = () => {
        const data: IMessage = {
            body: message,
            senderId: String(store.currentUser?.id),
            timestamp: new Date(),
        };

        handleSendMessage(data);
        setMessage('');
    };
    const handleEnterKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Box
            bg="linear-gradient(to bottom right, white -100%, rgba(0, 0, 0, 0) 110%)"
            borderRadius="8px"
            p="1px"
            w="full"
        >
            <FormControl isInvalid={false}>
                <InputGroup size="md">
                    <Input
                        m={0}
                        type={'text'}
                        placeholder="Type here..."
                        bg="bg"
                        color="white"
                        _focusVisible={{}}
                        value={message}
                        border="none"
                        onChange={handleClick}
                        onKeyUp={handleEnterKeyPress}
                    />
                    <InputRightElement>
                        <Button
                            bg="transparent"
                            color="white"
                            size="sm"
                            _hover={{}}
                            _active={{}}
                            p={0}
                            onClick={handleSubmit}
                            isDisabled={!message}
                        >
                            <BsSendFill />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </Box>
    );
};

export default ChatInput;
