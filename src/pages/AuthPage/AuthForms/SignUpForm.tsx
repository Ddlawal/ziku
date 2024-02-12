import {
    FormControl,
    Input,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    Box,
    Text,
    HStack,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import { PAGE_ROUTES } from '../../../common/types';
import Button from '../../../components/Form/Button';

const SignUpForm: FC = () => {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    return (
        <form style={{ width: '100%' }}>
            <FormControl isInvalid={false} mb="3">
                <Input
                    type="name"
                    placeholder="Name"
                    w="full"
                    bg="white"
                    color="primary"
                    _focusVisible={{}}
                />
                <Box h="5">
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                </Box>
            </FormControl>
            <FormControl isInvalid={false} mb="3">
                <Input
                    type="email"
                    placeholder="Email"
                    w="full"
                    bg="white"
                    color="primary"
                    _focusVisible={{}}
                />
                <Box h="5">
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                </Box>
            </FormControl>
            <FormControl isInvalid={false}>
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Password"
                        bg="white"
                        color="primary"
                        _focusVisible={{}}
                    />
                    <InputRightElement width="4.5rem">
                        <Button
                            bg="transparent"
                            color="primary"
                            size="sm"
                            _hover={{}}
                            _active={{}}
                            onClick={handleClick}
                        >
                            {show ? <PiEyeClosedBold /> : <PiEyeBold />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Box h="5">
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                </Box>
            </FormControl>
            <HStack justifyContent="end" mb="8">
                <Link to={PAGE_ROUTES.FORGOT_PASSWORD}>
                    <Text fontSize="small">Forgot Password?</Text>
                </Link>
            </HStack>
            <Button>Sign up</Button>
            <HStack justifyContent="center" mt="6">
                <Text fontSize="small">Already have an account?</Text>
                <Link to="/">
                    <Text as="span" color="#20b2aa">
                        Log in
                    </Text>
                </Link>
            </HStack>
        </form>
    );
};

export default SignUpForm;
