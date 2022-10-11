import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Streamer, StreamerData, StreamerWithRank } from './streamer';


export interface StreamerState {
	topSteamers: StreamerWithRank[];
	streamers: Streamer[],
	status: 'idle' | 'loading' | 'failed';
}

const initialState: StreamerState = {
	topSteamers: [],
	streamers: [],
	status: 'idle',
};

export const streamersSlice = createSlice({
	name: 'streamers',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		update: (state, action: PayloadAction<StreamerData>, ) => {
			const { topStreamer, streamers } = action.payload;
			state.topSteamers = topStreamer;
			state.streamers = streamers;
		},
		clear: (state) => {
			state.topSteamers = initialState.topSteamers
		},
	},
});

export const { update, clear } = streamersSlice.actions;
export const selectStreamers = (state: RootState) => state.streamer;

export default streamersSlice.reducer;
