import React from 'react';
import { createCtx } from '../Types';

const [ctx, Provider] = createCtx<number>(0);

export const ChatContext = ctx;
export const ChatContextProvider = Provider;