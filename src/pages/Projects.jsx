import React, { useState, useEffect } from "react";
import { query, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ProjectItem from "../components/ProjectItem";
import MyButton from "../components/UI/button/MyButton";
import ProjectForm from "../components/ProjectForm";
import MyModal from "../components/UI/modal/MyModal";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

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
    await deleteDoc(doc(db, 'projects', project.id));
    console.log("DELETED project", project);
    // let projectId = project.id;
  
    // await deleteDoc(db, 'tasks', project.id)
    // console.log("DELETED tasks for project", project);
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
          <ProjectForm/>
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