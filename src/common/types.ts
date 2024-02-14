export enum EVENTS {
    AUTH = 'auth',
    NEW_CONVERSATION = 'new-conversation',
    NEW_MESSAGE = 'new-message',
    TYPING = 'typing',
    WELCOME_USER = 'welcome',
}

export enum PAGE_ROUTES {
    BOT_CHAT = 'bot-chat',
    DASHBOARD_PAGE = '/dashboard',
    FORGOT_PASSWORD = '/forgot-password',
    HUMAN_CHAT = 'human-chat',
    SETTINGS_PAGE = '/dashboard/settings',
    SIGN_UP = '/sign-up',
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
