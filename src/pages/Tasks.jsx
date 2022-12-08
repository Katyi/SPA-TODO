import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import TaskForm from "../components/TaskForm";
import MyModalForTask from "../components/UI/modal/MyModalForTask";
import MyInput from "../components/UI/input/MyInput";
import TaskColumn from "../components/TaskColumn";

function Tasks() {
  const [queueTasks, setQueueTasks] = useState([]);
  const [developmentTasks, setDevelopmentTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [taskForSearch, setTaskForSearch] = useState('');
  const [taskForSearch1, setTaskForSearch1] = useState('');
  let [modal, setModal] = useState(false);
  let { id } = useParams();
  const handleClose = () => setModal(false);
  
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
            <div className="header_title">Задачи</div>
            <div className="header__link">
              <MyButton onClick={() => navigate(-1)}>Обратно к проектам</MyButton>
            </div>
          </div>
          <div className='header_of_tasks'>
            <div className="header_Queue">Задачи в очереди</div>
            <div className='header_Development'>Задачи в разработке</div>
            <div className='header_Done'>Задачи завершенные</div>
          </div>
        </div>
        <div className="container_main">
          <MyButton
            style={{ marginLeft: 30, width:150, marginBottom: 5}} onClick={() => setModal(true)}>
            Create new task
          </MyButton>
          <MyModalForTask visible={modal} setVisible={setModal}>
            <TaskForm projectId={id} firebaseQuery={firebaseQuery} handleClose={handleClose} />
          </MyModalForTask>
          <div action="" className="searchTask">
            <MyInput style={{marginLeft: 30, width: 300 }} type={"text"} placeholder={"Поиск задачи по названию"} onChange={handleChange}/>
            <MyInput style={{marginLeft: 30, width: 100 }} type={"number"} placeholder={"Поиск задачи по номеру"} onChange={handleChange1}/>
            <MyButton style={{marginLeft: 30, width: 120}} onClick={()=> {searchTask(queueTasks, developmentTasks, doneTasks)}} >
              Search
            </MyButton>
            <MyButton style={{marginLeft: 30, marginRight: 30, width: 120 }} onClick={()=> {window.location.reload()}} >
              Cancel
            </MyButton>
          </div>
        </div>
        <div className="container">
          <div className="header_Queue_mobile">Задачи в очереди</div>
          <TaskColumn name="Queue" tasks={queueTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} handleClose={handleClose} class='container_1' />
          <div className="header_Development_mobile">Задачи в разработке</div>
          <TaskColumn name="Development" tasks={developmentTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} handleClose={handleClose} class='container_1' />
          <div className="header_Done_mobile">Задачи завершенные</div>
          <TaskColumn name="Done" tasks={doneTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
        </div>
      </div>
    </div>
  )
};

export default Tasks;