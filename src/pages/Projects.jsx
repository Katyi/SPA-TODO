import React, { useState, useEffect } from "react";
import { query, collection, onSnapshot, doc, deleteDoc,getDocs, where  } from 'firebase/firestore';
import { db } from '../firebase';
import ProjectItem from "../components/ProjectItem";
import MyButton from "../components/UI/button/MyButton";
import ProjectForm from "../components/ProjectForm";
import MyModal from "../components/UI/modal/MyModal";

function Projects() {
  const [projects, setProjects] = useState([]);
  let [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);

  useEffect(() => {
    const q = query(collection(db, 'projects'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let projectsArr = [];
      querySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id })
      })
      setProjects(projectsArr)
    })
    return () => unsubscribe()
  }, []);

  const removeProject = async (projectId) => {
    const q = query(collection(db, 'tasks'), where('projectId', '==', projectId));
    let tasksArr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tasksArr.push({ ...doc.data(), id: doc.id })
    })
    tasksArr.forEach(async (task) => {
// --------------------------------------Удаление комментов-проекта------------------------------------------------
      const q2 = query(collection(db, 'comments'), where('taskId', '==', task.id));
      let tasksArr2 = [];
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc) => {
        tasksArr2.push({ ...doc.data(), id: doc.id });
        })
      tasksArr2.forEach(async(comment) => {
        await deleteDoc(doc(db, 'comments', comment.id));
      })
// ------------------------------------  Удаление подзадач проекта------------------------------------------------
      const q1 = query(collection(db, 'tasks'), where('taskId', '==', task.id));
      let tasksArr1 = [];
      const querySnapshot1 = await getDocs(q1);
      querySnapshot1.forEach(async(doc) => {
        tasksArr1.push({ ...doc.data(), id: doc.id })
      })
      tasksArr1.forEach(async (task) => {
        await deleteDoc(doc(db, 'tasks', task.id));
      })
// ------------------------------------Удаление задач проекта ----------------------------------------------------
      await deleteDoc(doc(db, 'tasks', task.id));
    })
// ------------------------------------Удаление проекта----------------------------------------------------------
    await deleteDoc(doc(db, 'projects', projectId));
    window.location.reload();
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header_1">
          <div className="header_title">Проекты</div>
          <div className='header_of_projects'>
            <div className="header_project_id">№</div>
            <div className='header_project_name'>Проекты</div>
            <div className='header_project_description'>Описание</div>
          </div>
        </div>
        <div className='project_container'>
          <div className="project_container_1">
          <MyButton
          // style={{ marginTop: 220, marginBottom: 30, marginTop: 215 }}
          style={{ marginLeft: 30, width: 200, marginBottom: 5}}
          onClick={() => setModal(true)}>
          Create new project
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <ProjectForm handleClose={handleClose}/>
        </MyModal>
          </div>
          <div className='projects'>
            {projects.map((project, index) => (
              <ProjectItem remove={removeProject} project={project} key={index} />
            ))}
            </div>
        </div>
      </div>
    </div>
  )
};

export default Projects;