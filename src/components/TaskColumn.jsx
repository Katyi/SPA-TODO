import React from 'react';
import TaskItem from './TaskItem';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
const allowedDropEffect = 'move;'



const TaskColumn = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: () => ({
        name: `${allowedDropEffect} Dustbin`,
        allowedDropEffect,
      }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [allowedDropEffect],
  )
  const isActive = canDrop && isOver
  
  return (
    <div className={props.class} ref={drop}>
        <div className='tasks'>
          {props.tasks.map((task, index) => (
            <TaskItem remove={props.removeTask} task={task} key={index}/>
          ))}
          </div>
          </div>
  )
}

export default TaskColumn;