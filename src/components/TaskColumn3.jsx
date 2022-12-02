import React from 'react';
import TaskItem from './TaskItem';

const TaskColumn3 = (props) => {
  return (
    <div className='container3' ref={props.drop}>
      <div className='tasks'>
        {props.doneTasks.map((task, index) => (
          <TaskItem remove={props.removeTask} task={task} key={index} />
        ))}
      </div>
    </div>
  )
}

export default TaskColumn3;