import React from 'react';
import { createCtx } from '../Types';

const [ctx, Provider] = createCtx('blog');

export const CurrentNavContext = ctx;
export const CurrentNavContextProvider = Provider;
