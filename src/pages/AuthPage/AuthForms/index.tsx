import { Box, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '../../../components/Logo';

const AuthForms: FC = () => {
    return (
        <Box
            h="100vh"
            px={{
                base: '10',
                sm: '28',
                md: '10',
                lg: '20',
                xl: '20',
                '3xl': '40',
            }}
            py="16"
            w="full"
        >
            <Box h="10">
                <Logo hideFrom="md" />
            </Box>
            <VStack alignItems="start" h="full" justifyContent="center" mt="-10">
                <Outlet />
            </VStack>
        </Box>
    );
};

export default AuthForms;
