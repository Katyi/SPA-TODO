import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import MyModal from './UI/modal/MyModal';
import TaskUpdForm from './TaskUpdForm';

const allowedDropEffect = 'move;'

const SubTaskColumn = (props) => {
  const [modal5, setModal5] = useState(false);
  const [currentTask, setCurrentTask] = useState([]);
  const [errors, setErrors] = useState({});

  const updTask = async (task) => {
    await updateDoc(doc(db, 'tasks', task.id), {
      taskNumber: task?.taskNumber,
      taskName: task?.taskName,
      description: task?.description,
      createDate: task?.createDate,
      workTime: task?.workTime,
      endDate: task?.endDate,
      priority: task?.priority,
      status: props?.name,
    });
    props.firebaseQuery();
  }


  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: task => updTask(task),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [allowedDropEffect],
  )
  const divStyle = {
    // minHeight: '50px'
    padding: 0

  }

  return (
    <div className={props.class} ref={drop} style={divStyle}>
      {isOver && <div>Drop Here!</div>}
      <div className='tasks'>
        {props.tasks.sort((a, b) => a.taskNumber > b.taskNumber ? 1 : -1)
          .map((task, index) => (
            <TaskItem
              remove={props.removeTask}
              firebaseQuery={props.firebaseQuery}
              task={task} key={index}
              modal={modal5}
              setModal={setModal5}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
            />
          ))}
      </div>

      {/* MODAL FOR UPDATE SUBTASK */}
      <MyModal visible={modal5} setVisible={setModal5} setErrors={props.setErrors}>
        <TaskUpdForm
          modal={modal5} 
          setModal={setModal5} 
          currentTask={currentTask} 
          setCurrentTask={setCurrentTask} 
          firebaseQuery={props.firebaseQuery}
          errors={errors} setErrors={setErrors}
        />
      </MyModal>
    </div>
  )
}

export default SubTaskColumn;