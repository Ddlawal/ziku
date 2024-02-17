import { HStack } from '@chakra-ui/react';
import { FC } from 'react';

import AuthForms from './AuthForms';

const AuthPage: FC = () => {
    return (
        <HStack w={{ base: '80%', sm: '70%', md: '50%', lg: '30rem' }}>
            <AuthForms />
        </HStack>
    );
};

export default AuthPage;
