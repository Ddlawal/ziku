import { useContext } from 'react';
import { ISocketContext } from '../common/types';
import { SocketContext } from '../providers/context.provider';

const useSocket = (): ISocketContext => {
    const contextValue = useContext(SocketContext);

    return contextValue;
};

export default useSocket;
