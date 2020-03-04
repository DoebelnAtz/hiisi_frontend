import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import {
	TaskDescription,
	TaskInfoHead,
	PriorityDropdown,
	TaskCollaborators,
	TaskFooter,
	TaskInfoBody,
	Collaborator,
	TaskSidebar,
	AddUserToTask,
	AddUserInput,
	AddUser,
	AddUserBtn,
	TaskTitleEditable,
	PriorityIcon,
	TaskStatusInput,
	TaskColorTag,
	TaskColorPicker,
	TaskColorRow,
	TaskSetting,
	PrioritySetting,
} from './Styles';

import Plus from '../../../../../../Assets/Dots.png';
import { useDismiss, useRequest } from '../../../../../../Hooks';
import TextEditor from '../../../../TextEditor/index';
import { makeRequest } from '../../../../../../Api';
import Avatar from '../../../../Avatar/index';
import { getPriorityIcon } from '../../../../../../Utils/taskUtils';
import { RouteComponentProps, User } from '../../../../../../Types';
import ColorPicker from '../../../../ColorPicker';
import { TaskType } from '../../../Types';
import DropDown from '../../../../DropDown';
import { checkUserList } from '../../../../../../Utils';
import SaveButton from '../../../../Buttons/SaveButton';
import Modal from '../../../../Modal';
import { RowDiv } from '../../../../../../Styles/LayoutStyles';
const BoardColumnTaskInfo: React.FC<RouteComponentProps<{
	tid: number;
	pid: number;
}>> = ({ match, history }) => {
	const getPriorityText = (priorityNum: number) => {
		switch (priorityNum) {
			case 0:
				return 'very low';
			case 1:
				return 'low';
			case 2:
				return 'medium';
			case 3:
				return 'high';
			default:
				return 'very high';
		}
	};

	const getPriorityNumber = (priorityText: string) => {
		switch (priorityText) {
			case 'very low':
				return 0;
			case 'low':
				return 1;
			case 'medium':
				return 2;
			case 'high':
				return 3;
			default:
				return 4;
		}
	};

	const inside = useRef<HTMLDivElement>(null);

	const [task, setTask, isLoading] = useRequest<TaskType | null>(
		'projects/boards/tasks/' + match.params.tid,
		'get',
	);
	const [searchResult, setSearchResult] = useState([]);
	const [searchInput, setSearchInput] = useState<string>('');
	const [maxDisplayedUsers, setMaxDisplayedUsers] = useState<number>(3);
	const [priorityIcon, setPriorityIcon] = useState(getPriorityIcon(0));
	const [priority, setPriority] = useState(getPriorityText(0));
	const [expandColorPicker, setExpandColorPicker] = useState(false);
	const colorPickerDiv = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (task) {
			setPriorityIcon(getPriorityIcon(task.priority));
			setPriority(getPriorityText(task.priority));
		}
	}, [isLoading]);

	const close = () => {
		history.push(`/projects/${match.params.pid}`);
	};

	useDismiss(inside, close);
	useDismiss(colorPickerDiv, () => setExpandColorPicker(false));
	const updateTask = async () => {
		if (task) {
			console.log(task);
			if (!task.description) {
				setTask({ ...task, description: '' });
			}
			let resp = await makeRequest(
				'projects/boards/update_task',
				'put',
				task,
			);
			if (resp.data) return true;
		}
		return false;
	};

	const assignUserToTask = async (userId: number, taskId: number) => {
		let resp = await makeRequest('projects/boards/tasks/add_user', 'post', {
			userId,
			taskId,
		});
		if (task && resp?.data) {
			let updatedCollaborators: TaskType['collaborators'] = // We can access the type of collaborators
				resp.data.collaborators;
			let updatedTask: TaskType = {
				...task,
				collaborators: updatedCollaborators,
			};
			setTask(updatedTask);
			setSearchInput('');
			setSearchResult([]);
		}
	};

	const handlePrioritySelect = (e: string) => {
		if (task) {
			setPriority(e);
			setPriorityIcon(getPriorityIcon(getPriorityNumber(e)));
			setTask({ ...task, priority: getPriorityNumber(e) });
		}
	};

	const handleSearch = async (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setSearchInput(target.value);

		setSearchResult([]);
		if (target.value.length > 0) {
			let resp = await makeRequest(
				`users/search?q=${target.value}`,
				'get',
			);

			if (task && resp?.data) {
				setSearchResult(
					resp.data.filter((user: User) => {
						for (var i = 0; i < task.collaborators.length; i++) {
							if (task.collaborators[i].u_id === user.u_id)
								return false;
						}
						return true;
					}),
				);
			}
		}
	};

	const updateTaskStatus = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		task && setTask({ ...task, status: target.value });
	};

	const renderSearchResults = () => {
		return searchResult.map((user: User) => {
			return (
				<AddUser
					onClick={() =>
						task && assignUserToTask(user.u_id, task.task_id)
					}
					key={user.u_id}
				>
					<img src={user.profile_pic} alt={user.username}/>
					<span>{user.username}</span>
				</AddUser>
			);
		});
	};

	const renderTaskCollaborators = () => {
		if (task)
			return task.collaborators.map(
				(collaborator: User, index: number) => {
					if (
						index === maxDisplayedUsers &&
						task.collaborators.length > maxDisplayedUsers + 1
					) {
						return (
							<Collaborator
								key={collaborator.u_id}
								src={Plus}
								style={{ cursor: 'pointer' }}
								onClick={() =>
									setMaxDisplayedUsers(maxDisplayedUsers + 1)
								}
							/>
						);
					} else if (index > maxDisplayedUsers) {
						return <div key={collaborator.u_id} />;
					} else {
						return (
							<Collaborator
								key={collaborator.u_id}
								src={collaborator.profile_pic}
								alt={`${collaborator.username} profiled pic`}
								onClick={() =>
									history.push(`/user/${collaborator.u_id}`)
								}
							/>
						);
					}
				},
			);
	};

	const handleDescriptionChange = (descVal: string) => {
		task && setTask({ ...task, description: descVal });
	};

	const handleTitleChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		if (target.value.length <= 200) {
			// max title length in DB = 200
			task && setTask({ ...task, title: target.value });
		}
	};

	const handleTagColorChange = (color: string) => {
		task && setTask({ ...task, color_tag: color });
		console.log(color);
	};

	return ReactDOM.createPortal(
		<Modal inside={inside}>
			<TaskInfoHead>
				<TaskTitleEditable
					disabled={!task?.owner}
					onChange={(e: React.SyntheticEvent) => handleTitleChange(e)}
					value={task?.title || ''}
					// on undefined task keep title as '' to not invoke react error
				/>
				{task?.owner && (
					<SaveButton onClick={updateTask}>Save</SaveButton>
				)}
			</TaskInfoHead>
			{task?.owner && (
				<TaskColorRow>
					<TaskColorTag
						onClick={() => setExpandColorPicker(!expandColorPicker)}
						tagColor={task?.color_tag}
					/>
					<TaskColorPicker ref={colorPickerDiv}>
						{expandColorPicker && (
							<ColorPicker
								onChange={handleTagColorChange}
								colors={[
									'#c76177',
									'#f7ae79',
									'#d6b376',
									'#dbcb6e',
									'#a8c47e',
									'#8aba86',
									'#81d4ac',
									'#6fb4c9',
									'#729de0',
									'#9b88cf',
									'#cf97c8',
									'#fa89b8',
								]}
							/>
						)}
					</TaskColorPicker>
				</TaskColorRow>
			)}

			<TaskInfoBody>
				<TaskDescription>
					{!isLoading && (
						<TextEditor
							editable={task?.owner}
							state={task?.description ?? ''}
							setState={(e: string) => handleDescriptionChange(e)}
						/>
					)}
				</TaskDescription>
				<TaskSidebar>
					<TaskSetting>
						{task?.owner && (
							<TaskStatusInput>
								Status:{' '}
								<input
									value={task?.status || ''}
									onChange={(e: React.SyntheticEvent) =>
										updateTaskStatus(e)
									}
									placeholder={task?.status}
								/>
							</TaskStatusInput>
						)}
					</TaskSetting>
					<TaskSetting>
						<PrioritySetting>
							<PriorityIcon
								src={priorityIcon}
								alt={`priority ${task?.priority}`}
							/>
							{task && checkUserList(task.collaborators) && (
								<PriorityDropdown>
									<DropDown
										height={'34px'}
										optionList={[
											'very low',
											'low',
											'medium',
											'high',
											'very high',
										]}
										text={'Priority: '}
										state={priority}
										setSelect={handlePrioritySelect}
										width={'170px'}
										modalOverflow={true}
									/>
								</PriorityDropdown>
							)}
						</PrioritySetting>
					</TaskSetting>
					<TaskCollaborators>
						{!isLoading && renderTaskCollaborators()}
					</TaskCollaborators>
					{task && checkUserList(task.collaborators) && (
						<AddUserToTask>
							<AddUserInput
								style={{ width: '100%' }}
								value={searchInput}
								onChange={(e: React.SyntheticEvent) =>
									handleSearch(e)
								}
								placeholder={'add user'}
							/>
						</AddUserToTask>
					)}
					{!!searchResult.length && renderSearchResults()}

				</TaskSidebar>
			</TaskInfoBody>
			<TaskFooter>



			</TaskFooter>
		</Modal>,
		document.querySelector('#modal') as Element,
	);
};

export default BoardColumnTaskInfo;
