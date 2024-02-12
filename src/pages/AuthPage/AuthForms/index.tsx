import { Box, Center, Text, VStack } from '@chakra-ui/react';
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
            <VStack alignItems="start" h="full" justifyContent="center">
                <Center w="full" mb="10">
                    <VStack>
                        <Logo />
                        <Text>ZIKU</Text>
                    </VStack>
                </Center>
                <Outlet />
            </VStack>
        </Box>
    );
};

export default AuthForms;
