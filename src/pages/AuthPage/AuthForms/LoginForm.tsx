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
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { loginRequest } from '../../../apis/auth';
import { ILoginRequest, IUser, PAGE_ROUTES } from '../../../common/types';
import Button from '../../../components/Form/Button';
import useLocalMutation from '../../../hooks/useLocalMutation';
import useStore from '../../../hooks/useStore';

const LoginForm: FC = () => {
    const navigate = useNavigate();
    const { updateStore } = useStore();

    const [show, setShow] = useState(false);
    const { formState, register, handleSubmit } = useForm<ILoginRequest>();
    const { mutate } = useLocalMutation<IUser, ILoginRequest>({
        mutationFn: ({ email, password }) => loginRequest({ email, password }),
        onSuccess: (res) => {
            updateStore({ currentUser: res.data });
            navigate(PAGE_ROUTES.BOT_CHAT);
        },
    });

    const handleClick = () => setShow(!show);
    const login: SubmitHandler<ILoginRequest> = (data) => mutate(data);

    return (
        <form style={{ width: '100%' }} onSubmit={handleSubmit(login)}>
            <FormControl isInvalid={false} mb="3">
                <Input
                    type="email"
                    placeholder="Email"
                    w="full"
                    bg="white"
                    color="primary"
                    _focusVisible={{}}
                    {...register('email', { required: true })}
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
                        {...register('password', { required: true })}
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
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                </Box>
            </FormControl>
            <HStack justifyContent="end" mb="8">
                <Link to={PAGE_ROUTES.FORGOT_PASSWORD}>
                    <Text fontSize="small">Forgot Password?</Text>
                </Link>
            </HStack>
            <Button type="submit" isDisabled={formState.disabled}>
                Log in
            </Button>
            <HStack justifyContent="center" mt="6">
                <Text fontSize="small">Don't have an account?</Text>
                <Link to={PAGE_ROUTES.SEND_EMAIL_CONFIRMATION}>
                    <Text as="span" color="#20b2aa">
                        Sign up
                    </Text>
                </Link>
            </HStack>
        </form>
    );
};

export default LoginForm;
