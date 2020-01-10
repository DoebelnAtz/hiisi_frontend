import React from 'react'
import {DragSource, DropTarget} from 'react-dnd';
import cn from 'classnames';
import _ from 'lodash'

export function Task(props) {
    return _.flowRight(props.connectDragSource, props.connectDropTarget)(
        <div
            key={props.key}
            className={cn('task', {
                'dragging': props.isDragging,
                'spacer': props.isSpace
            })

            }
        >
            <div className="task_title">{props.text}</div>
        </div>
    );
}

export const DraggableTask = _.flow([
    DragSource(
        'task',
        {
            canDrag: props => !props.isSpace,
            beginDrag(props) {
                return {id: props.id};
            },

            isDragging(props, monitor) {
                return props.id === monitor.getItem().id;
            },
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        })
    ),
    DropTarget(
        'task',
        {
            hover(props, monitor) {
                const {columnId, columnIndex} = props;
                const draggingItem = monitor.getItem();
                if (draggingItem.id !== props.id) {
                    props.moveTask(draggingItem.id, columnId, columnIndex);
                }
            },
        },
        connect => ({
            connectDropTarget: connect.dropTarget(),
        })
    ),
])(Task);