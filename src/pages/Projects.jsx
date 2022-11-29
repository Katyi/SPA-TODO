import React, { useState, useEffect } from "react";
// import Loader from '../components/UI/Loader/Loader';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import MyButton from "../components/UI/button/MyButton";
import { useNavigate } from 'react-router-dom';
// import Tasks from "./Tasks";


function Projects() {
  const [projects, setProjects] = useState([]);
  // let [modal, setModal] = useState(false);

  
  useEffect(() => {
    const q = query(collection(db, 'projects'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let projectsArr = [];
      querySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id })
      })
      setProjects(projectsArr)
      console.log(projectsArr);
    })
    return () => unsubscribe()
  }, []);
  


  let navigate = useNavigate();
  return (
    <div className="App">
      <div className="header">
        <div className="pageTitle">Проекты</div>
        <div className='header_of_tasks'>
          <div className="id">№</div>
          <div className='projectName'>Проекты</div>
          <div className='description'>Описание</div>
        </div>
      </div>
      <div className='container'>
        <div className='projects'>
          {projects.map((project, index) => (
            <div className='project' key={index}>
              <div className='id'>{index + 1}</div>
              <div className='projectName'>{project.projectName}</div>
              <div className='description'>{project.description}</div>
              <MyButton onClick={() => navigate(`/projects/${project.id}`)}>Open</MyButton>
            </div>
          ))}
          
        </div>
        
      </div>
    </div>
  )
};

export default Projects;