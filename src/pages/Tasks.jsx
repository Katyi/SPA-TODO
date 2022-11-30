import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import TaskItem from "../components/TaskItem";

function Tasks() {
  const [queueTasks, setQueueTasks] = useState([]);
  const [developmentTasks, setDevelopmentTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  let {id} = useParams();

  async function firebaseQuery() {
    const q1 = query(collection(db, 'tasks'), where("status", "==", "Queue"), where("isSubtask", "==", false), where('projectId','==', id));
    const q2 = query(collection(db, 'tasks'), where("status", "==", "Development"), where("isSubtask", "==", false), where('projectId','==', id));
    const q3 = query(collection(db, 'tasks'), where("status", "==", "Done"), where("isSubtask", "==", false), where('projectId','==', id));
    let tasksArr1 = [];
    let tasksArr2 = [];
    let tasksArr3 = [];
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    const querySnapshot3 = await getDocs(q3);
    querySnapshot1.forEach((doc) => {
      tasksArr1.push({ ...doc.data(), id: doc.id })
    })
    querySnapshot2.forEach((doc) => {
      tasksArr2.push({ ...doc.data(), id: doc.id })
    })
    querySnapshot3.forEach((doc) => {
      tasksArr3.push({ ...doc.data(), id: doc.id })
    })
    setQueueTasks(tasksArr1)
    setDevelopmentTasks(tasksArr2)
    setDoneTasks(tasksArr3)
  }

  const removeTask = async (task) => {
    await deleteDoc(doc(db, 'tasks', task.id))
    console.log("DELETED TASK", task);
    window.location.reload();
  }

  useEffect(() => {
    firebaseQuery();
  }, []);


  return (
    <div className="App">
      <div className="header">
        <div className="header_part1">
        <div className="header_title">Задачи</div>
          <div className="header__link">
            <Link to="/projects">Обратно к проектам</Link>
          </div>
        </div>
        <div className='header_of_tasks'>
          <div className="Queue">Задачи в очереди</div>
          <div className='Development'>Задачи в разработке</div>
          <div className='Done'>Задачи завершенные</div>
        </div>
      </div>
      <div className='container1'>
        <div className='tasks'>
          {queueTasks.map((task, index) => (
            <TaskItem remove={removeTask} task={task} key={index} num={index + 1}/>
            ))}
        </div>
      </div>
      <div className='container2'>
        <div className='tasks'>
          {developmentTasks.map((task, index) => (
            <TaskItem remove={removeTask} task={task} key={index} num={index + 1}/>
            ))}
        </div>
      </div>
      <div className='container3'>
        <div className='tasks'>
          {doneTasks.map((task, index) => (
            <TaskItem remove={removeTask} task={task} key={index} num={index + 1}/>
            ))}
        </div>
      </div>
    </div>
  )
};

export default Tasks;