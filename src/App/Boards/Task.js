import React, {useRef, useState} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {DragSource, DropTarget} from 'react-dnd';

import {useSpring} from "react-spring";
import _ from 'lodash'

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

export function Task(props) {
    return _.flowRight(props.connectDragSource, props.connectDropTarget)(
        <div
            className={props.isDragging ? "dragging" : (props.isSpace ? "spacer" : "task")}
        >
            <div className="task_title">{props.text}</div>
        </div>
    );
}

export const DraggableTask = _.flowRight([
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
    DragSource(
        'task',
        {
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
])(Task);

// export default (props) => {
//
//     const ref = useRef(null);
//
//     const [{ isDragging }, drag] = useDrag({
//         item: { type: "task", id: props.id, index: props.index },
//         collect: monitor => ({
//             isDragging: monitor.isDragging(),
//         }),
//         // end(item) {
//         //     props.moveTask(item.id, props.columnId, props.columnIndex)
//         // }
//
//     });
//
//     const [, drop] = useDrop({
//         accept: "task",
//         hover(item, monitor) {
//             const {columnId, columnIndex} = props;
//             const draggingItem = item;
//             if (draggingItem.id !== props.id) {
//                 props.moveTask(draggingItem.id, columnId, columnIndex)
//             }
//         },
//     });
//
//     //const opacity = isDragging ? 0 : 1;
//
//     drag(drop(ref));
//
//     return (
//         <div ref={ref} className={''} style={{...style}}>
//             {props.text}
//         </div>
//     )
// };