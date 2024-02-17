import { createContext, FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { ChatHandler, IStore, IStoreContext, IUser } from '../common/types';

const data = localStorage.getItem('currentUser');
const currentUser = data ? (JSON.parse(data) as IUser) : null;

export const initialState: IStore = {
    chatHandler: ChatHandler.BOT,
    currentUser,
};

export const StoreContext = createContext<IStoreContext | null>(null);

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

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export default Context;
