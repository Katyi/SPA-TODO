import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import MyModalForTask from "../components/UI/modal/MyModalForTask";
import SubTaskForm from "../components/SubTaskForm";
import MyInput from "../components/UI/input/MyInput";
import SubTaskColumn from "../components/SubTaskColumn";

function SubTasks() {
  const [queueTasks, setQueueTasks] = useState([]);
  const [developmentTasks, setDevelopmentTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  let [modal, setModal] = useState(false);
  const [taskForSearch, setTaskForSearch] = useState('');
  const [taskForSearch1, setTaskForSearch1] = useState('');
  let { id } = useParams();
  const handleClose = () => setModal(false);
  
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
    // firebaseQuery();
    window.location.reload();
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
            <div className="header_title">Подзадачи</div>
            <div className="header__link">
              <MyButton onClick={() => navigate(-1)} style={{marginRight: 30, width: 200 }}>Обратно к задачам</MyButton>
            </div>
          </div>
          <div className='header_of_tasks'>
            <div className="header_Queue">Подзадачи в очереди</div>
            <div className='header_Development'>Подзадачи в разработке</div>
            <div className='header_Done'>Подзадачи завершенные</div>
          </div>
        </div>
        <div className="container_main">
          <MyButton
            style={{ marginLeft: 30, width: 200, marginBottom: 5 }} onClick={() => setModal(true)}>
            Create new subtask
          </MyButton>
          <MyModalForTask visible={modal} setVisible={setModal}>
            <SubTaskForm taskId={id} firebaseQuery={firebaseQuery} handleClose={handleClose}/>
          </MyModalForTask>
            <div action="" className="searchTask">
              <MyInput style={{marginLeft: 30, width: 300 }} type={"text"} placeholder={"Поиск подзадачи"} onChange={handleChange} />
              <MyInput style={{marginLeft: 30, width: 100 }} type={"number"} placeholder={"Поиск подзадачи по номеру"} onChange={handleChange1}/>
              <MyButton style={{marginLeft: 30, width: 120 }} onClick={()=> {searchTask(queueTasks, developmentTasks, doneTasks)}} >
                Search
              </MyButton>
              <MyButton style={{marginLeft: 30, marginRight: 30, width: 120 }} onClick={()=> {window.location.reload()}} >
                Cancel
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