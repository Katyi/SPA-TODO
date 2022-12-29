import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useLocation } from "react-router-dom";

// -----Просмотр и редактирование задачи в модальном окне-------------------------------------------------------------------------------------
const TaskUpdForm = () => {
  const location = useLocation();
  const { projectId, task } = location.state;
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
  }

  return (
    <form>
      <MyInput
        value={UpdItem.taskNumber}
        onChange={e => setUpdItem({...UpdItem, taskNumber: e.target.value})}
        type={"number"}
        placeholder={"Task Number"}
      />
      <MyInput
        value={UpdItem.taskName}
        onChange={e => setUpdItem({...UpdItem, taskName: e.target.value})}
        type={"text"}
        placeholder={"Task Name"}
      />
      <MyInput
        value ={UpdItem.description}
        onChange={e => setUpdItem({ ...UpdItem, description: e.target.value })}
        type={"text"}
        placeholder={"Task Description"}
      />
      <MyInput
        value ={UpdItem.createDate}
        onChange={e => setUpdItem({ ...UpdItem, createDate: e.target.value })}
        type={"date"}
        placeholder={"Create Date"}
      />
      <MyInput
        value ={UpdItem.workTime}
        onChange={e => setUpdItem({ ...UpdItem, workTime: e.target.value })}
        type={"number"}
        placeholder={"Task Time"}
      />
      <MyInput
        value ={UpdItem.endDate}
        onChange={e => setUpdItem({ ...UpdItem, endDate: e.target.value })}
        type={"date"}
        placeholder={"End Date"}
      />
      <MyInput
        value={UpdItem.priority}
        onChange={e => setUpdItem({ ...UpdItem, priority: e.target.value })}
        type={"text"}
        placeholder={"Priority"}
      />
      <MyInput
        value={UpdItem.fileName}
        disabled="disabled"
        onChange={e => setUpdItem({ ...UpdItem, fileName: e.target.value })}
        type={"text"}
        placeholder={"No file uploaded"}
      />
      <a href={task.fileUrl} target='_blank'>File Link</a>
      <MyInput
        value={task.status}
        onChange={e => setUpdItem({ ...UpdItem, status: e.target.value })}
        type={"text"}
        placeholder={"Status"}
      />
      <MyButton onClick={updTask}>
        {task.taskId && <Link className="createUpdDelBtn" to={`/Tasks/${task.taskId}`} state={{ projectId: task.projectId, task: task }}>Update/Cancel</Link>}
        {!task.taskId && <Link className="createUpdDelBtn" to={`/Projects/${task.projectId}`}>Update/Cancel</Link>}
      </MyButton>
      {/* <MyButton>
        {task.taskId && <Link className="createUpdDelBtn" to={`/Tasks/${task.taskId}`} state={{ projectId: task.projectId, task: task }}>Cancel</Link>}
        {!task.taskId && <Link className="createUpdDelBtn" to={`/Projects/${task.projectId}`}>Cancel</Link>}
      </MyButton> */}
    </form>
  );
};

export default TaskUpdForm;