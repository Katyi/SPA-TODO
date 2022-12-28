import React from 'react';
import TaskItem from './TaskItem';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const allowedDropEffect = 'move;'

const SubTaskColumn = (props) => {

  const updTask = async (task) => {
    await updateDoc(doc(db, 'tasks', task.id), {
      taskNumber: task.taskNumber,
      taskName: task.taskName,
      description: task.description,
      createDate: task.createDate,
      workTime: task.workTime,
      endDate: task.endDate,
      priority: task.priority,
      status: props.name,
    });
    // props.firebaseQuery();
    window.location.reload();
  }


  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: task =>updTask(task),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [allowedDropEffect],
  )
  const divStyle = {
    minHeight: '50px'
  }
  
  return (
    <div className={props.class} ref={drop} style={divStyle}>
      {isOver && <div>Drop Here!</div>}
        <div className='tasks'>
        {props.tasks.sort((a,b)=>a.taskNumber > b.taskNumber ? 1 : -1)
          .map((task, index) => (
            <TaskItem remove={props.removeTask} firebaseQuery={props.firebaseQuery} task={task} key={index}/>
          ))}
          </div>
          </div>
  )
}

export default SubTaskColumn;