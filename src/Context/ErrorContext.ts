import React from 'react';
import { createCtx } from '../Types';

const [ctx, Provider] = createCtx('blog');

export const ErrorContext = ctx;
export const ErrorContextProvider = Provider;
