import React, { useState, Fragment } from 'react';
import { MessageType, RoomType } from '../../Types';
import {
	LoadMoreButton,
	Message,
	MessageContent,
	MessageDate,
	MessageImg,
	MessageInfo,
} from './Styles';
import { calculateTimeSince, getLocal } from '../../../../utils/utils';
import { RowDiv } from '../../../../Styles/LayoutStyles';
import { useRequest } from '../../../../Hooks';

type MessageFeedProps = {
	messages: MessageType[];
	page: number;
	tid: number;
};

const MessageFeed: React.FC<MessageFeedProps> = ({ messages, page, tid }) => {
	const [showNext, setShowNext] = useState(false);
	const [nextRoom, setNextRoom, isLoading] = useRequest<RoomType>(
		`messages/threads/ ${tid.toString()}?page=${page}`,
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
							<span className={'message_text'}>
								{message.message}
							</span>
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