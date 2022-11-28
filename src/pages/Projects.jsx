import React, { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import ProjectList from "../components/ProjectList";
import ProjectService from '../components/API/ProjectService';
import Loader from '../components/UI/Loader/Loader';

function Projects() {
  const [projects, setProjects] = useState([]);
  // let [modal, setModal] = useState(false);

  const [fetchProjects, isProjectsLoading, projectError] = useFetching(async () => {
  const response = await ProjectService.getAll();
  console.log("База", response);
  setProjects(response);
  })
  
  useEffect(() => {
    fetchProjects()
  }, []);

  // return (
  //   <div className="App">
  //     {projectError &&
  //       <div className="aboutPage">An error has occurred ${projectError}</div>
  //     }
  // {
  //   isProjectsLoading
  //     ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 250 }}><Loader /></div>
  //     : <ProjectList projects={projects} title="Projects"/>}
  //   </ div>
  //   )  

  
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
          {projects.map((project) => (
            <div className='project'>
              <div className='id'>{project.id}</div>
              <div className='projectName'>{project.title}</div>
              <div className='description'>{project.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Projects;