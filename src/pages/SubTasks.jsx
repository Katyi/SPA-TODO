import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import SubTaskColumn from "../components/SubTaskColumn";

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
        <div className="header_2">
          <div className="header_container">
            <div className="header_title">SubTasks</div>
            <div className="header__link">
                <MyButton onClick={() => navigate(`/projects/${projectId}`)} style={{ marginRight: 30, width: 200 }}>Back To Tasks</MyButton>
            </div>
          </div>
          <div className='header_of_tasks'>
            <div className="header_Queue">SubTasks In Queue</div>
            <div className='header_Development'>SubTasks In Development</div>
            <div className='header_Done'>SubTasks Completed</div>
          </div>
        </div>
        <div className="container_main">
          <MyButton>
            <Link className="createUpdDelBtn" to="/CreateSubTask" state={{taskId: id, projectId: projectId}}> Create SubTask </Link>
          </MyButton>
            <div action="" className="searchTask">
              <MyInput style={{marginLeft: 30, width: 300 }} type={"text"} placeholder={"Search by name"} onChange={handleChange} />
              <MyInput style={{marginLeft: 30, width: 100 }} type={"number"} placeholder={"Search by number"} onChange={handleChange1}/>
              <MyButton style={{marginLeft: 30, width: 120 }} onClick={()=> {searchTask(queueTasks, developmentTasks, doneTasks)}} >
                Search
              </MyButton>
            <MyButton onClick={() => {firebaseQuery()}}>
              <Link className="createUpdDelBtn" to={`/Tasks/${id}`} state={{taskId: id, projectId: projectId}}>Cancel</Link>
            </MyButton>
          </div>
        </div>
        <div className="container">
          <div className="header_Queue_mobile">Подзадачи в очереди</div>
          <SubTaskColumn name="Queue" tasks={queueTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
          <div className="header_Development_mobile">Подзадачи в разработке</div>
          <SubTaskColumn name="Development" tasks={developmentTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
          <div className="header_Done_mobile">Подзадачи завершенные</div>
          <SubTaskColumn name="Done" tasks={doneTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
        </div>
      </div>
    </div>
  )
};

export default SubTasks;