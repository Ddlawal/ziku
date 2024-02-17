import { FormControl, Input, FormErrorMessage, Box, Text, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { sendEmailConfirmationRequest } from '../../../apis/auth';
import { IEmailConfirmation, ISendEmailConfirmation, PAGE_ROUTES } from '../../../common/types';
import Button from '../../../components/Form/Button';
import useLocalMutation from '../../../hooks/useLocalMutation';

const SendEmailConfirmationForm: FC = () => {
    const navigate = useNavigate();

    const { formState, register, handleSubmit } = useForm<ISendEmailConfirmation>();

    const { isPending, mutate } = useLocalMutation<IEmailConfirmation, ISendEmailConfirmation>({
        mutationFn: ({ email }) => sendEmailConfirmationRequest({ email }),
        onSuccess: (res) => {
            navigate(PAGE_ROUTES.VALIDATE_EMAIL_CONFIRMATION, {
                state: { confirmationId: res.data?.id },
            });
        },
    });

    const sendEmailConfirmation: SubmitHandler<ISendEmailConfirmation> = (data) => mutate(data);

    return (
        <form style={{ width: '100%' }} onSubmit={handleSubmit(sendEmailConfirmation)}>
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
            <Button type="submit" isLoading={isPending} isDisabled={formState.disabled}>
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

export default SendEmailConfirmationForm;
