import React from 'react';
import {
	ServerDownContainer,
	ServerDownCard,
	ErrorMessage,
	ErrorStatus,
	RetryButton,
} from './Styles';
import { RowDiv } from '../../../Styles/LayoutStyles';
import { useHistory } from 'react-router';

const ServerDown: React.FC = () => {
	const history = useHistory();
	return (
		<ServerDownContainer>
			<ServerDownCard>
				<ErrorStatus>
					<span>505</span>
				</ErrorStatus>
				<ErrorMessage>
					<span>Server seems to be down... </span>
				</ErrorMessage>
				<ErrorMessage>
					<span>Please contact the admin of this site</span>
				</ErrorMessage>
				<RowDiv>
					<RetryButton onClick={() => history.push('/forum')}>
						Try Again
					</RetryButton>
				</RowDiv>
			</ServerDownCard>
		</ServerDownContainer>
	);
};

export default ServerDown;
