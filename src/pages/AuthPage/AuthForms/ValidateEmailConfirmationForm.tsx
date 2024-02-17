import { FormControl, Input, FormErrorMessage, Box, Text, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { validateEmailConfirmationRequest } from '../../../apis/auth';
import { IEmailConfirmation, IValidateEmailConfirmation, PAGE_ROUTES } from '../../../common/types';
import Button from '../../../components/Form/Button';
import useLocalMutation from '../../../hooks/useLocalMutation';
import useStore from '../../../hooks/useStore';

const ValidateEmailConfirmationForm: FC = () => {
    const navigate = useNavigate();
    const { updateStore } = useStore();
    const { state } = useLocation();

    const { formState, register, handleSubmit } = useForm<Omit<IValidateEmailConfirmation, 'id'>>();

    const { mutate } = useLocalMutation<IEmailConfirmation, Omit<IValidateEmailConfirmation, 'id'>>(
        {
            mutationFn: ({ code }) =>
                validateEmailConfirmationRequest({ code, id: state.confirmationId }),
            onSuccess: (res) => {
                const data = res.data as IEmailConfirmation;
                updateStore({ auth: { confirmationEmail: data?.email, confirmationId: data?.id } });
                navigate(PAGE_ROUTES.SIGN_UP, { state: { email: res.data?.email } });
            },
        }
    );

    const validateConfirmationCode: SubmitHandler<Omit<IValidateEmailConfirmation, 'id'>> = (
        data
    ) => mutate(data);

    return (
        <form style={{ width: '100%' }} onSubmit={handleSubmit(validateConfirmationCode)}>
            <Text>Confirm Email</Text>
            <Text>Enter the confirmation code sent to your email</Text>
            <FormControl isInvalid={false} mb="3">
                <Input
                    type="code"
                    placeholder="Code"
                    w="full"
                    bg="white"
                    color="primary"
                    _focusVisible={{}}
                    {...register('code', { required: true })}
                />
                <Box h="5">
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                </Box>
            </FormControl>
            <Button type="submit" isDisabled={formState.disabled}>
                Submit
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

export default ValidateEmailConfirmationForm;
