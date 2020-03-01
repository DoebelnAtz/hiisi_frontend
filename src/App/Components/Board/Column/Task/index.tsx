import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Dots from '../../../../../Assets/Dots.png';
import deleteImg from '../../../../../Assets/x.png';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
	Task,
	TaskContent,
	TaskPriority,
	TaskCollaborators,
	DeleteTaskImg,
	TaskTitle,
	TaskStatusRow,
	TaskStatusText,
	TaskStatusImg,
	TaskColorTag,
} from './Styles';
import infoIcon from '../../../../../Assets/Info.png';
import { getPriorityIcon } from '../../../../../Utils/taskUtils';
import { BoardType, TaskType } from '../../Types';
import { RowDiv } from '../../../../../Styles/LayoutStyles';
import { makeRequest } from '../../../../../Api';
import { checkUserList } from '../../../../../Utils';

type TaskProps = {
	task: TaskType;
	index: number;
	board: BoardType | undefined;
	setBoard: Dispatch<SetStateAction<BoardType | undefined>>;
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
		if (resp.data && board) {
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
							<TaskStatusRow>
								{!!task.status.length && (
									<TaskStatusImg>
										<img src={infoIcon} alt={'info'} />
										<TaskStatusText>
											<span>{task.status}</span>
										</TaskStatusText>
									</TaskStatusImg>
								)}
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
								<TaskColorTag tagColor={task.color_tag} />
								<TaskPriority>
									<img
										src={getPriorityIcon(task.priority)}
										alt={'priorityIcon'}
									/>
								</TaskPriority>
							</TaskStatusRow>
							<RowDiv>
								<TaskTitle>{task.title}</TaskTitle>
							</RowDiv>

							<TaskCollaborators>
								{renderTaskCollaborators()}
							</TaskCollaborators>
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
