import { createCtx, Notification } from '../Types';

const [ctx, Provider] = createCtx<Notification[]>([]);

export const NotificationContext = ctx;
export const NotificationContextProvider = Provider;
