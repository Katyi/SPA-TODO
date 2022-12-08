import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';

import { db } from '../firebase';

const TaskForm = ({ projectId, firebaseQuery, handleClose }) => {
  const [newItem, setNewItem] = useState({
    taskNumber: '',
    taskName: '',
    description: '',
    createDate: '',
    workTime: '',
    endDate: '',
    priority: '',
    status: ''
  });

  const addNewTask = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'tasks'), {
      taskNumber: newItem.taskNumber,
      taskName: newItem.taskName,
      description: newItem.description,
      createDate: newItem.createDate,
      workTime: newItem.workTime,
      endDate: newItem.endDate,
      priority: newItem.priority,
      status: 'Queue',
      isSubtask: false,
      projectId: projectId,
    })
    setNewItem({
      taskNumber: '',
      taskName: '',
      description: '',
      createDate: '',
      workTime: '',
      endDate: '',
      priority: '',
      status: ''
    });
    // firebaseQuery();
    // handleClose();
    window.location.reload();
  }
  return (
    <form>
      <MyInput
        value={newItem.taskNumber}
        onChange={e => setNewItem({ ...newItem, taskNumber: e.target.value })}
        type={"number"}
        placeholder={"Номер Задачи"}
        required
      />
      <MyInput
        value={newItem.taskName}
        onChange={e => setNewItem({ ...newItem, taskName: e.target.value })}
        type={"text"}
        placeholder={"Название Задачи"}
      />
      <MyInput
        value={newItem.description}
        onChange={e => setNewItem({ ...newItem, description: e.target.value })}
        type={"text"}
        placeholder={"Описание Задачи"}
      />
      <MyInput
        value={newItem.createDate}
        onChange={e => setNewItem({ ...newItem, createDate: e.target.value })}
        type={"date"}
        placeholder={"Дата создания"}
      />
      <MyInput
        value={newItem.workTime}
        onChange={e => setNewItem({ ...newItem, workTime: e.target.value })}
        type={"number"}
        placeholder={"Время в работе"}
      />
      <MyInput
        value={newItem.endDate}
        onChange={e => setNewItem({ ...newItem, endDate: e.target.value })}
        type={"date"}
        placeholder={"Дата окончания"}
      />
      <MyInput
        value={newItem.priority}
        onChange={e => setNewItem({ ...newItem, priority: e.target.value })}
        type={"text"}
        placeholder={"Приоритет"}
        required
      />
      <MyButton onClick={addNewTask}>Create New Task</MyButton>
    </form>
  );
};

export default TaskForm;