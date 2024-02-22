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
                const handler = (data: any) => cb(data);
                socket.on(name, handler);

                return () => {
                    socket.off(name, handler);
                };
            });
        }
    }, []);

    useEffect(listenToEvents, []);

    return { socket };
};

export default useSocketEvent;
