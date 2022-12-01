import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const SubTaskForm = ({ projectId }) => {
  const [subTask, setSubTask] = useState({
    taskName: '',
    description: '',
    createDate: '',
    workTime: '',
    endDate: '',
    priority: '',
    status: '',
    isSubtask: ''
  });
  
  const addNewSubTask = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'tasks'), {
      taskName: subTask.taskName,
      description: subTask.description,
      createDate: subTask.createDate,
      workTime: subTask.workTime,
      endDate: subTask.endDate,
      priority: subTask.priority,
      status: subTask.status,
      isSubtask: true,
      projectId: projectId
    })
    setSubTask({
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
          value={SubTask.taskName}
          onChange={e => setSubTask({ ...SubTask, taskName: e.target.value })}
          type={"text"}
          placeholder={"Название Задачи"}
        />
        <MyInput
          value={SubTask.description}
          onChange={e => setSubTask({ ...task, description: e.target.value })}
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
          value={task.status}
          onChange={e => setTask({ ...task, status: e.target.value })}
          type={"text"}
          placeholder={"Текущий статус"}
        />
        <MyButton onClick={addNewSubTask}>Create New Sub Task</MyButton>
      </form>
    );
};

export default SubTaskForm;