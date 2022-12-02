import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
// import TaskItem from "../components/TaskItem";
import MyButton from "../components/UI/button/MyButton";
import TaskForm from "../components/TaskForm";
import MyModalForTask from "../components/UI/modal/MyModalForTask";
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import MyInput from "../components/UI/input/MyInput";
import { async } from "@firebase/util";
// import Loader from "../components/UI/Loader/Loader";
import TaskColumn from "../components/TaskColumn";
//import TaskColumn2 from "../components/TaskColumn2";
//import TaskColumn3 from "../components/TaskColumn3";

function Tasks() {
  const [queueTasks, setQueueTasks] = useState([]);
  const [developmentTasks, setDevelopmentTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [taskForSearch, setTaskForSearch] = useState('');
  let [modal, setModal] = useState(false);
  let { id } = useParams();
  const allowedDropEffect = 'move;'
  const isAlbumsLoading = false;
  
  
  
  // -----Параметры для отображения задач в трех столбцах на странице задач------------------------------------------------------------------
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
  const handleChange = (e) => {
    setTaskForSearch(e.target.value);
  };
  const searchTask = async (queueTasks, developmentTasks, doneTasks) => {
    if (taskForSearch) {

    }
    let searchResult1 = await queueTasks.filter((elem) => elem.taskName.includes(taskForSearch));
    let searchResult2 = await developmentTasks.filter((elem) => elem.taskName.includes(taskForSearch));
    let searchResult3 = await doneTasks.filter((elem) => elem.taskName.includes(taskForSearch));
    setQueueTasks(searchResult1);
    setDevelopmentTasks(searchResult2);
    setDoneTasks(searchResult3);
    // isAlbumsLoading = true;
  }

  useEffect(() => {
    firebaseQuery();
  }, []);

  let navigate = useNavigate();
  return (
    <div className="App">
      <div className="header">
        <div className="header_part1">
        <div className="header_title">Задачи</div>
          <div className="header__link">
            <MyButton onClick={() => navigate(-1)}>Обратно к проектам</MyButton>
          </div>
        </div>
        <div className='header_of_tasks'>
          <div className="Queue">Задачи в очереди</div>
          <div className='Development'>Задачи в разработке</div>
          <div className='Done'>Задачи завершенные</div>
        </div>
      </div>
      <div className="container4">
        <MyButton style={{ marginTop: 12, marginLeft: 30 }} onClick={() => setModal(true)}>
          Create new task
        </MyButton>
        <MyModalForTask visible={modal} setVisible={setModal}>
          <TaskForm projectId={id} />
        </MyModalForTask>
        <div action="" className="searchTask">
          <MyInput type={"text"} placeholder={"Поиск задачи по названию"} onChange={handleChange}/>
          <MyInput type={"number"} placeholder={"Поиск задачи по номеру"} onChange={handleChange}/>
          <MyButton style={{ marginTop: 12, marginLeft: 30 }} onClick={()=> {searchTask(queueTasks, developmentTasks, doneTasks)}} >
            Search
          </MyButton>
          <MyButton style={{ marginTop: 12, marginLeft: 30 }} onClick={()=> {window.location.reload()}} >
            Cancel
          </MyButton>
        </div>
      </div>
      <TaskColumn tasks={queueTasks} removeTask={removeTask} class = 'container1'/>
      <TaskColumn tasks={developmentTasks} removeTask={removeTask} class = 'container2'/>
      <TaskColumn tasks={doneTasks} removeTask={removeTask} class = 'container3'/>
        {/* <div className='container1' ref={drop}>
        <div className='tasks'>
          {queueTasks.map((task, index) => (
            <TaskItem remove={removeTask} task={task} key={index}/>
          ))}
          </div>
        </div>
        <div className='container2' ref={drop}>
          <div className='tasks'>
            {developmentTasks.map((task, index) => (
              <TaskItem remove={removeTask} task={task} key={index}/>
            ))}
          </div>
        </div>
        <div className='container3' ref={drop}>
          <div className='tasks'>
            {doneTasks.map((task, index) => (
              <TaskItem remove={removeTask} task={task} key={index}/>
            ))}
          </div>
        </div> */}
    </div>
  )
};

export default Tasks;