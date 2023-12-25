import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc, getDoc} from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import TaskColumn from "../components/TaskColumn";
import MyNavbar from "../components/UI/Navbar/MyNavbar";
import MyModal from "../components/UI/modal/MyModal";
import TaskForm from "../components/TaskForm";

function Tasks() {
  const [queueTasks, setQueueTasks] = useState([]);
  const [developmentTasks, setDevelopmentTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [taskForSearch, setTaskForSearch] = useState('');
  const [taskForSearch1, setTaskForSearch1] = useState('');
  const [project, setProject] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modal2, setModal2] = useState(false);
  let { id } = useParams();
  

  // ------ Get Project Data --------------------------------------------
  const getProject = async(id) => {
    const docRef = doc(db, 'projects', id);
    let docSnap = await getDoc(docRef);
    setProject(docSnap.data());
  }

  // ----- Get Tasks Data For 3 columns on the page ---------------------
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
    const storage = getStorage();
    // deleting subtasks for task by taskId
    const q = query(collection(db, 'tasks'), where('taskId', '==', taskId));
    let tasksArr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tasksArr.push({ ...doc.data(), id: doc.id })
    })
    tasksArr.forEach(async (task) => {
      if (task.fileName) {
        const imgRef = ref(storage, `files/${task?.fileName}`);
        await deleteObject(imgRef).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      } 
      await deleteDoc(doc(db, 'tasks', task.id));
    })
    // deleting comments for task by taskId
    const q1 = query(collection(db, 'comments'), where('taskId', '==', taskId));
    let tasksArr1 = [];
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
        tasksArr1.push({ ...doc.data(), id: doc.id })
    })
    tasksArr1.forEach(async (comment) => {
      await deleteDoc(doc(db, 'comments', comment.id));
    })
    // delete image for task 
    const q2 = query(collection(db, 'tasks'), where('projectId', '==', id));
    let tasksArr2 = [];
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      tasksArr2.push({ ...doc.data(), id: doc.id })
    })
    tasksArr2.forEach(async (task) => {
      if (task.fileName) {
        const imgRef1 = ref(storage, `files/${task.fileName}`);
        await deleteObject(imgRef1).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      }
    })
    // delete task by id
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
    } else if (taskForSearch1 !== '') {
      let searchResult1 = await queueTasks.filter((elem) => elem.taskNumber === +taskForSearch1);
      let searchResult2 = await developmentTasks.filter((elem) => elem.taskNumber === +taskForSearch1);
      let searchResult3 = await doneTasks.filter((elem) => elem.taskNumber === +taskForSearch1);

      setQueueTasks(()=>[...searchResult1]);
      setDevelopmentTasks(()=>[...searchResult2]);
      setDoneTasks(()=>[...searchResult3]);
    }
  }

  useEffect(() => {
    firebaseQuery();
  }, []);

  useEffect(() => {
    getProject(id);
  },[])

  return (
    <div className="App">
      <div className="wrapper">
        <MyNavbar title={'Tasks'} linkPath={'/Projects'} linkLabel={'Back To Projects'} projectName={project.projectName}/>
        <div className="container_main">
          <MyButton onClick={() => setModal2(true)}>
            Create Task 
          </MyButton>

          {/* SEARCH PART */}
          <div action="" className="searchTask">
            <MyInput style={{ marginLeft: 0, width: 300}} type={"text"} placeholder={"Search by name"} onChange={handleChange} />
            <div className="MyInput1">
              <MyInput style={{ marginLeft: 0, width: 200}} type={"number"} placeholder={"Search by number"} onChange={handleChange1} />
            </div>
            <div className="MyInput2">
              <MyButton style={{marginLeft: 0, width: 120}} onClick={()=> {searchTask(queueTasks, developmentTasks, doneTasks)}} >
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
        {/* TABLE HEADERS */}
        <div className="container">
          <div className="header_of_tasks">Tasks In Queue</div>
          <div className="header_of_tasks">Tasks In Development</div>
          <div className="header_of_tasks">Tasks Completed</div>
        </div>
        {/* TABLE BODY */}
        <div className="container">
          <div className="header_Queue_mobile">Tasks In Queue</div>
          <TaskColumn name="Queue" tasks={queueTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
          <div className="header_Development_mobile">Tasks In Development</div>
          <TaskColumn name="Development" tasks={developmentTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
          <div className="header_Done_mobile">Tasks Completed</div>
          <TaskColumn name="Done" tasks={doneTasks} removeTask={removeTask} firebaseQuery={firebaseQuery} class='container_1' />
        </div>

        {/* MODAL FOR CREATE TASK */}
        <MyModal visible={modal2} setVisible={setModal2}>
          <TaskForm 
            modal={modal2} 
            setModal={setModal2} 
            tasks={queueTasks.concat(developmentTasks).concat(doneTasks)} 
            setTasks={setTasks}
            firebaseQuery={firebaseQuery}
          />
        </MyModal>
      </div>
    </div>
  )
};

export default Tasks;