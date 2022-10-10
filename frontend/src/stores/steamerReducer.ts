import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Streamer {
	userID: string,
	displayName: string,
	picture: string | URL,
	score: number
}

export interface StreamerState {
	steamers: Streamer[];
	status: 'idle' | 'loading' | 'failed';
}

const initialState: StreamerState = {
	steamers: [],
	status: 'idle',
};

export const streamersSlice = createSlice({
	name: 'streamers',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		update: (state, action: PayloadAction<Streamer[]>) => {
			state.steamers = action.payload
		},
		clear: (state) => {
			state.steamers = initialState.steamers
		},
	},
});

export const { update, clear } = streamersSlice.actions;
export const selectStreamers = (state: RootState) => state.streamer;

export default streamersSlice.reducer;
