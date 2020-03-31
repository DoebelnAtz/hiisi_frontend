import React, { useRef, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import Column from './Column/index';
import _ from 'lodash';

import {
	Columns,
	Collaborator,
	ProjectCollaborators,
	BoardDiv,
	PlaceHolderCollaborator, ColorFilter, ColorFilterPicker, ResetColorFilterDiv,
} from './Styles';
import { makeRequest } from '../../../Api';
import { useDismiss, useRequest } from '../../../Hooks';
import { BoardType, ColumnType, TaskType } from './Types';
import { User } from '../../../Types';
import { RowDiv } from '../../../Styles/LayoutStyles';
import ColorPicker from '../ColorPicker';

type BoardProps = {
	board_id: number;
	projectCollaborators: Array<User>;
	editable?: boolean;
};

const Board: React.FC<BoardProps> = ({
	editable = true,
	board_id,
	projectCollaborators,
}) => {
	// Getting TS2739 error, not sure how to solve it..
	const location = useLocation();
	// We wan't the board to update when user saves changes to task, adding a
	// dummy query parameter to the request url updates the board
	const [board, setBoard, isLoading] = useRequest<BoardType>(
		`projects/boards/${board_id}?loc=${location.pathname}`,
		'get',
	);

	const [colorFilter, setColorFilter] = useState<string | null>(null);
	const [expandColorPicker, setExpandColorPicker] = useState(false);
	const [filteredUser, setFilteredUser] = useState<number>(0);
	const colorPickerDiv = useRef<HTMLDivElement>(null);
	const colorPickerBtn = useRef<HTMLDivElement>(null);

	useDismiss(colorPickerDiv, () => setExpandColorPicker(false), colorPickerBtn);

	const filterBoard = () => {
		if (!filteredUser && !colorFilter) {
			return board;
		} else {
			return ({
				...board,
				columns: board?.columns.map((col) => {
					return {
						...col,
						tasks: _.flow(
							(tasks: TaskType[]) => tasks.filter((task) => {
								return task.color_tag === colorFilter || !colorFilter
							}),
							(tasks: TaskType[]) => tasks.filter((task) => {
								return task.collaborators.find((collaborator) => {
									return collaborator.u_id === filteredUser || !filteredUser
								})
							})
						)(col.tasks)
					} })
			}) as BoardType;
		}
	};
	// Not the prettiest function, basically, handles board state modification
	// When moving task from one column to another and makes a put request to
	// the backend.
	const handleTaskDrop = ({ draggableId, destination, source }: any) => {
		if (destination && board) {
			let destColId = Number(destination.droppableId);
			let srcColId = Number(source.droppableId);
			let taskId = Number(draggableId);
			if (srcColId === destColId && source.index === destination.index)
				return;
			// @ts-ignore
			let draggedTask: TaskType = filterBoard().columns[srcColId].tasks[
				source.index
			];
			let targetCol = filterBoard()?.columns[destColId] as ColumnType;
			let updatedTask = {
				...draggedTask,
				column_id: targetCol.column_id,
			} as TaskType;
			draggedTask.column_id = targetCol.column_id;
			setBoard({
				columns: board.columns.map((column) => ({
					...column,
					tasks: _.flow(
						// check Lodash docs on flow.
						(ids: Array<TaskType>) =>
							ids.filter((id) => id.task_id !== taskId),

						(ids: Array<TaskType>) =>
							column.column_number === destColId
								? [
										...ids.slice(0, destination.index),
										draggedTask,
										...ids.slice(destination.index),
								  ]
								: ids,
					)(column.tasks),
				})),
			});
			makeRequest(
				'projects/boards/update_task_position',
				'put',
				updatedTask,
			);
		}
	};

	const addTask = async (taskTitle: string, taskColumnId: number) => {
		let resp = await makeRequest('projects/boards/add_task', 'post', {
			taskTitle,
			taskColumnId,
		});
		if (resp?.data && board) {
			let addedTask = resp.data;
			setBoard({
				...board,
				columns: board.columns.map((col) => {
					if (col.column_id === taskColumnId) {
						return { ...col, tasks: [...col.tasks, addedTask] };
					} else {
						return col;
					}
				}),
			});
		}
	};

	const handleColorFilterChange = (newColor: string) => {
		if (newColor === colorFilter) {
			setColorFilter(null)
		} else {
			setColorFilter(newColor);
		}
		setExpandColorPicker(false)
	};

	const renderCollaborators = () => {
		if (!isLoading) {
			return projectCollaborators.map((collaborator) => {
				return (
					<Collaborator
						filtered={filteredUser === collaborator.u_id}
						onClick={() =>
							setFilteredUser(
								filteredUser === collaborator.u_id
									? 0
									: collaborator.u_id,
							)
						}
						key={collaborator.u_id}
					>
						<img
							key={collaborator.u_id}
							className={'collaborator_avatar'}
							src={collaborator.profile_pic}
							alt={'profile_pic'}
						/>
					</Collaborator>
				);
			});
		} else {
			return <PlaceHolderCollaborator />;
		}
	};

	return (
		<BoardDiv>
			<RowDiv>
				<ProjectCollaborators>{renderCollaborators()}</ProjectCollaborators>
				<ColorFilter ref={colorPickerBtn}  color={colorFilter} onClick={() => setExpandColorPicker(!expandColorPicker)}>
					{colorFilter &&
					<ResetColorFilterDiv onClick={(e: React.SyntheticEvent) => {
						e.stopPropagation(); setColorFilter(null)
					}}><span>✕</span></ResetColorFilterDiv>
					}
				</ColorFilter>
				<ColorFilterPicker ref={colorPickerDiv}>
					{expandColorPicker &&
					<ColorPicker onChange={handleColorFilterChange} colors={[
						'#c76177',
						'#bd8b59',
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
					}
				</ColorFilterPicker>
			</RowDiv>
			<DragDropContext onDragEnd={handleTaskDrop}>
				<Columns>
					{filterBoard()?.columns.map((column: ColumnType) => (
						<Column
							column={column}
							columnNum={column.column_number}
							key={column.column_number}
							taskList={column.tasks}
							addTask={addTask}
							setBoard={setBoard}
							board={board}
							wipLimit={column.wip_limit}
							editable={editable}
						/>
					))}
				</Columns>
			</DragDropContext>
		</BoardDiv>
	);
};

export default Board;
