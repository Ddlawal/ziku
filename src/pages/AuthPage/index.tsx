import { HStack } from '@chakra-ui/react';
import { FC } from 'react';

import AuthForms from './AuthForms';

const AuthPage: FC = () => {
    return (
        <HStack w={{ base: '80%', sm: '60%', md: '50%' }}>
            <AuthForms />
        </HStack>
    );
};

export default AuthPage;
