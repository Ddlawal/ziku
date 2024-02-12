import { Box, Button, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEventHandler, FC, useState } from 'react';
import { BsSendFill } from 'react-icons/bs';
import { IMessage } from '../../common/types';

interface IChatInput {
    handleSendMessage: (msg: IMessage) => void;
}

const ChatInput: FC<IChatInput> = ({ handleSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleClick: ChangeEventHandler<HTMLInputElement> = (e) =>
        setMessage(e.currentTarget.value);
    const handleSubmit = () => {
        const data: IMessage = { body: message, senderId: '22', timestamp: new Date() };

        handleSendMessage(data);
        setMessage('');
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
