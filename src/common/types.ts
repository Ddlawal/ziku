export interface IMessage {
    body: string;
    timestamp: Date;
    senderId: string;
}

export enum PAGE_ROUTES {
    DASHBOARD_PAGE = '/dashboard',
    FORGOT_PASSWORD = '/forgot-password',
    SETTINGS_PAGE = '/dashboard/settings',
    SIGN_UP = '/sign-up',
}
