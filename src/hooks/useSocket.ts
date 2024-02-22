import { useContext, useEffect, useState } from 'react';
import { IUseSocket } from '../common/types';
import { SocketContext } from '../providers/context.provider';

const useSocket = (): IUseSocket => {
    const { socket } = useContext(SocketContext);

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    return { isConnected, socket };
};

export default useSocket;
