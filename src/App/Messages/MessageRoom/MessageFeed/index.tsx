import React, { useState, Fragment } from 'react';
import Linkify from 'react-linkify';

import { MessageType, RoomType } from '../../Types';
import {
	LoadMoreButton,
	Message,
	MessageContent,
	MessageDate,
	MessageImg,
	MessageInfo,
} from './Styles';
import { calculateTimeSince, getLocal } from '../../../../Utils/';
import { RowDiv } from '../../../../Styles/LayoutStyles';
import { useRequest } from '../../../../Hooks';

type MessageFeedProps = {
	messages: MessageType[];
	page: number;
	tid: number;
};

const MessageFeed: React.FC<MessageFeedProps> = ({ messages, page, tid }) => {
	const [showNext, setShowNext] = useState(false);
	const [nextRoom, , ] = useRequest<RoomType>(
		`messages/threads/${tid.toString()}?page=${page}`,
		'GET',
		{},
		messages.length >= 20,
	);

	const renderMessages = () => {
		if (messages && messages?.length) {
			return messages.map((message) => {
				return (
					<Message
						key={message.m_id}
						sender={
							message.username ===
							getLocal('currentUser').username
						}
					>
						<MessageInfo>
							<MessageImg
								src={
									'https://cdn.intra.42.fr/users/small_' +
									message.username +
									(message.username === 'marvin'
										? '.png'
										: '.jpg')
								}
							/>
							<MessageDate>
								{calculateTimeSince(message.time_sent)}
							</MessageDate>
						</MessageInfo>
						<MessageContent>
							<Linkify>
								<span>{message.message}</span>
							</Linkify>
						</MessageContent>
					</Message>
				);
			});
		}
	};

	return (
		<Fragment>
			{!showNext && messages.length >= 20 && (
				<RowDiv>
					<LoadMoreButton onClick={() => setShowNext(true)}>
						Load More
					</LoadMoreButton>
				</RowDiv>
			)}
			{showNext && nextRoom && (
				<MessageFeed
					messages={nextRoom?.messages}
					page={page + 1}
					tid={tid}
				/>
			)}
			{renderMessages()}
		</Fragment>
	);
};

export default MessageFeed;
