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
        <Box w="full" pb="10px">
            <FormControl isInvalid={false}>
                <InputGroup size="md">
                    <Input
                        m={0}
                        type={'text'}
                        placeholder="Type here..."
                        bg="gray.300"
                        color="black"
                        _focusVisible={{}}
                        value={message}
                        onChange={handleClick}
                    />
                    <InputRightElement>
                        <Button
                            bg="transparent"
                            color="black"
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
