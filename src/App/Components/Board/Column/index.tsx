import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Droppable } from 'react-beautiful-dnd';

import {
	Column,
	ColumnTitle,
	ColumnList,
	AddTaskInput,
	TaskCount,
	WipLimit,
	ExpandOptions,
	Dot,
	ColumnOptions,
	WipLimitInput,
	WipLimitToggler,
	WipDecrease,
	WipIncrease,
	ColumnOptionsButtonRow,
	AcceptOptionBtn,
	RejectOptionBtn,
} from './Styles';
import Task from './Task/index';
import { BoardType, ColumnType, TaskType } from '../Types';
import { makeRequest } from '../../../../Api';
import { RowDiv } from '../../../../Styles/LayoutStyles';

type ColumnProps = {
	addTask: any;
	columnNum: number;
	column: ColumnType;
	wipLimit: number;
	taskList: Array<TaskType>;
	board: BoardType | undefined;
	setBoard: Dispatch<SetStateAction<BoardType | undefined>>;
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
	wipLimit,
}) => {
	const [inputVal, setInputVal] = useState('');
	const [titleVal, setTitleVal] = useState(column.title);
	const titleInput = useRef<HTMLInputElement>(null);
	const [wipState, setWipState] = useState(wipLimit);
	const [expandOptions, setExpandOptions] = useState(false);

	// if pressed key is Enter send a request to the api
	const handleTitleEnter = async (e: KeyboardEvent) => {
		if (editable && e.key === 'Enter' && titleVal !== column.title) {
			let res = await makeRequest(
				'projects/boards/update_column',
				'put',
				{
					title: titleVal,
					wipLimit: wipState,
					columnId: column.column_id,
				},
			);
			titleInput?.current?.blur();
		}
	};

	const handleTitleChange = (e: React.SyntheticEvent) => {
		if (editable) {
			let target = e.target as HTMLInputElement;
			if (target.value.length <= 100) {
				// max length for title in DB is 100 characters
				setTitleVal(target.value);
			}
		}
	};

	const handleWipLimitChange = (change: number) => {
		if (wipState + change >= 0) {
			setWipState(wipState + change);
		}
	};

	const handleOptionConfirm = async () => {
		let resp = await makeRequest('projects/boards/update_column', 'put', {
			title: titleVal,
			wipLimit: wipState,
			columnId: column.column_id,
		});
		setExpandOptions(false);
	};

	return (
		<Droppable key={columnNum} droppableId={columnNum.toString()}>
			{(provided) => (
				<Column>
					<RowDiv>
						<ColumnTitle
							value={titleVal}
							ref={titleInput}
							onKeyDown={(e: KeyboardEvent) =>
								handleTitleEnter(e)
							}
							onChange={(e: React.SyntheticEvent) =>
								handleTitleChange(e)
							}
							disabled={!editable}
						/>
						<TaskCount
							wipExceeded={
								wipState ? taskList.length > wipState : false
							}
						>
							{`${taskList.length} / ${!!board &&
								board.columns.find(
									(col) => col.column_id === column.column_id,
								)?.tasks.length}`}
							<WipLimit>
								<span>WIP limit: {wipState || '∞'}</span>
							</WipLimit>
						</TaskCount>
					</RowDiv>
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
					<ExpandOptions
						onClick={() => setExpandOptions(!expandOptions)}
					>
						<Dot />
						<Dot />
						<Dot />
					</ExpandOptions>
					<ColumnOptions expanded={expandOptions}>
						<WipLimitInput>
							<span>WIP limit:</span>
							<WipDecrease
								onClick={() => handleWipLimitChange(-1)}
							/>
							<WipLimitToggler>
								{!wipState ? '∞' : wipState}
							</WipLimitToggler>
							<WipIncrease
								onClick={() => handleWipLimitChange(1)}
							/>
						</WipLimitInput>
						<ColumnOptionsButtonRow>
							<AcceptOptionBtn onClick={handleOptionConfirm}>
								✔
							</AcceptOptionBtn>
							<RejectOptionBtn
								onClick={() => setExpandOptions(false)}
							>
								✗
							</RejectOptionBtn>
						</ColumnOptionsButtonRow>
					</ColumnOptions>
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
