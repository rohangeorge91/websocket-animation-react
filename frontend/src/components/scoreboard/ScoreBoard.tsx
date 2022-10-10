import React from 'react';
import styled from 'styled-components';
import { Streamer } from '../../stores/steamerReducer';
import ScoreCard from './ScoreCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ScoreBoard.css';

const AnimationWrapper = styled.div({
	transition: 'all 0.3s ease 0s'
});

const CenterWrapper = styled.div({
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	justifyContent: 'space-around'
})

export const makeScoreCards = (users: Streamer[]) => {
	let total = (users?.length ? users.length : 0) + 2;
	return users.map((user: Streamer, key: number) => {
		return (
			<CSSTransition key={user.userID} timeout={300} className="tile-animation">
				<ScoreCard user={user} key={user.userID} rank={(key + 1)} total={total} />
			</CSSTransition>
		);
	});
}

const noUserMessage = () => (
	<div>
		No User
	</div>
)

export const ScoreBoard = (props: { users: Streamer[] }) => {
	const { users } = props;
	const userInfo = !users ? noUserMessage() : makeScoreCards(users);
	return (
		<CenterWrapper>
			<AnimationWrapper>
				<TransitionGroup component={"div"}>
					{userInfo}
				</TransitionGroup>
			</AnimationWrapper>	
		</CenterWrapper>
	);
}

export default ScoreBoard;