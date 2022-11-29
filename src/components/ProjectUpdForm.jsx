import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import {  updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const ProjectUpdForm = (project) => {
  console.log(project);
  const [UpdItem, setUpdItem] = useState({ projectName: '', description: '' });
  
  const updateProject = async (project) => {
    console.log(project);
    await updateDoc(doc(db, 'projects', project.id), {
      projectName: project.projectName,
      description: project.description
    })
    console.log("UDATE работает");
  }
  
  const updProject = async (e) => {
    e.preventDefault();
   await  updateProject(project);
    setUpdItem({ projectName: '', description: '' });
  }

  return (
    <form>
      <MyInput
        value={UpdItem.projectName}
        onChange={e => setUpdItem({...UpdItem, projectName: e.target.value})}
        type={"text"}
        placeholder={"Название проекта"}
      />
      <MyInput
        value={UpdItem.description}
        onChange={e => setUpdItem({ ...UpdItem, description: e.target.value })}
        type={"text"}
        placeholder={"Описание проекта"}
      />
      <MyButton onClick={updProject}>Update Project</MyButton>
    </form>
  );
};

export default ProjectUpdForm;