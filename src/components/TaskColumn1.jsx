import React from 'react';
import TaskItem from './TaskItem';

const TaskColumn1 = (props) => {
  return (
    <div className='container1' ref={props.drop}>
        <div className='tasks'>
          {props.queueTasks.map((task, index) => (
            <TaskItem remove={props.removeTask} task={task} key={index}/>
          ))}
          </div>
          </div>
  )
}

export default TaskColumn1;