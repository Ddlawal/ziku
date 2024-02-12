import { Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import ChatArea from './ChatArea';

const Dashboard: FC = () => {
    return (
        <VStack w="full" h="50vh" py="5rem">
            <Text>ZIKU</Text>
            <ChatArea />
        </VStack>
    );
};

export default Dashboard;
