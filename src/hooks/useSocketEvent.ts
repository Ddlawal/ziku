import { useCallback, useContext, useEffect } from 'react';
import { EVENTS, ISocketContext } from '../common/types';
import { SocketContext } from '../providers/context.provider';

const useSocketEvent = (
    events: Array<{ name: EVENTS; cb: (data: any) => void }>
): ISocketContext => {
    const { socket } = useContext(SocketContext);

    const listenToEvents = useCallback(() => {
        if (events?.length) {
            events.forEach(({ name, cb }) => {
                socket.on(name, (data) => {
                    console.log('Received message from server:', data, name);
                    cb(data);
                });
            });
        }
    }, []);

    useEffect(listenToEvents, []);

    return { socket };
};

export default useSocketEvent;
