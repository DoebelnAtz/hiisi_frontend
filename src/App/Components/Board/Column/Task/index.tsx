import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Dots from '../../../../../Assets/Dots.png';
import deleteImg from '../../../../../Assets/x.png';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
	Task,
	TaskContent,
	TaskStatus,
	TaskCollaborators,
	DeleteTaskImg,
	TaskTitle,
	TaskStatusTooltip,
	TaskStatusText,
} from './Styles';
import infoIcon from '../../../../../Assets/Info.png';
import { getPriorityIcon } from '../../../../../Utils/taskUtils/index';
import { BoardType, TaskType } from '../../Types/index';
import { RowDiv } from '../../../../../Styles/LayoutStyles';
import { makeRequest } from '../../../../../Api/Api';
import { checkUserList } from '../../../../../Utils/index';

type TaskProps = {
	task: TaskType;
	index: number;
	board: BoardType;
	setBoard: Dispatch<SetStateAction<BoardType>>;
	editable?: boolean;
};

const BoardColumnTask: React.FC<RouteComponentProps<{}> & TaskProps> = ({
	task,
	index,
	history,
	board,
	setBoard,
	editable = true,
}) => {
	const renderTaskCollaborators = () => {
		return task.collaborators.map((collaborator, index) => {
			if (index === 3 && task.collaborators.length > 4) {
				return <img key={collaborator.u_id} src={Dots} alt={'dots'} />;
			} else if (index > 3) {
				return <div key={collaborator.u_id} />;
			} else {
				return (
					<img
						key={collaborator.u_id}
						src={collaborator.profile_pic}
						alt={'profile_pic'}
					/>
				);
			}
		});
	};

	const deleteTask = async (e: React.SyntheticEvent) => {
		e.stopPropagation();
		let resp = await makeRequest(
			'projects/boards/tasks/delete_task',
			'delete',
			{ taskId: task.task_id },
		);
		if (resp.data) {
			setBoard({
				...board,
				columns: board.columns.map((column) => {
					return {
						...column,
						tasks: column.tasks.filter(
							(t) => t.task_id !== task.task_id,
						),
					};
				}),
			});
		}
	};

	return (
		<Fragment>
			<Draggable
				isDragDisabled={!editable}
				draggableId={task.task_id.toString()}
				index={index}
			>
				{(provided: any, snapshot: any) => (
					<TaskContent
						ref={provided.innerRef}
						onClick={() =>
							history.push(
								`${history.location.pathname}/tasks/${task.task_id}`,
							)
						}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<Task
							isBeingDragged={
								snapshot.isDragging && !snapshot.isDropAnimating
							}
						>
							<RowDiv>
								{!!task.status.length && (
									<TaskStatusTooltip>
										<img src={infoIcon} alt={'info'} />
										<TaskStatusText>
											<span>{task.status}</span>
										</TaskStatusText>
									</TaskStatusTooltip>
								)}
								<TaskTitle>{task.title}</TaskTitle>
								{editable && checkUserList(task.collaborators) && (
									<DeleteTaskImg
										onClick={(e: React.SyntheticEvent) =>
											deleteTask(e)
										}
									>
										<img
											src={deleteImg}
											alt={'delete task'}
										/>
									</DeleteTaskImg>
								)}
							</RowDiv>
							<TaskStatus>
								<img
									src={getPriorityIcon(task.priority)}
									alt={'priorityIcon'}
								/>
								<TaskCollaborators>
									{renderTaskCollaborators()}
								</TaskCollaborators>
							</TaskStatus>
						</Task>
					</TaskContent>
				)}
			</Draggable>
		</Fragment>
	);
};
// Don't know how to do this properly in typescript yet TODO: fix this
// @ts-ignore
export default withRouter(BoardColumnTask);
