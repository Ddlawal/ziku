import { Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import ChatArea from './ChatArea';

const Home: FC = () => {
    return (
        <VStack w="full" h="100vh" py="5rem">
            <Text>ZIKU</Text>
            <ChatArea />
        </VStack>
    );
};

export default Home;
