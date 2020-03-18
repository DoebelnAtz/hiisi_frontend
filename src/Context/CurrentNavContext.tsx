import React from 'react';
import { createCtx } from '../Types';

const [ctx, Provider] = createCtx<string>('resources');

export const CurrentNavContext = ctx;
export const CurrentNavContextProvider = Provider;
