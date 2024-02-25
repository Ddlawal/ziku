import { createContext, FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../common/env';
import { ChatHandler, IAuth, ISocketContext, IStore, IStoreContext, IUser } from '../common/types';

const data = localStorage.getItem('currentUser');
const currentUser = data ? (JSON.parse(data) as IUser) : null;
const authData = localStorage.getItem('auth');
const auth = authData ? (JSON.parse(authData) as IAuth) : null;

export const initialState: IStore = {
    chatHandler: ChatHandler.BOT,
    currentUser,
    auth: {
        confirmationId: auth?.confirmationId || null,
        confirmationEmail: auth?.confirmationEmail || null,
    },
};

const socket = io(BASE_URL, {
    extraHeaders: { 'ngrok-skip-browser-warning': 'true' },
    withCredentials: true,
});

socket.on('connect', () => console.log('Con'));

export const StoreContext = createContext<IStoreContext | null>(null);
export const SocketContext = createContext<ISocketContext>({ socket });

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    const [store, setStore] = useState<IStore>(initialState);

    const updateStore = useCallback((payload: Partial<IStore>) => {
        setStore((prev) => ({ ...prev, ...payload }));
        const payloadArray = Object.entries(payload);

        payloadArray.forEach(([key, value]) => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    }, []);

    const contextValue = useMemo(
        () => ({
            store,
            updateStore,
        }),
        [store, updateStore]
    );

    const socketContextValue = useMemo(() => ({ socket: socket as Socket }), [socket]);

    return (
        <StoreContext.Provider value={contextValue}>
            <SocketContext.Provider value={socketContextValue}>{children}</SocketContext.Provider>
        </StoreContext.Provider>
    );
};

export default Context;
