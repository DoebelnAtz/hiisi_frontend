import React from 'react';
import { createCtx } from '../Types';

const [ctx, Provider] = createCtx('');

export const ErrorContext = ctx;
export const ErrorContextProvider = Provider;
