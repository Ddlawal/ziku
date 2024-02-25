import { Socket } from 'socket.io-client';

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
    SEND_EMAIL_CONFIRMATION = '/send-email-confirmation',
    SETTINGS_PAGE = '/dashboard/settings',
    SIGN_UP = '/sign-up',
    VALIDATE_EMAIL_CONFIRMATION = '/validate-email-confirmation',
}

export interface IResponse<D = any> {
    data?: D;
    status?: number;
    message?: string;
}

export type IEvents = keyof typeof EVENTS;
export type IEventsData = Partial<Record<EVENTS, (data: any) => void>>;

export interface IMessageData {
    body: string;
    senderId: string;
}

export interface IMessage extends IMessageData {
    conversationId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILoginRequest {
    email: string;
    password: string;
}
export interface ISignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ISendEmailConfirmation {
    email: string;
}

export interface IValidateEmailConfirmation {
    code: string;
    id: string;
}

export interface IEmailConfirmation {
    id: string;
    confirmed: boolean;
    count: number;
    email: string;
    expiresAt: Date;
    retryAt: Date;
}

export enum ChatHandler {
    HUMAN = 'human',
    BOT = 'bot',
}

export interface IConversation {
    id: string;
    userId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IUser {
    email: string;
    firstName: string;
    fullName: string;
    id: string;
    lastName: string;
    recentConversation?: IConversation;
}

export interface IAuth {
    confirmationEmail: string | null;
    confirmationId: string | null;
}

export interface IStore {
    chatHandler: ChatHandler;
    currentUser: IUser | null;
    auth: IAuth;
}

export interface IStoreContext {
    store: IStore;
    updateStore: (payload: Partial<IStore>) => void;
}

export interface ISocketContext {
    socket: Socket;
}

export interface IUseSocket extends ISocketContext {
    isConnected: boolean;
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
