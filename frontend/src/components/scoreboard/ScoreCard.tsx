import React from 'react';
import styled from 'styled-components';
import { StreamerWithRank } from '../../stores/streamerReducer/streamer';
import Score from './Score';

const Card = styled.div({
	transition: 'all 0.5s ease 0s',
	position: 'absolute',
	top: '100px',
	left: '100px',
	alignItems: 'center',
	display: 'flex',
	fontSize: '1rem',
	lineHeight: 1.6
});

const Rank = styled.div({
	marginRight: '5px',
	minWidth: '30px',
	textAlign: 'center'
})

const UserName = styled.div({
	fontWeight: 'bold',
	fontSize: '1.3rem',
	minWidth: '220px',
	textAlign: 'left'
});

const UserPhoto = styled.div({
	'> img': {
		borderRadius: "50%",
		height: '50px',
		width: '50px',
	},
	height: '60px',
	width: '60px',
	marginRight: '10px',
})

export interface ScoreCardData {
	user: StreamerWithRank,
	key: string,
	total: number,
	rank: number
}

export const ScoreCard = (props: ScoreCardData) => {
	const { user, rank, total } = props;
	return (
		<Card style={{ zIndex: (total - rank), transform: `translate(0, ${((rank - 1) * 60)}px)` }}>
			<Rank>{rank}</Rank>
			<UserPhoto>
				<img src={`${user.picture}`} alt={`${user.displayName}'s Profile Pic`}/>
			</UserPhoto>
			<UserName>{user.displayName}</UserName>
			<Score points={user.score} />
		</Card>
	)
}

export default ScoreCard