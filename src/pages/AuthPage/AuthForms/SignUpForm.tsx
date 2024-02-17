import {
    FormControl,
    Input,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    Box,
    Text,
    HStack,
    useToast,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';

import { signUpRequest } from '../../../apis/users';
import { ISignUpRequest, IUser, PAGE_ROUTES } from '../../../common/types';
import Button from '../../../components/Form/Button';
import useLocalMutation from '../../../hooks/useLocalMutation';
import useStore from '../../../hooks/useStore';

const SignUpForm: FC = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { store } = useStore();

    const [show, setShow] = useState(false);
    const { formState, register, handleSubmit } = useForm<ISignUpRequest>();
    const { mutate } = useLocalMutation<IUser, ISignUpRequest>({
        mutationFn: ({ email, password, confirmPassword, firstName, lastName }) =>
            signUpRequest({ firstName, lastName, email, password, confirmPassword }),
        onSuccess: (res) => {
            toast({
                title: 'Success',
                description: res.message,
                status: 'success',
                duration: 2000,
                isClosable: false,
            });
            localStorage.removeItem('auth');
            navigate('/');
        },
    });

    const handleClick = () => setShow(!show);
    const signUp: SubmitHandler<ISignUpRequest> = (data) => mutate(data);

    return (
        <form style={{ width: '100%' }} onSubmit={handleSubmit(signUp)}>
            <FormControl isInvalid={false} mb="3">
                <Input
                    type="name"
                    placeholder="First Name"
                    w="full"
                    bg="white"
                    color="primary"
                    _focusVisible={{}}
                    {...register('firstName', { required: true })}
                />
                <Box h="5">
                    <FormErrorMessage>First Name is required.</FormErrorMessage>
                </Box>
            </FormControl>
            <FormControl isInvalid={false} mb="3">
                <Input
                    type="name"
                    placeholder="Last Name"
                    w="full"
                    bg="white"
                    color="primary"
                    _focusVisible={{}}
                    {...register('lastName', { required: true })}
                />
                <Box h="5">
                    <FormErrorMessage>Last Name is required.</FormErrorMessage>
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
                    value={store.auth.confirmationEmail || ''}
                    isDisabled
                    {...register('email', {
                        required: true,
                        value: store.auth.confirmationEmail || '',
                    })}
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
            <FormControl isInvalid={false}>
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        bg="white"
                        color="primary"
                        _focusVisible={{}}
                        {...register('confirmPassword', { required: true })}
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
                    <FormErrorMessage>Enter your password again</FormErrorMessage>
                </Box>
            </FormControl>
            <HStack justifyContent="end" mb="8">
                <Link to={PAGE_ROUTES.FORGOT_PASSWORD}>
                    <Text fontSize="small">Forgot Password?</Text>
                </Link>
            </HStack>
            <Button type="submit" isDisabled={formState.disabled}>
                Sign up
            </Button>
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
