import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import SubTaskColumn from "../components/SubTaskColumn";
import { Navbar } from "../components/Navbar";

function SubTasks() {
  const location = useLocation();
  const { projectId } = location.state;
  const [queueTasks, setQueueTasks] = useState([]);
  const [developmentTasks, setDevelopmentTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [taskForSearch, setTaskForSearch] = useState('');
  const [taskForSearch1, setTaskForSearch1] = useState('');
  let { id } = useParams();

  // -----Параметры для отображения подзадач в трех столбцах на странице задач------------------------------------------------------------------
  async function firebaseQuery() {
    const q1 = query(collection(db, 'tasks'), where("status", "==", "Queue"), where("isSubtask", "==", true), where('taskId','==', id));
    const q2 = query(collection(db, 'tasks'), where("status", "==", "Development"), where("isSubtask", "==", true), where('taskId','==', id));
    const q3 = query(collection(db, 'tasks'), where("status", "==", "Done"), where("isSubtask", "==", true), where('taskId','==', id));
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
      setQueueTasks(searchResult1);
      setDevelopmentTasks(searchResult2);
      setDoneTasks(searchResult3);
    }
  }

  useEffect(() => {
    firebaseQuery();
  }, []);

  let navigate = useNavigate();

  return (
    <div className="App">
      <div className="wrapper">
        <Navbar projectId={projectId}/>
        <div className="container_main">
          <MyButton>
            <Link className="createUpdDelBtn" to="/CreateSubTask" state={{ taskId: id, projectId: projectId }} style={{marginLeft: 0, width: 120 }}>
              Create SubTask
            </Link>
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
            <div className="MyInput2">
              <MyButton onClick={() => {firebaseQuery()}} style={{marginLeft: 0, width: 120 }}>
                <Link className="createUpdDelBtn" to={`/Tasks/${id}`} state={{taskId: id, projectId: projectId}}>Cancel</Link>
              </MyButton>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="header_Queue_mobile">SubTasks In Queue</div>
          <SubTaskColumn name="Queue" tasks={queueTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
          <div className="header_Development_mobile">SubTasks In Development</div>
          <SubTaskColumn name="Development" tasks={developmentTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
          <div className="header_Done_mobile">SubTasks Completed</div>
          <SubTaskColumn name="Done" tasks={doneTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
        </div>
      </div>
    </div>
  )
};

export default SubTasks;