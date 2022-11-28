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

  return (
    <div className="App">
      {projectError &&
        <div className="aboutPage">An error has occurred ${projectError}</div>
      }
  {
    isProjectsLoading
      ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 250 }}><Loader /></div>
      : <ProjectList projects={projects} title="Projects"/>}
    </ div>
    )  
};


export default Projects;