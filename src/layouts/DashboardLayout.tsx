import { Box, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

const DashboardLayout: FC = () => {
    return (
        <VStack w="full" h="full" justifyContent="center" px="8%" pos="relative">
            <Box position="absolute" opacity={0.08}>
                <Logo width="80vw" height="80vh" />
            </Box>
            <Navbar />
        </VStack>
    );
};

export default DashboardLayout;
