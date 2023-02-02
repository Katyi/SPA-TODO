import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import TaskColumn from "../components/TaskColumn";
import { Navbar } from "../components/Navbar";

// export const mainContext = React.createContext("");

function Tasks() {
  const [queueTasks, setQueueTasks] = useState([]);
  const [developmentTasks, setDevelopmentTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [taskForSearch, setTaskForSearch] = useState('');
  const [taskForSearch1, setTaskForSearch1] = useState('');
  let { id } = useParams();
  
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

  const removeTask = async (taskId) => {
    const q = query(collection(db, 'tasks'), where('taskId', '==', taskId));
    let tasksArr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tasksArr.push({ ...doc.data(), id: doc.id })
    })
    tasksArr.forEach(async (task) => {
      await deleteDoc(doc(db, 'tasks', task.id));
    })

    const q1 = query(collection(db, 'comments'), where('taskId', '==', taskId));
    let tasksArr1 = [];
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
        tasksArr1.push({ ...doc.data(), id: doc.id })
    })
    tasksArr1.forEach(async (comment) => {
      await deleteDoc(doc(db, 'comments', comment.id));
    })

    await deleteDoc(doc(db, 'tasks', taskId));
    firebaseQuery();
  }

  const handleChange = (e) => {
    setTaskForSearch(e.target.value);
  };
  const handleChange1 = (e) => {
    setTaskForSearch1(e.target.value);
  };

  const searchTask = async (queueTasks, developmentTasks, doneTasks) => {
    if (taskForSearch!=='') {
      let searchResult1 = await queueTasks.filter((elem) => elem.taskName.includes(taskForSearch));
      let searchResult2 = await developmentTasks.filter((elem) => elem.taskName.includes(taskForSearch));
      let searchResult3 = await doneTasks.filter((elem) => elem.taskName.includes(taskForSearch));
      setQueueTasks(searchResult1);
      setDevelopmentTasks(searchResult2);
      setDoneTasks(searchResult3);
    } else {
      let searchResult1 = await queueTasks.filter((elem) => elem.taskNumber.includes(taskForSearch1));
      let searchResult2 = await developmentTasks.filter((elem) => elem.taskNumber.includes(taskForSearch1));
      let searchResult3 = await doneTasks.filter((elem) => elem.taskNumber.includes(taskForSearch1));

      setQueueTasks(()=>[...searchResult1]);
      setDevelopmentTasks(()=>[...searchResult2]);
      setDoneTasks(()=>[...searchResult3]);
    }
  }

  useEffect(() => {
    firebaseQuery();
  }, []);

  return (
    
    <div className="App">
      <div className="wrapper">
        <Navbar/>
        <div className="container_main">
          <MyButton>
            <Link className="createUpdDelBtn" to="/CreateTask" state={{ projectId: id}}> Create Task </Link>
          </MyButton>
          <div action="" className="searchTask">
            <MyInput style={{ marginLeft: 0, width: 300, marginTop: 0}} type={"text"} placeholder={"Search by name"} onChange={handleChange} />
            <div className="MyInput1">
              <MyInput style={{ marginLeft: 0, width: 100, marginTop: 0}} type={"number"} placeholder={"Search by number"} onChange={handleChange1} />
            </div>
            <div className="MyInput2">
              <MyButton style={{marginLeft: 0, width: 120, marginBottom: 5}} onClick={()=> {searchTask(queueTasks, developmentTasks, doneTasks)}} >
                Search
              </MyButton>
            </div>
            <div className="MyInput3">
              <MyButton style={{marginLeft: 0, width: 120}} onClick={() => {firebaseQuery()}}>
                <Link className="createUpdDelBtn" to={`/Projects/${id}`} state={{projectId: id}}>Cancel</Link>
              </MyButton>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="header_Queue_mobile">Tasks In Queue</div>
          <TaskColumn name="Queue" tasks={queueTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
          <div className="header_Development_mobile">Tasks In Development</div>
          <TaskColumn name="Development" tasks={developmentTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
          <div className="header_Done_mobile">Tasks Completed</div>
          <TaskColumn name="Done" tasks={doneTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} queueTasks={queueTasks} class='container_1' />
        </div>
      </div>
    </div>
  )
};

export default Tasks;