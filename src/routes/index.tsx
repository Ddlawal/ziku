import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PAGE_ROUTES } from '../common/types';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthPage from '../pages/AuthPage';
import LoginForm from '../pages/AuthPage/AuthForms/LoginForm';
import SignUpForm from '../pages/AuthPage/AuthForms/SignUpForm';
import Dashboard from '../pages/Dashboard';
import AuthGuard from './AuthGuard';

export const Router: FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthGuard>
                        <AuthPage />
                    </AuthGuard>
                }
            >
                <Route path="/" element={<LoginForm />} />
                <Route path={PAGE_ROUTES.SIGN_UP} element={<SignUpForm />} />
            </Route>
            <Route
                path={PAGE_ROUTES.DASHBOARD_PAGE}
                element={
                    <AuthGuard>
                        <DashboardLayout />
                    </AuthGuard>
                }
            >
                <Route path={PAGE_ROUTES.BOT_CHAT} element={<Dashboard />} />
                <Route path={PAGE_ROUTES.HUMAN_CHAT} element={<Dashboard />} />
            </Route>
        </Routes>
    );
};
