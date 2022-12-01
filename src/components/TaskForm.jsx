import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const TaskForm = ({ projectId }) => {
  const [task, setTask] = useState({
    taskNumber: '',
    taskName: '',
    description: '',
    createDate: '',
    workTime: '',
    endDate: '',
    priority: '',
    status: '',
    isSubtask: ''
  });
  
  const addNewTask = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'tasks'), {
      taskNumber: task.taskNumber,
      taskName: task.taskName,
      description: task.description,
      createDate: task.createDate,
      workTime: task.workTime,
      endDate: task.endDate,
      priority: task.priority,
      status: task.status,
      isSubtask: false,
      projectId: projectId
    })
    setTask({
      taskNumber: '',
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
          value={task.taskNumber}
          onChange={e => setTask({ ...task, taskNumber: e.target.value })}
          type={"number"}
          placeholder={"Номер Задачи"}
          required
        />
        <MyInput
          value={task.taskName}
          onChange={e => setTask({ ...task, taskName: e.target.value })}
          type={"text"}
          placeholder={"Название Задачи"}
        />
        <MyInput
          value={task.description}
          onChange={e => setTask({ ...task, description: e.target.value })}
          type={"text"}
          placeholder={"Описание Задачи"}
        />
        <MyInput
          value={task.createDate}
          onChange={e => setTask({ ...task, createDate: e.target.value })}
          type={"date"}
          placeholder={"Дата создания"}
        />
        <MyInput
          value={task.workTime}
          onChange={e => setTask({ ...task, workTime: e.target.value })}
          type={"number"}
          placeholder={"Время в работе"}
        />
        <MyInput
          value={task.endDate}
          onChange={e => setTask({ ...task, endDate: e.target.value })}
          type={"date"}
          placeholder={"Дата окончания"}
        />
        <MyInput
          value={task.priority}
          onChange={e => setTask({ ...task, priority: e.target.value })}
          type={"text"}
          placeholder={"Приоритет"}
          required
        />
        <MyInput
          value={task.status}
          onChange={e => setTask({ ...task, status: e.target.value })}
          type={"text"}
          placeholder={"Текущий статус"}
          required
        />
        <MyButton onClick={addNewTask}>Create New Task</MyButton>
      </form>
    );
};

export default TaskForm;