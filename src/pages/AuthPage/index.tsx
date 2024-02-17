import { HStack } from '@chakra-ui/react';
import { FC } from 'react';

import AuthForms from './AuthForms';

const AuthPage: FC = () => {
    return (
        <HStack w={{ base: 'full', sm: '80%', md: '30rem', lg: '30rem' }}>
            <AuthForms />
        </HStack>
    );
};

export default AuthPage;
