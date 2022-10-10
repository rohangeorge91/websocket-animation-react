import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Streamer } from '../../stores/steamerReducer';
import { useSmoothCount } from '../../utils/useSmoothCount';

const Card = styled.div({
	transition: 'all 0.5s ease 0s',
	backgroundColor: 'white',
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

const Points = styled.div({
	'&::after': {
		content: '"pt"',
		marginLeft: '5px',
	},
	minWidth: '120px',
	textAlign: 'right'
});

export interface ScoreCardData {
	user: Streamer,
	key: string,
	total: number,
	rank: number
}

export const ScoreCard = (props: ScoreCardData) => {
	const { user, rank, total } = props;
	const ref = useRef(null);
	const finalScore = useSmoothCount({
		ref: ref,
		target: user.score,
		duration: 3,
		curve: [0, 0.99, 0.01, 1]
	});

	return (
		<Card style={{ zIndex: (total - rank), transform: `translate(0, ${((rank - 1) * 60)}px)` }}>
			<Rank>{rank}</Rank>
			<UserPhoto>
				<img src={`${user.picture}`} alt={`${user.displayName}'s Profile Pic`}/>
			</UserPhoto>
			<UserName>{user.displayName}</UserName>
			<Points ref={ref}>{finalScore.current}</Points>
		</Card>
	)
}

export default ScoreCard