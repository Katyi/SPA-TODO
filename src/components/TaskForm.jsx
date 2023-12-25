import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, useParams } from "react-router-dom";

const TaskForm = ({modal, setModal, tasks, setTasks, firebaseQuery}) => {
  // const location = useLocation();
  // const { projectId } = location.state;
  let { id } = useParams();
  
  const [newTask, setNewTask] = useState({ 
    taskNumber: '', 
    taskName: '', 
    description: '',
    createDate: '',
    workTime: '',
    endDate: '',
    priority: '',
    status: '',
    isSubtask: false,
    projectId: ''
  });
  
  const addNewTask = async (e) => {
    e.preventDefault();
    let lastNumber =  tasks?.length > 0 ? tasks.sort((a, b) => a?.taskNumber > b?.taskNumber ? 1 : -1).slice(-1)[0]?.taskNumber : 0;

    await addDoc(collection(db, 'tasks'), {
      taskNumber: lastNumber + 1,
      taskName: newTask.taskName, 
      description: newTask.description,
      createDate: newTask.createDate,
      workTime: newTask.workTime,
      endDate: newTask.endDate,
      priority: newTask.priority,
      status: 'Queue',
      isSubtask: false,
      projectId: id,
    })

    setNewTask({
      taskNumber: '',
      taskName: '',
      description: '',
      createDate: '',
      workTime: '',
      endDate: '',
      priority: '',
      status: ''
    });
    firebaseQuery();
    setModal(false);
  }

  return (
    <form 
      onSubmit={addNewTask}
      style={{display:"flex", flexDirection:"column", gap:"40px", paddingTop:"20px"}}
    >
      <MyInput
        value={newTask.taskName}
        onChange={e => setNewTask({ ...newTask, taskName: e.target.value })}
        type={"text"}
        placeholder={"Task Name"}
      />
      <MyInput
        value={newTask.description}
        onChange={e => setNewTask({ ...newTask, description: e.target.value })}
        type={"text"}
        placeholder={"Task Description"}
      />
      <MyInput
        value={newTask.createDate}
        onChange={e => setNewTask({ ...newTask, createDate: e.target.value })}
        type={"date"}
        placeholder={"Create Date"}
      />
      <MyInput
        value={newTask.workTime}
        onChange={e => setNewTask({ ...newTask, workTime: e.target.value })}
        type={"number"}
        placeholder={"Task Time"}
      />
      <MyInput
        value={newTask.endDate}
        onChange={e => setNewTask({ ...newTask, endDate: e.target.value })}
        type={"date"}
        placeholder={"End Date"}
      />
      {/* <MyInput
        value={newTask.priority}
        onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
        type={"text"}
        placeholder={"Priority"}
        // required
      /> */}
      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
        <MyButton type="submit">Create</MyButton>
        <MyButton type="button" onClick={()=>setModal(false)}>Cancel</MyButton>
      </div>
    </form>
  );
};

export default TaskForm;