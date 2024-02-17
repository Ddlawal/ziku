import { HStack } from '@chakra-ui/react';
import { FC } from 'react';

import AuthForms from './AuthForms';

const AuthPage: FC = () => {
    return (
        <HStack w={{ base: '80%', sm: '70%', md: '60%', lg: '40rem' }}>
            <AuthForms />
        </HStack>
    );
};

export default AuthPage;
