import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, useNavigate } from "react-router-dom";

const TaskForm = () => {
  const location = useLocation();
  const { projectId } = location.state;
  const navigate = useNavigate();
  const [taskNums, setTaskNums] = useState ();
  const taskRef = query(collection(db, 'tasks'), where("projectId", "==", projectId), where('isSubtask', '==', false));
  const getTasks = async () => {
    const data = await getDocs(taskRef);
    setTaskNums(data.docs.map((doc)=> (doc.data().taskNumber)));
  };
  getTasks();

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
      taskNumber: taskNums.length + 1,
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
    navigate(`/Projects/${projectId}`);
  }

  return (
    <form>
      <MyInput
        value={newItem.taskName}
        onChange={e => setNewItem({ ...newItem, taskName: e.target.value })}
        type={"text"}
        placeholder={"Task Name"}
      />
      <MyInput
        value={newItem.description}
        onChange={e => setNewItem({ ...newItem, description: e.target.value })}
        type={"text"}
        placeholder={"Task Description"}
      />
      <MyInput
        value={newItem.createDate}
        onChange={e => setNewItem({ ...newItem, createDate: e.target.value })}
        type={"date"}
        placeholder={"Create Date"}
      />
      <MyInput
        value={newItem.workTime}
        onChange={e => setNewItem({ ...newItem, workTime: e.target.value })}
        type={"number"}
        placeholder={"Task Time"}
      />
      <MyInput
        value={newItem.endDate}
        onChange={e => setNewItem({ ...newItem, endDate: e.target.value })}
        type={"date"}
        placeholder={"End Date"}
      />
      <MyInput
        value={newItem.priority}
        onChange={e => setNewItem({ ...newItem, priority: e.target.value })}
        type={"text"}
        placeholder={"Priority"}
        required
      />
      <MyButton onClick={addNewTask}>Create Task</MyButton>
      <MyButton onClick={()=> navigate(`/Projects/${projectId}`)}>Cancel</MyButton>
    </form>
  );
};

export default TaskForm;