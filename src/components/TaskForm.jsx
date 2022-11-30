import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const TaskForm = ({ projectId }) => {
  const [task, setTask] = useState({ taskName: '', description: '' });

  const addNewTask = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'tasks'), {
      taskName: task.projectName,
      description: task.description,
      status: task.status,
      isSubtask: false,
      projectId: projectId
    })
    window.location.reload();
}

    return (
      <form>
        <MyInput
          value={task.projectName}
          onChange={e => setTask({ ...task, projectName: e.target.value })}
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
          type={"text"}
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
          type={"text"}
          placeholder={"Дата окончания"}
        />
        <MyInput
          value={task.priority}
          onChange={e => setTask({ ...task, priority: e.target.value })}
          type={"text"}
          placeholder={"Приоритет"}
        />
        <MyInput
          value={task.fileName}
          onChange={e => setTask({ ...task, fileName: e.target.value })}
          type={"text"}
          placeholder={"Вложенные файлы"}
        />
        <MyInput
          value={task.status}
          onChange={e => setTask({ ...task, status: e.target.value })}
          type={"text"}
          placeholder={"Текущий статус"}
        />
        <MyButton onClick={addNewTask}>Create New Task</MyButton>
      </form>
    );
};

export default TaskForm;