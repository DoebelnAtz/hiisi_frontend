import { createCtx, MessageNotification } from '../Types';

const [ctx, Provider] = createCtx<MessageNotification[]>([]);

export const NotificationContext = ctx;
export const NotificationContextProvider = Provider;
