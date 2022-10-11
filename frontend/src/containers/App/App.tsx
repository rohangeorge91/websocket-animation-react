import React, {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ScoreBoard } from '../../components/scoreboard/ScoreBoard';
import { selectStreamers, update } from '../../stores/streamerReducer/steamerReducer';
import { DispatchInterface } from '../../stores/store';
import makeSocket, { SocketInterface } from '../../utils/socket';
import { makeWorker, WorkerInterface } from '../../utils/webworker';
import { Streamer, StreamerData, StreamerWithRank } from '../../stores/streamerReducer/streamer';

import './App.css';

const { LIVE_UPDATE_URL, BROADCAST_CHANNEL } = require('../../utils/constant');

let worker: WorkerInterface | null;
let socket: SocketInterface | null;

const processStreamersData = (data: string) => {
  const newData: Streamer[] = JSON.parse(data).data;
  newData.sort((a: Streamer, b: Streamer) => (-1 * (a.score - b.score)));

  const pickTopTen = newData.slice(0, 10).map((streamer, index) => ({ ...streamer, rank: index + 1}))
  pickTopTen.sort((a: StreamerWithRank, b: StreamerWithRank) => (a.userID.localeCompare(b.userID)));
  return {
    streamers: newData,
    topStreamer: pickTopTen
  };
};

const dispatchStreamerUpdate = (dispatch: DispatchInterface) => 
  (data: StreamerData) => dispatch(update(data));

const initializeWebWorkWithSocket = (dispatch: DispatchInterface) => {
  if (!worker) {
    worker = makeWorker('sockets.ts', BROADCAST_CHANNEL, processStreamersData, dispatchStreamerUpdate(dispatch));
    socket = makeSocket(LIVE_UPDATE_URL, BROADCAST_CHANNEL)
    socket.attach(window.self);
    console.info('initialized webworker');
  }

  return () => {
    worker?.cleanUp();
    worker = null;
    socket?.cleanup();
    socket = null;
    console.info('clean done');
  }
}

const App = () => {
  const streamState = useAppSelector(selectStreamers);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => initializeWebWorkWithSocket(dispatch), []);

  return (
    <div>
      <ScoreBoard users={streamState.topSteamers}/>
    </div>
  );
}

export default App;