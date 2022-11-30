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
    status: task.status,
    isSubtask: task.isSubtask
  });
    
  const updTask = async (e) => {
    e.preventDefault();
    console.log("Меняем задачу ", task.id);
    await updateDoc(doc(db, 'tasks', task.id), {
      taskName: UpdItem.taskName,
      description: UpdItem.description,
      createDate: UpdItem.createDate,
      workTime: UpdItem.workTime,
      endDate: UpdItem.endDate,
      priority: UpdItem.priority,
      fileName: UpdItem.fileName,
      status: UpdItem.status,
      isSubtask: UpdItem.isSubtask
    });
    setUpdItem({ taskName: '', description: '' });
    // console.log("UDATE работает");
    // console.log(task.projectId);
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
        // options={options}
      />
      <MyInput
        value ={UpdItem.fileName}
        onChange={e => setUpdItem({ ...UpdItem, fileName: e.target.value })}
        type={"text"}
        placeholder={"Вложенные файлы"}
      />
      <MyInput
        value ={UpdItem.status}
        onChange={e => setUpdItem({ ...UpdItem, status: e.target.value })}
        type={"text"}
        placeholder={"Текущий статус"}
      />
      <MyInput
        value ={UpdItem.isSubtask}
        onChange={e => setUpdItem({ ...UpdItem, isSubtask: e.target.value })}
        type={"text"}
        placeholder={"Подзадча"}
      />
      <MyButton onClick={updTask}>Update task</MyButton>
    </form>
  );
};

export default TaskUpdForm;