import { Box, Center, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '../../../components/Logo';

const AuthForms: FC = () => {
    return (
        <Box h="100vh" maxH="full" px="10" py="16" w="full">
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
