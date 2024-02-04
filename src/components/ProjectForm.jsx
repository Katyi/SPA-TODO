import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const ProjectForm = ({modal, setModal, projects, setProjects, getAllProjects, errors, setErrors, setPage, page, lengthOfPage, limit}) => {
  const [newProject, setNewProject] = useState({ projectNumber: '', projectName: '', description: '' });

  const handleValidation = () => {
    const formErrors = {};
    let formIsValid = true;

    // title
    if(!newProject.projectName){
      formIsValid = false;
      formErrors["projectName"] = "Cannot be empty";
    }
    if(newProject.projectName.length > 30){
      formIsValid = false;
      formErrors.projectName = "Cannot be more 30 characters";
    }
    // description
    if(!newProject.description){
      formIsValid = false;
      formErrors.description = "Cannot be empty";
    }
    if(newProject.description.length > 50){
      formIsValid = false;
      formErrors.description = "Cannot be more 50 characters";
    }

    setErrors(formErrors)
    return formIsValid;
  };

  const addNewProject = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      let lastNumber = projects?.sort((a, b) => a.projectNumber > b.projectNumber ? 1 : -1).slice(-1)[0].projectNumber;

      await addDoc(collection(db, 'projects'), {
        projectNumber: lastNumber + 1,
        projectName: newProject.projectName,
        description: newProject.description
      })
      setNewProject({ projectNumber: '', projectName: '', description: '' });
      getAllProjects();
      setModal(false);
      if (lengthOfPage === limit) {
        setPage(page + 1)
      }
    }
  }

  return (
    <form 
      style={{display:"flex", flexDirection:"column", paddingTop:"20px"}}
      onSubmit={addNewProject}
    >
      <label className="projectLabel">Title:</label>
      <MyInput
        value={newProject.projectName}
        onChange={e => setNewProject({...newProject, projectName: e.target.value })}
        type={"text"}
        placeholder={"Project title"}
      />
      <span className="error">{errors["projectName"]}</span>

      <label className="projectLabel">Description:</label>
      <MyInput
        value={newProject.description}
        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
        type={"text"}
        placeholder={"Project description"}
      />
      <span className="error">{errors.description}</span>

      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
        <MyButton type="submit">Create</MyButton>
        <MyButton type="button" onClick={() => {
          setModal(false);
          setErrors({});
          setNewProject({ projectNumber: '', projectName: '', description: '' });
          }}
        >
          Cancel
        </MyButton>
      </div>
    </form>
  );
};

export default ProjectForm;