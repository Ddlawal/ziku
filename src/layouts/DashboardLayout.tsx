import {
    Avatar,
    Box,
    Center,
    HStack,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IoSettings } from 'react-icons/io5';
import { Outlet, useNavigate } from 'react-router-dom';

import { ChatHandler, PAGE_ROUTES } from '../common/types';
import Logo from '../components/Logo';
import useStore from '../hooks/useStore';

const DashboardLayout: FC = () => {
    const navigate = useNavigate();
    const { updateStore } = useStore();

    const setChatHandler = (handler: ChatHandler) => {
        updateStore({ chatHandler: handler });

        if (handler === ChatHandler.BOT) {
            navigate(PAGE_ROUTES.BOT_CHAT);
        } else {
            navigate(PAGE_ROUTES.HUMAN_CHAT);
        }
    };

    return (
        <Center w="full" h="full" px="8%" pos="relative">
            <Box position="absolute" opacity={0.08}>
                <Logo width="80vw" height="80vh" />
            </Box>
            <Tabs h="45rem" maxH="45rem" w="full" size="md" variant="enclosed">
                <TabList h="5%" border="none" mb="0">
                    <Tab
                        _selected={{
                            border: '1px solid #8C8792',
                            borderBottom: 'none',
                            borderTopRadius: '10px',
                        }}
                        cursor="pointer"
                        onClick={() => setChatHandler(ChatHandler.BOT)}
                    >
                        Ziku
                    </Tab>
                    <Tab
                        _selected={{
                            border: '1px solid #8C8792',
                            borderBottom: 'none',
                            borderTopRadius: '10px',
                        }}
                        cursor="pointer"
                        onClick={() => setChatHandler(ChatHandler.HUMAN)}
                    >
                        PSychic
                    </Tab>
                    <HStack w="full" justifyContent="end" spacing={3}>
                        <IoSettings size={24} />
                        <Avatar w="1.5rem" h="1.5rem" />
                        <Text>Muhammad Lawal</Text>
                    </HStack>
                </TabList>
                <TabIndicator mt="0.2px" height="2px" bg="white" borderRadius="1px" />
                <Box borderBottomRadius="30px" border="1px solid gray" h="95%" w="full" p="1px">
                    <TabPanels h="full">
                        <TabPanel h="full">
                            <Outlet />
                        </TabPanel>
                        <TabPanel h="full">
                            <Outlet />
                        </TabPanel>
                    </TabPanels>
                </Box>
            </Tabs>
        </Center>
    );
};

export default DashboardLayout;
