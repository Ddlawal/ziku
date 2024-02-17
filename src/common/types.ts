export enum EVENTS {
    AUTH = 'auth',
    NEW_CONVERSATION = 'new-conversation',
    NEW_MESSAGE = 'new-message',
    TYPING = 'typing',
    WELCOME_USER = 'welcome',
}

export enum PAGE_ROUTES {
    BOT_CHAT = '/dashboard/bot-chat',
    DASHBOARD_PAGE = '/dashboard',
    FORGOT_PASSWORD = '/forgot-password',
    HUMAN_CHAT = '/dashboard/human-chat',
    SETTINGS_PAGE = '/dashboard/settings',
    SIGN_UP = '/sign-up',
}

export interface IResponse<D = any> {
    data?: D;
    status?: number;
    message?: string;
}

export type IEvents = keyof typeof EVENTS;
export type IEventsData = Partial<Record<EVENTS, (data: any) => void>>;

export interface IMessage {
    body: string;
    timestamp: Date;
    senderId: string;
}

export enum ChatHandler {
    HUMAN = 'human',
    BOT = 'bot',
}

export interface IUser {
    email: string;
    firstName: string;
    fullName: string;
    id: string;
    lastName: string;
}

export interface IStore {
    chatHandler: ChatHandler;
    currentUser: IUser | null;
}

export interface IStoreContext {
    store: IStore;
    updateStore: (payload: Partial<IStore>) => void;
}

export interface IDelete {
    url: string;
}

export interface IPost<T = Record<string, unknown>> extends IDelete {
    body?: T;
}

export type IPatch<T = Record<string, unknown>> = IPost<T>;

export type IPut<T = Record<string, unknown>> = IPost<T>;

export interface IGet<T = Record<string, unknown>> extends IDelete {
    query?: T;
}
