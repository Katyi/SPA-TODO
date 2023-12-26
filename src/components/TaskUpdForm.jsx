import React, { useEffect } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import TaskFile from "./TaskFile";

// -----Просмотр и редактирование задачи в модальном окне-------------------------------------------------------------------------------------
const TaskUpdForm = ({modal, setModal, currentTask, setCurrentTask, firebaseQuery, handleUpload}) => {

  const updTask = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'tasks', currentTask.id), {
      taskNumber: currentTask.taskNumber,
      taskName: currentTask.taskName,
      description: currentTask.description,
      createDate: currentTask.createDate,
      workTime: currentTask.workTime,
      endDate: currentTask.endDate,
      // priority: currentTask.priority,
    });
    setModal(false);
    firebaseQuery();
  }

  useEffect(() => {
    firebaseQuery();
  },[currentTask.fileUrl?.length])

  return (
    <div style={{border: '2px solid #566573', padding: '20px'}}>
      <div style={{width: '48%'}}>
      {!currentTask.fileUrl 
        ? <TaskFile task={currentTask} firebaseQuery={firebaseQuery} setCurrentTask={setCurrentTask}/>
        : <img src={currentTask.fileUrl} alt="" className="fileUrl"/>
      }
      </div>
      <form 
        style={{display:"flex", marginTop: '20px', padding:"0px", width: '700px', flexWrap: "wrap", justifyContent:"space-between", border: "none"}}
        onSubmit={updTask}
      >
        <MyInput
          style={{width: '43%', marginBottom: "20px"}}
          value={currentTask.taskNumber || ""}
          onChange={e => setCurrentTask({...currentTask, taskNumber: e.target.value})}
          type={"number"}
          placeholder={"Task Number"}
        />
        <MyInput
          style={{width: '43%', marginBottom: "20px"}}
          value={currentTask.taskName || ""}
          onChange={e => setCurrentTask({...currentTask, taskName: e.target.value})}
          type={"text"}
          placeholder={"Task Name"}
        />
        <MyInput
          style={{width: '43%', marginBottom: "20px"}}
          value ={currentTask.description || ""}
          onChange={e => setCurrentTask({ ...currentTask, description: e.target.value })}
          type={"text"}
          placeholder={"Task Description"}
        />
        <MyInput
          style={{marginBottom: "20px"}}
          value ={currentTask.createDate || ""}
          onChange={e => setCurrentTask({ ...currentTask, createDate: e.target.value })}
          type={"date"}
          placeholder={"Create Date"}
        />
        <MyInput
          style={{width: '43%', marginBottom: "20px"}}
          value ={currentTask.workTime || ""}
          onChange={e => setCurrentTask({ ...currentTask, workTime: e.target.value })}
          type={"number"}
          placeholder={"Task Time"}
        />
        <MyInput
          style={{marginBottom: "20px"}}
          value ={currentTask.endDate || ""}
          onChange={e => setCurrentTask({ ...currentTask, endDate: e.target.value })}
          type={"date"}
          placeholder={"End Date"}
        />
        <MyInput
          style={{width: '43%', marginBottom: "20px"}}
          value={currentTask.priority || ""}
          onChange={e => setCurrentTask({ ...currentTask, priority: e.target.value })}
          type={"text"}
          placeholder={"Priority"}
        />
        <MyInput
          style={{width: '43%', marginBottom: "20px"}}
          value={currentTask.status}
          onChange={e => setCurrentTask({ ...currentTask, status: e.target.value })}
          type={"text"}
          placeholder={"Status"}
        />
        <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
          <MyButton type="submit">Update</MyButton>
          <MyButton type="button" onClick={()=>setModal(false)}>Cancel</MyButton>
        </div>
      </form>
    </div>
  );
};

export default TaskUpdForm;