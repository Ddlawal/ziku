import { useEffect } from 'react';
import io from 'socket.io-client';
import { EVENTS, IEventsData } from '../common/types';

export const useSocket = (cbs: IEventsData) => {
    useEffect(() => {
        const socket = io('http://localhost:9000');
        socket.on('connect', () => console.log('Con'));
        socket.on(EVENTS.AUTH, (data) => {
            console.log('auth', data);
            if (data.connected) {
                socket.emit(EVENTS.NEW_CONVERSATION, { senderId: 'Muhammad' });
            }
        });

        socket.on(EVENTS.WELCOME_USER, (data) => {
            console.log('Received message from server:', data);
            cbs[EVENTS.NEW_CONVERSATION]?.(data);
        });

        // Clean up the socket connection when component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);
};
