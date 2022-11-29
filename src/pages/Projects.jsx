import React, { useState, useEffect } from "react";
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import ProjectItem from "../components/ProjectItem";


function Projects() {
  const [projects, setProjects] = useState([]);

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
        <div className='projects'>
          {projects.map((project, index) => (
            <ProjectItem project={project} key={index} num={index + 1} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default Projects;