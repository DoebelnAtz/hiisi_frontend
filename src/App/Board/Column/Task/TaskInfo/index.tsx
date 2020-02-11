import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import ReactDOM from 'react-dom';

import {
	OuterDiv,
	TaskDescription,
	TaskInfo,
	TaskTitle,
	TaskInfoHead,
	PriorityInput,
	TaskCollaborators,
	TaskFooter,
	TaskInfoBody,
	Collaborator,
	TaskSidebar,
	AddUserToTask,
	AddUserInput,
	AddUser,
	AddUserBtn,
} from './Styles';

import Plus from '../../../../../Assets/Dots.png';
import { useDismiss, useRequest } from '../../../../../Hooks';
import TextEditor from '../../../../Components/TextEditor';
import Button from '../../../../Components/Buttons/Button';
import { makeRequest } from '../../../../Api/Api';
import Avatar from '../../../../Components/Avatar';
import { getPriorityIcon } from '../../../../../utils/taskUtils';
import { RouteComponentProps, User } from '../../../../../Types';
import { TaskType } from '../../../Types';

import { BrowserRouterProps, NavLinkProps } from 'react-router-dom';

const BoardColumnTaskInfo: React.FC<RouteComponentProps<{ tid: number }>> = ({
	match,
	history,
}) => {
	const inside = useRef<HTMLDivElement>(null);

	const [task, setTask, isLoading] = useRequest<TaskType | null>(
		'projects/boards/tasks/' + match.params.tid,
		'get',
	);
	const [priorityInputVal, setPriorityInputVal] = useState<string>('');
	const [searchResult, setSearchResult] = useState([]);
	const [searchInput, setSearchInput] = useState<string>('');
	const [description, setDescription] = useState<string | undefined>(
		task?.description,
	);
	const [maxDisplayedUsers, setMaxDisplayedUsers] = useState<number>(3);
	const [priorityIcon, setPriorityIcon] = useState(getPriorityIcon(0));

	useEffect(() => {
		setPriorityIcon(getPriorityIcon(task?.priority));
	}, [isLoading]);
	console.log(task);
	const close = () => {
		history.push('/projects/1');
	};

	useDismiss(inside, close);

	const updateTask = async () => {
		await makeRequest('projects/boards/update_task', 'put', task);
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

	const handleInputChange = (e: React.SyntheticEvent) => {
		if (task) {
			let target = e.target as HTMLInputElement;
			let newTask: TaskType = { ...task, priority: Number(target.value) };
			setPriorityInputVal(target.value);
			setTask(newTask);
			setPriorityIcon(getPriorityIcon(Number(target.value)));
		}
	};

	const handleSearch = async (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setSearchInput(target.value);
		console.log(target.value);
		setSearchResult([]);
		if (target.value.length > 0) {
			let resp = await makeRequest('users/search', 'post', {
				search: target.value,
			});
			console.log(resp);
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

	const renderSearchResults = () => {
		return searchResult.map((user: User) => {
			return (
				<AddUser
					onClick={() =>
						task && assignUserToTask(user.u_id, task.task_id)
					}
					key={user.u_id}
				>
					<Avatar src={user.profile_pic} />
					<span>{user.username}</span>
					<AddUserBtn>+</AddUserBtn>
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
							/>
						);
					}
				},
			);
	};

	const handleDescriptionChange = (descVal: string) => {
		setDescription(descVal);
		task && setTask({ ...task, description: descVal });
	};

	return ReactDOM.createPortal(
		<OuterDiv>
			<TaskInfo ref={inside}>
				<TaskInfoHead>
					<Button onClick={updateTask}>Save</Button>
					<TaskTitle>{task?.title}</TaskTitle>
				</TaskInfoHead>
				<TaskInfoBody>
					<TaskDescription>
						{!isLoading && (
							<TextEditor
								editable={task?.owner}
								state={task?.description}
								setState={(e: string) =>
									handleDescriptionChange(e)
								}
							/>
						)}
					</TaskDescription>
					<TaskSidebar>
						<TaskCollaborators>
							{!isLoading && renderTaskCollaborators()}
						</TaskCollaborators>
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
						{!!searchResult.length && renderSearchResults()}
					</TaskSidebar>
				</TaskInfoBody>
				<TaskFooter>
					<img src={priorityIcon} />

					<PriorityInput
						style={{ width: '32px' }}
						value={priorityInputVal}
						onChange={(e: React.SyntheticEvent) =>
							handleInputChange(e)
						}
						placeholder={task?.priority ?? 1}
					/>
				</TaskFooter>
			</TaskInfo>
		</OuterDiv>,
		document.querySelector('#modal') as Element,
	);
};

export default BoardColumnTaskInfo;
