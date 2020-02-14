import React, { useEffect, useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Column, ColumnTitle, ColumnList } from './Styles';
import Task from './Task';
import Input from '../../Components/Input';
import { ColumnProps } from '../Types';
import { makeRequest } from '../../Api/Api';

const BoardColumn: React.FC<ColumnProps> = ({
	addTask,
	columnNum,
	column,
	taskList,
}) => {
	const [inputVal, setInputVal] = useState('');
	const [titleVal, setTitleVal] = useState(column.title);
	const titleInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// To make sure title value updates from 'loading...' after we
		// fetch columns.
		setTitleVal(column.title);
	}, [column.title]);

	const handleTitleEnter = async (e: KeyboardEvent) => {
		if (e.key === 'Enter' && titleVal !== column.title) {
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

	return (
		<Droppable key={columnNum} droppableId={columnNum.toString()}>
			{(provided) => (
				<Column>
					<ColumnTitle
						value={titleVal}
						ref={titleInput}
						onKeyDown={(e: KeyboardEvent) => handleTitleEnter(e)}
						onChange={(e: React.SyntheticEvent) => {
							let target = e.target as HTMLInputElement;
							setTitleVal(target.value);
						}}
					/>
					<Input
						customStyle={{ margin: '10px 0', width: 'calc(100%)' }}
						placeholder={'add task'}
						setValueState={setInputVal}
						valueState={inputVal}
						onEnter={() => addTask(inputVal, column.column_id)}
					/>
					<ColumnList
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{taskList.map((task, index) => (
							<Task
								key={task.task_id}
								task={task}
								index={index}
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
