import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from "react";

// -----Редактирование проекта-------------------------------------------------------------------------------------
const ProjectUpdForm = ({modal, setModal, currentProject, setCurrentProject, getAllProjects}) => {
  
  const updProject = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'projects', currentProject.id), {
      projectNumber: currentProject.projectNumber,
      projectName: currentProject.projectName,
      description: currentProject.description,
    })

    getAllProjects();
    setModal(false);
  }

  return (
    <form onSubmit={updProject} style={{display:"flex", flexDirection:"column", gap:"40px", paddingTop:"20px"}}>
      <MyInput
        value={currentProject.projectNumber || ""}
        onChange={e => setCurrentProject({ ...currentProject, projectNumber: e.target.value })}
        type={"number"}
        placeholder={"Project Number"}
      />
      <MyInput
        value={currentProject.projectName || ""}
        onChange={e => setCurrentProject({...currentProject, projectName: e.target.value})}
        type={"text"}
        placeholder={"Project title"}
      />
      <MyInput
        value={currentProject.description || ""}
        onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
        type={"text"}
        placeholder={"Project description"}
      />
      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
        <MyButton type="submit" >Update</MyButton>
        <MyButton type="button" onClick={()=>setModal(false)}>Cancel</MyButton>
      </div>
    </form>
  );
};

export default ProjectUpdForm;