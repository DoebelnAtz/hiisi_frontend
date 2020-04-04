import React, { useContext, useState } from 'react';
import {
	AddUserDiv,
	GoBackButton,
	NavigationDiv,
	UserSearchInput,
	ChatRoomUsers,
	UserResult,
	UserResultProfilePic,
	UserResultUsername,
} from './Styles';
import { ChatContext } from '../../../Context/ChatContext';
import { useRequest, useWidth } from '../../../Hooks';
import { User } from '../../../Types';
import { ConnectedUser } from '../MessageRoom/Styles';
import { makeRequest } from '../../../Api';

const AddUserToRoom: React.FC = () => {
	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);
	const [connectedUsers, setConnectedUsers] = useRequest<
		User[]
	>(`messages/threads/${-currentChat.toString()}/users`, `GET`);
	const [searchUserInputVal, setSearchUserInputVal] = useState('');
	const [userResults, setUserResults] = useRequest<User[]>(
		`users/search?q=${searchUserInputVal}`,
		'GET',
		{},
		!!searchUserInputVal.length,
	);
	const [, isMobile] = useWidth();

	const renderConnectedUsers = () => {
		if (connectedUsers)
			return connectedUsers.map((user: User) => {
				return (
					<ConnectedUser isMobile={isMobile} key={user.u_id}>
						<img src={user.profile_pic} />
					</ConnectedUser>
				);
			});
	};

	const handleInputChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setSearchUserInputVal(target.value);
	};

	const handleInputEnter = async (e: React.KeyboardEvent) => {
		if (userResults && e.key === 'Enter') {
			handleResultClick(userResults[0].u_id);
		}
	};

	const handleResultClick = async (userId: number) => {
		let resp = await makeRequest(`messages/threads/add_user`, 'POST', {
			targetId: userId,
			threadId: -currentChat,
		});
		if (resp.data && connectedUsers) {
			setSearchUserInputVal('');
			setUserResults([]);
			setConnectedUsers([...connectedUsers, resp.data]);
		}
	};

	const renderUserResults = () => {
		if (userResults && connectedUsers) {
			return userResults
				.filter((u) => {
					return !connectedUsers.find((usr) => u.u_id === usr.u_id);
				})
				.map((user, index) => {
					return (
						<UserResult
							key={index}
							onClick={() => handleResultClick(user.u_id)}
						>
							<UserResultProfilePic src={user.profile_pic} />
							<UserResultUsername>
								{user.username}
							</UserResultUsername>
						</UserResult>
					);
				});
		}
	};

	return (
		<AddUserDiv>
			<NavigationDiv>
				<GoBackButton onClick={() => setCurrentChat(-currentChat)}>
					Back
				</GoBackButton>
			</NavigationDiv>
			<ChatRoomUsers>{renderConnectedUsers()}</ChatRoomUsers>
			<UserSearchInput
				value={searchUserInputVal}
				onChange={(e: React.SyntheticEvent) => handleInputChange(e)}
				onKeyDown={(e: React.KeyboardEvent) => handleInputEnter(e)}
				placholder={'add user'}
			/>
			{renderUserResults()}
		</AddUserDiv>
	);
};

export default AddUserToRoom;
