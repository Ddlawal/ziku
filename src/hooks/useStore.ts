import { useContext } from 'react';
import { IStoreContext } from '../common/types';
import { initialState, StoreContext } from '../context';

const useStore = (): IStoreContext => {
    const contextValue = useContext(StoreContext);

    if (!contextValue) {
        return { store: initialState, updateStore: () => null };
    }

    return contextValue;
};

export default useStore;
