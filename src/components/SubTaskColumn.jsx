import React from 'react';
import TaskItem from './TaskItem';

const TaskColumn2 = (props) => {
  return (
    <div className='container2' ref={props.drop}>
      <div className='tasks'>
        {props.developmentTasks.map((task, index) => (
          <TaskItem remove={props.removeTask} task={task} key={index} />
        ))}
      </div>
    </div>
  )
}

export default TaskColumn2;