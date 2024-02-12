import { VStack } from '@chakra-ui/react';
import { FC } from 'react';

import ChatArea from './ChatArea';

const Dashboard: FC = () => {
    return (
        <VStack w="full" h="full" py="2rem">
            <ChatArea />
        </VStack>
    );
};

export default Dashboard;
