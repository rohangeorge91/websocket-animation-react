import React, {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ScoreBoard } from '../../components/scoreboard/ScoreBoard';
import { selectStreamers, Streamer, update } from '../../stores/steamerReducer';
import { DispatchInterface } from '../../stores/store';
import makeSocket, { SocketInterface } from '../../utils/socket';
import { makeWorker, WorkerInterface } from '../../utils/webworker';
import './App.css';

const { LIVE_UPDATE_URL, BROADCAST_CHANNEL } = require('../../utils/constant');

let worker: WorkerInterface | null;
let socket: SocketInterface | null;

const sortStreams = (data: string) => {
  const newData: Streamer[] = JSON.parse(data).data;
  newData.sort((a: Streamer, b: Streamer) => (-1 * (a.score - b.score)))
  return newData;
};

const dispatchStreamerUpdate = 
  (dispatch: DispatchInterface) => 
  (data: Streamer[]) => dispatch(update(data));

const initializeWebWorkWithSocket = (dispatch: DispatchInterface) => {
  if (!worker) {
    worker = makeWorker('sockets.ts', BROADCAST_CHANNEL, sortStreams, dispatchStreamerUpdate(dispatch));
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
      <ScoreBoard users={streamState.steamers} />
    </div>
  );
}

export default App;