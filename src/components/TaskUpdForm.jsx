import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

  // -----Просмотр и редактирование задачи в модальном окне-------------------------------------------------------------------------------------
const TaskUpdForm = ({ task, firebaseQuery, handleClose }) => {
  const [UpdItem, setUpdItem] = useState({
    taskNumber: task.taskNumber,
    taskName: task.taskName,
    description: task.description,
    createDate: task.createDate,
    workTime: task.workTime,
    endDate: task.endDate,
    priority: task.priority,
    fileName: task.fileName,
    fileUrl: task.fileUrl
  });

  const updTask = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'tasks', task.id), {
      taskNumber: UpdItem.taskNumber,
      taskName: UpdItem.taskName,
      description: UpdItem.description,
      createDate: UpdItem.createDate,
      workTime: UpdItem.workTime,
      endDate: UpdItem.endDate,
      priority: UpdItem.priority,
    });
    // firebaseQuery();
    // handleClose();
    window.location.reload();
  }

  return (
    <form>
      <MyInput
        value={UpdItem.taskNumber}
        onChange={e => setUpdItem({...UpdItem, taskNumber: e.target.value})}
        type={"number"}
        placeholder={"Номер задачи"}
      />
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
        placeholder={"Нет загруженного файла"}
      />
      <a href={task.fileUrl} target='_blank'>Ссылка на файл</a>
      <MyInput
        value={task.status}
        onChange={e => setUpdItem({ ...UpdItem, status: e.target.value })}
        type={"text"}
        placeholder={"Текущий статус"}
      />
      <MyButton onClick={updTask}>Update task</MyButton>
    </form>
  );
};

export default TaskUpdForm;