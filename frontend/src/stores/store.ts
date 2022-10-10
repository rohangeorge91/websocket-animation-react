import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction, Dispatch } from '@reduxjs/toolkit';
import streamerReducer, { StreamerState } from './steamerReducer';

export const store = configureStore({
  reducer: {
    streamer: streamerReducer
  },
});

export type DispatchInterface = ThunkDispatch<{ streamer: StreamerState; }, undefined, AnyAction> & Dispatch<AnyAction>

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
