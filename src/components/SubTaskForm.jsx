import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, useNavigate } from "react-router-dom";

const SubTaskForm = () => {
  const location = useLocation();
  const { taskId, projectId } = location.state;
  const navigate = useNavigate();
  const [subTaskNums, setSubTaskNums] = useState ();
  const taskRef = query(collection(db, 'tasks'), where("taskId", "==", taskId), where('isSubtask', '==', true));
  const getTasks = async () => {
    const data = await getDocs(taskRef);
    setSubTaskNums(data.docs.map((doc)=> (doc.data().taskNumber)));
  };
  getTasks();
  const [task, setTask] = useState({
    taskNumber: '',
    taskName: '',
    description: '',
    createDate: '',
    workTime: '',
    endDate: '',
    priority: '',
  });
  
  const addNewTask = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'tasks'), {
      taskNumber: subTaskNums.length + 1,
      taskName: task.taskName,
      description: task.description,
      createDate: task.createDate,
      workTime: task.workTime,
      endDate: task.endDate,
      priority: task.priority,
      status: "Queue",
      isSubtask: true,
      taskId: taskId,
      projectId: projectId,
    })
    setTask({
      taskNumber: '',
      taskName: '',
      description: '',
      createDate: '',
      workTime: '',
      endDate: '',
      priority: '',
    });
    navigate(-1);
}

  return (
    <form>
      <MyInput
        value={task.taskName}
        onChange={e => setTask({ ...task, taskName: e.target.value })}
        type={"text"}
        placeholder={"SubTask Name"}
      />
      <MyInput
        value={task.description}
        onChange={e => setTask({ ...task, description: e.target.value })}
        type={"text"}
        placeholder={"Task Description"}
      />
      <MyInput
        value={task.createDate}
        onChange={e => setTask({ ...task, createDate: e.target.value })}
        type={"date"}
        placeholder={"Create Date"}
      />
      <MyInput
        value={task.workTime}
        onChange={e => setTask({ ...task, workTime: e.target.value })}
        type={"number"}
        placeholder={"SubTask Time"}
      />
      <MyInput
        value={task.endDate}
        onChange={e => setTask({ ...task, endDate: e.target.value })}
        type={"date"}
        placeholder={"End Date"}
      />
      <MyInput
        value={task.priority}
        onChange={e => setTask({ ...task, priority: e.target.value })}
        type={"text"}
        placeholder={"Priority"}
      />
      <MyButton onClick={addNewTask}>Create SubTask</MyButton>
      <MyButton onClick={()=> navigate(-1)}>Cancel</MyButton>
    </form>
  );
};

export default SubTaskForm;