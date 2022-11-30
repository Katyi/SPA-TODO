import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const TaskUpdForm = ({ task }) => {
  const [UpdItem, setUpdItem] = useState({
    taskName: task.taskName,
    description: task.description,
    createDate: task.createDate,
    workTime: task.workTime,
    endDate: task.endDate,
    priority: task.priority,
    fileName: task.fileName,
    fileUrl: task.fileUrl,
    status: task.status
  });

  const updTask = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'tasks', task.id), {
      taskName: UpdItem.taskName,
      description: UpdItem.description,
      createDate: UpdItem.createDate,
      workTime: UpdItem.workTime,
      endDate: UpdItem.endDate,
      priority: UpdItem.priority,
      status: UpdItem.status
    });
    setUpdItem({
      taskName: '',
      description: '',
      createDate: '',
      workTime: '',
      endDate: '',
      priority: '',
      fileName: '',
      fileUrl: '',
      status: ''
    });
    window.location.reload();
  }

  return (
    <form>
      <MyInput
        value={UpdItem.taskName}
        onChange={e => setUpdItem({...UpdItem, taskName: e.target.value})}
        type={"text"}
        placeholder={"Название задачи"}
      />
      <MyInput
        value ={UpdItem.description}
        onChange={e => setUpdItem({ ...UpdItem, description: e.target.value })}
        type={"text"}
        placeholder={"Описание задачи"}
      />
      <MyInput
        value ={UpdItem.createDate}
        onChange={e => setUpdItem({ ...UpdItem, createDate: e.target.value })}
        type={"date"}
        placeholder={"Дата создания задачи"}
      />
      <MyInput
        value ={UpdItem.workTime}
        onChange={e => setUpdItem({ ...UpdItem, workTime: e.target.value })}
        type={"number"}
        placeholder={"Время в работе"}
      />
      <MyInput
        value ={UpdItem.endDate}
        onChange={e => setUpdItem({ ...UpdItem, endDate: e.target.value })}
        type={"date"}
        placeholder={"Дата окончания"}
      />
      <MyInput
        value={UpdItem.priority}
        onChange={e => setUpdItem({ ...UpdItem, priority: e.target.value })}
        type={"text"}
        placeholder={"Приоритет"}
      />
      <MyInput
        value={UpdItem.fileName}
        disabled="disabled"
        onChange={e => setUpdItem({ ...UpdItem, fileName: e.target.value })}
        type={"text"}
        placeholder={"Вложенный файл"}
      />
      <a href={UpdItem.fileUrl} target='_blank'>Ссылка на файл</a>
      <MyInput
        value={UpdItem.status}
        onChange={e => setUpdItem({ ...UpdItem, status: e.target.value })}
        type={"text"}
        placeholder={"Текущий статус"}
      />
      <MyButton onClick={updTask}>Update task</MyButton>
    </form>
  );
};

export default TaskUpdForm;