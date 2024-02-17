import { Box, Center } from '@chakra-ui/react';
import { FC } from 'react';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

const DashboardLayout: FC = () => {
    return (
        <Center w="full" h="full" px="8%" pos="relative">
            <Box position="absolute" opacity={0.08}>
                <Logo width="80vw" height="80vh" />
            </Box>
            <Navbar />
        </Center>
    );
};

export default DashboardLayout;
