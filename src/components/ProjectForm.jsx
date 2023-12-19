import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const ProjectForm = ({modal, setModal, projects, setProjects, getAllProjects}) => {
  const [newProject, setNewProject] = useState({ projectNumber: '', projectName: '', description: '' });

  const addNewProject = async (e) => {
    e.preventDefault();
    let lastNumber = projects?.sort((a, b) => a.projectNumber > b.projectNumber ? 1 : -1).slice(-1)[0].projectNumber;

    await addDoc(collection(db, 'projects'), {
      projectNumber: lastNumber + 1,
      projectName: newProject.projectName,
      description: newProject.description
    })
    setNewProject({ projectNumber: '', projectName: '', description: '' });
    getAllProjects();
    setProjects(projects);
    setModal(false)
}

  return (
    <form>
      <MyInput
        value={newProject.projectName}
        onChange={e => setNewProject({...newProject, projectName: e.target.value })}
        type={"text"}
        placeholder={"Project title"}
      />
      <MyInput
        value={newProject.description}
        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
        type={"text"}
        placeholder={"Project description"}
      />
      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
      <MyButton onClick={addNewProject}>Create Project</MyButton>

      <MyButton type="button" onClick={()=>setModal(false)}>Cancel</MyButton>
      </div>
    </form>
  );
};

export default ProjectForm;