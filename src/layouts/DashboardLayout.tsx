import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Outlet } from 'react-router-dom';

const DashboardLayout: FC = () => {
    return (
        <Center w="full" h="full" px="8%">
            <VStack h="45rem" maxH="45rem" w="full" spacing={0}>
                <HStack w="full">
                    <Text>Heading</Text>
                </HStack>
                <Box
                    bg="linear-gradient(to bottom right, white -100%, rgba(0, 0, 0, 0) 110%)"
                    borderBottomRadius="30px"
                    h="full"
                    w="full"
                    p="1px"
                >
                    <Box h="full" w="full" bg="bg" borderBottomRadius="30px">
                        <Outlet />
                    </Box>
                </Box>
            </VStack>
        </Center>
    );
};

export default DashboardLayout;
