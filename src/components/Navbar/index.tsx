import {
    Tabs,
    TabList,
    // Tab,
    HStack,
    Menu,
    MenuButton,
    Button,
    Avatar,
    MenuList,
    MenuItem,
    TabIndicator,
    TabPanels,
    TabPanel,
    Box,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';
import { Outlet, useNavigate } from 'react-router-dom';

import { logoutRequest } from '../../apis/auth';
// import { ChatHandler, PAGE_ROUTES } from '../../common/types';
import useLocalMutation from '../../hooks/useLocalMutation';
import useSocket from '../../hooks/useSocket';
import useStore from '../../hooks/useStore';

const Navbar: FC = () => {
    const navigate = useNavigate();
    const { store } = useStore();
    const { isConnected } = useSocket();

    // const setChatHandler = (handler: ChatHandler) => {
    //     updateStore({ chatHandler: handler });

    //     if (handler === ChatHandler.BOT) {
    //         navigate(PAGE_ROUTES.BOT_CHAT);
    //     } else {
    //         navigate(PAGE_ROUTES.HUMAN_CHAT);
    //     }
    // };
    const { mutate } = useLocalMutation({
        mutationFn: () => logoutRequest(),
        onSuccess: () => {
            localStorage.removeItem('currentUser');
            navigate('/');
        },
    });

    const logout = () => mutate({});

    return (
        <Tabs
            h={{ base: 'full', md: '85%' }}
            maxH={{ base: '95%', md: '45rem' }}
            w="full"
            size="md"
            variant="enclosed"
        >
            <TabList h="5%" border="none" mb="0">
                {/* <Tab
                    _selected={{
                        border: '1px solid #8C8792',
                        borderBottom: 'none',
                        borderTopRadius: '10px',
                    }}
                    cursor="pointer"
                    onClick={() => setChatHandler(ChatHandler.BOT)}
                >
                    Ziku
                </Tab> */}
                {/* <Tab
                    _selected={{
                        border: '1px solid #8C8792',
                        borderBottom: 'none',
                        borderTopRadius: '10px',
                    }}
                    cursor="pointer"
                    onClick={() => setChatHandler(ChatHandler.HUMAN)}
                >
                    PSychic
                </Tab> */}
                <HStack w="full" justifyContent="end" spacing={3}>
                    <Menu>
                        <Box h="3" w="3" rounded="full" bg={isConnected ? 'green' : 'red'} />
                        <MenuButton
                            as={Button}
                            bg="transparent"
                            p={0}
                            minW={0}
                            _hover={{}}
                            _active={{}}
                        >
                            <HStack spacing={3} justifyContent="end">
                                <Avatar w="1.2rem" h="1.2rem" />
                                <Text
                                    color="lavender"
                                    hideBelow="sm"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                    w={{ base: '10rem', md: 'full' }}
                                >
                                    {store.currentUser?.fullName}
                                </Text>
                            </HStack>
                        </MenuButton>
                        <MenuList color="primary">
                            <MenuItem cursor="pointer">
                                <HStack spacing={3} w="full">
                                    <IoSettingsOutline size={20} />
                                    <Text>Settings</Text>
                                </HStack>
                            </MenuItem>
                            <MenuItem onClick={logout} cursor="pointer">
                                <HStack spacing={3} w="full">
                                    <IoLogOutOutline size={20} />
                                    <Text>Logout</Text>
                                </HStack>
                            </MenuItem>
                        </MenuList>
                    </Menu>
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
    );
};

export default Navbar;
