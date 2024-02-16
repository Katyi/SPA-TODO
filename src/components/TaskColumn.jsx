import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import MyModal from './UI/modal/MyModal';
import TaskUpdForm from './TaskUpdForm';

const TaskColumn = (props) => {
  const [modal3, setModal3] = useState(false);
  const [currentTask, setCurrentTask] = useState([]);
  const [errors, setErrors] = useState({});

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = async (e, cat) => {
    let id = e.dataTransfer.getData('id');
    await updateDoc(doc(db, 'tasks', id), {
      status: cat,
    });
    props.firebaseQuery();
  };

  return (
    <div
      className={props.class}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, props.name)}
    >
      {/* {isOver && <div>Drop Here!</div>} */}
      {props.tasks
        .sort((a, b) => (a.taskNumber > b.taskNumber ? 1 : -1))
        .map((task, index) => (
          <TaskItem
            remove={props.removeTask}
            firebaseQuery={props.firebaseQuery}
            task={task}
            key={index}
            modal={modal3}
            setModal={setModal3}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
          />
        ))}

      {/* MODAL FOR UPDATE TASK */}
      <MyModal
        visible={modal3}
        setVisible={setModal3}
        setErrors={props.setErrors}
      >
        <TaskUpdForm
          modal={modal3}
          setModal={setModal3}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          firebaseQuery={props.firebaseQuery}
          errors={errors}
          setErrors={setErrors}
        />
      </MyModal>
    </div>
  );
};

export default TaskColumn;