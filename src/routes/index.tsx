import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PAGE_ROUTES } from '../common/types';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthPage from '../pages/AuthPage';
import LoginForm from '../pages/AuthPage/AuthForms/LoginForm';
import SignUpForm from '../pages/AuthPage/AuthForms/SignUpForm';
import Dashboard from '../pages/Dashboard';

export const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />}>
                <Route path="/" element={<LoginForm />} />
                <Route path="/sign-up" element={<SignUpForm />} />
            </Route>
            <Route path={PAGE_ROUTES.DASHBOARD_PAGE} element={<DashboardLayout />}>
                <Route path="/dashboard/bot-chat" element={<Dashboard />} />
                <Route path="/dashboard/human-chat" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};
