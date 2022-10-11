export interface Streamer {
	userID: string,
	displayName: string,
	picture: string | URL,
	score: number
}

export type StreamerWithRank = Streamer & { rank: number }

export type StreamerData = {
	streamers: Streamer[],
	topStreamer: StreamerWithRank[]
};
