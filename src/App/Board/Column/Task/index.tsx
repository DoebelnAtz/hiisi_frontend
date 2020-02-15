import React, { Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Dots from '../../../../Assets/Dots.png';
import { withRouter } from 'react-router-dom';
import { Task, TaskContent, TaskStatus, TaskCollaborators } from './Styles';
import { getPriorityIcon } from '../../../../utils/taskUtils';
import { TaskProps } from '../../Types';

const BoardColumnTask: React.FC<TaskProps> = ({ task, index, history }) => {
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

	return (
		<Fragment>
			<Draggable draggableId={task.task_id.toString()} index={index}>
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
							<span>{task.title}</span>
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
