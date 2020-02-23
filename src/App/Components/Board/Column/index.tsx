import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Column, ColumnTitle, ColumnList, AddTaskInput } from './Styles';
import Task from './Task/index';
import { BoardType, ColumnType, TaskType } from '../Types';
import { makeRequest } from '../../../../Api/Api';

type ColumnProps = {
	addTask: any;
	columnNum: number;
	column: ColumnType;
	taskList: Array<TaskType>;
	board: BoardType;
	setBoard: Dispatch<SetStateAction<BoardType>>;
	editable?: boolean;
};

const BoardColumn: React.FC<ColumnProps> = ({
	editable = true,
	addTask,
	columnNum,
	column,
	taskList,
	board,
	setBoard,
}) => {
	const [inputVal, setInputVal] = useState('');
	const [titleVal, setTitleVal] = useState(column.title);
	const titleInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// To make sure title value updates from 'loading...' after we
		// fetch columns.
		setTitleVal(column.title);
	}, [column.title]);

	// if pressed key is Enter send a request to the api
	const handleTitleEnter = async (e: KeyboardEvent) => {
		if (editable && e.key === 'Enter' && titleVal !== column.title) {
			let res = await makeRequest(
				'projects/boards/update_column_title',
				'put',
				{
					title: titleVal,
					columnId: column.column_id,
				},
			);
			titleInput?.current?.blur();
		}
	};

	const handleTitleChange = (e: React.SyntheticEvent) => {
		if (editable) {
			let target = e.target as HTMLInputElement;
			setTitleVal(target.value);
		}
	};

	return (
		<Droppable key={columnNum} droppableId={columnNum.toString()}>
			{(provided) => (
				<Column>
					<ColumnTitle
						value={titleVal}
						ref={titleInput}
						onKeyDown={(e: KeyboardEvent) => handleTitleEnter(e)}
						onChange={(e: React.SyntheticEvent) =>
							handleTitleChange(e)
						}
						disabled={!editable}
					/>
					{editable && (
						<AddTaskInput
							placeholder={'add task'}
							onChange={(e: React.SyntheticEvent) => {
								let target = e.target as HTMLInputElement;
								setInputVal(target.value);
							}}
							value={inputVal}
							onKeyDown={(e: KeyboardEvent) => {
								if (e.key === 'Enter')
									addTask(inputVal, column.column_id);
							}}
						/>
					)}
					<ColumnList
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{taskList.map((task, index) => (
							<Task
								key={task.task_id}
								task={task}
								index={index}
								board={board}
								setBoard={setBoard}
								editable={editable}
							/>
						))}
						{provided.placeholder}
					</ColumnList>
				</Column>
			)}
		</Droppable>
	);
};

export default BoardColumn;
