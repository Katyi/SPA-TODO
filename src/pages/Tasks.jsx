import React, { useState, useEffect } from "react";
// import Loader from '../components/UI/Loader/Loader';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import MyButton from "../components/UI/button/MyButton";


function Tasks() {
  const [tasks, setTasks] = useState([]);
  // let [modal, setModal] = useState(false);

  
  useEffect(() => {
    const q = query(collection(db, 'tasks'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArr = [];
      querySnapshot.forEach((doc) => {
        tasksArr.push({ ...doc.data(), id: doc.id })
      })
      setTasks(tasksArr)
      console.log(tasksArr);
    })
    return () => unsubscribe()
  }, []);

  
  return (
    <div className="App">
      <div className="header">
        <div className="pageTitle">Задачи</div>
        <div className='header_of_tasks'>
          <div className="id">№</div>
          <div className='projectName'>Задачи</div>
          <div className='description'>Описание</div>
        </div>
      </div>
      <div className='container'>
        <div className='projects'>
          {tasks.map((task, index) => (
            <div className='project' key={index}>
              <div className='id'>{index + 1}</div>
              <div className='projectName'>{task.nameProject}</div>
              <div className='description'>{task.description}</div>
              <MyButton onClick={() => console.log(`${task.id}`)}>Open</MyButton>
            </div>
          ))}
          
        </div>
        
      </div>
    </div>
  )
};

export default Tasks;