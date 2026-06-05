import { combineReducers } from 'redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import asideSlice from '../features/aside/aside-slice';
import toolsSlice from '../features/tools/tools-slice';

const rootReducer = combineReducers
({
    aside: asideSlice,
    tools: toolsSlice
});

export const store = configureStore
({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
