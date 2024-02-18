import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { BASE_URL } from '../common/env';
import { EVENTS, IEventsData } from '../common/types';
import useStore from './useStore';

export const useSocket = (cbs: IEventsData) => {
    const { store } = useStore();
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const socketInstance = io(BASE_URL);
        setSocket(socketInstance);
        socketInstance.on('connect', () => console.log('Con'));
        socketInstance.on(EVENTS.AUTH, (data) => {
            console.log('auth', data);
            if (data.connected) {
                socketInstance.emit(EVENTS.NEW_MESSAGE, { senderId: store.currentUser?.id });
            }
        });

        socketInstance.on(EVENTS.WELCOME_USER, (data) => {
            console.log('Received message from server:', data);
            cbs[EVENTS.NEW_MESSAGE]?.(data);
        });

        // Clean up the socketInstance connection when component unmounts
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return { socket };
};
