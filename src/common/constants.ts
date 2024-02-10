export enum EVENTS {
    AUTH = 'auth',
    NEW_CONVERSATION = 'new-conversation',
    NEW_MESSAGE = 'new-message',
    TYPING = 'typing',
    WELCOME_USER = 'welcome',
}

export type IEvents = keyof typeof EVENTS;
export type IEventsData = Partial<Record<EVENTS, (data: any) => void>>;
