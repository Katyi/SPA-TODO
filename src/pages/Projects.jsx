import React, { useState, useEffect } from "react";
import { query, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ProjectItem from "../components/ProjectItem";
import MyButton from "../components/UI/button/MyButton";
import ProjectForm from "../components/ProjectForm";
import MyModal from "../components/UI/modal/MyModal";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import PostFilter from "../components/ProjectFilter";

function Projects() {
  const [projects, setProjects] = useState([]);
  let [modal, setModal] = useState(false);

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
  
  const removeProject = async (project) => {
    await deleteDoc(doc(db, 'projects', project.id))
    console.log("DELETED project", project);
    window.location.reload();
  }

  return (
    <div className="App">
      <div className="header">
        <div className="header_part1">
          <div className="header_title">Проекты</div>
        </div>
        <div className='header_of_tasks'>
          <div className="task_id">№</div>
          <div className='task_projectName'>Проекты</div>
          <div className='task_description'>Описание</div>
        </div>
      </div>
      <div className='container'>
      
        <MyButton style={{ marginTop: 12, marginLeft: 30 }} onClick={() => setModal(true)}>
          Create new project
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <ProjectForm/>
        </MyModal>
        

        <div className='projects'>
        {/* <TransitionGroup> */}
            {projects.map((project, index) =>
            
            (
              // <CSSTransition>
                <ProjectItem remove={removeProject} project={project} key={index} num={index + 1} />
                // </CSSTransition>
          ))}
        {/* </TransitionGroup> */}
          </div>
      </div>
    </div>
  )
};

export default Projects;