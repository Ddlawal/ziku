import { Spinner } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '../common/types';
import useStore from '../hooks/useStore';

interface IAuthGuard {
    children: ReactNode;
}

const AuthGuard: FC<IAuthGuard> = ({ children }) => {
    const [authenticating, setAuthenticating] = useState(true);

    const { store } = useStore();
    const { pathname } = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        if (pathname.includes('dashboard')) {
            if (!store.currentUser) {
                setTimeout(() => navigate('/', { replace: true }), 1000);
            }
        } else if (store.currentUser) {
            setTimeout(() => navigate(PAGE_ROUTES.BOT_CHAT, { replace: true }), 1000);
        }

        setTimeout(() => setTimeout(() => setAuthenticating(false), 1000), 100);
    }, [store.currentUser]);

    if (authenticating) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default AuthGuard;
