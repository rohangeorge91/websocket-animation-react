import React from 'react';
import styled from 'styled-components';
import ScoreCard from './ScoreCard';
import './ScoreBoard.css';
import { StreamerWithRank } from '../../stores/streamerReducer/streamer';

const AnimationWrapper = styled.div({
	transition: 'all 0.3s ease 0s'
});

// TODO: figure out a way to make this dynamic <- maybe render a virtual react element and then read height check 
// measureElement.ts
const cardHeight = 60;
const total = 10;
const CenterWrapper = styled.div({
	display: 'flex',
	flexDirection: 'row',
	height: `${cardHeight * total}px`,
	width: '100%',
	justifyContent: 'space-around'
});

export const makeScoreCards = (users: StreamerWithRank[], max: number) => users
	.map((user: StreamerWithRank, key: number) => <ScoreCard user={user} key={user.userID} rank={user.rank} total={max} />);

const noUserMessage = () => (
	<div>
		No User
	</div>
)

export const ScoreBoard = (props: { users: StreamerWithRank[] }) => {
	const { users} = props;
	const userInfo = !users ? noUserMessage() : makeScoreCards(users, total);
	return (
		<CenterWrapper>
			<AnimationWrapper>
					{userInfo}
			</AnimationWrapper>	
		</CenterWrapper>
	);
}

export default ScoreBoard;