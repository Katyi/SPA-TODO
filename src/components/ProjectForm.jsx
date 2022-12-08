import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const ProjectForm = ({handleClose}) => {
  const [newProject, setNewProject] = useState({ projectNumber: '', projectName: '', description: '' });
  const addNewProject = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'projects'), {
      projectNumber: newProject.projectNumber,
      projectName: newProject.projectName,
      description: newProject.description
    })
    setNewProject({ projectNumber: '', projectName: '', description: '' });
    // handleClose();
    window.location.reload();
}

    return (
      <form>
        <MyInput
          value={newProject.projectNumber}
          onChange={e => setNewProject({ ...newProject, projectNumber: e.target.value })}
          type={"number"}
          placeholder={"Номер проекта"}
        />
        <MyInput
          value={newProject.projectName}
          onChange={e => setNewProject({ ...newProject, projectName: e.target.value })}
          type={"text"}
          placeholder={"Название проекта"}
        />
        <MyInput
          value={newProject.description}
          onChange={e => setNewProject({ ...newProject, description: e.target.value })}
          type={"text"}
          placeholder={"Описание проекта"}
        />
        <MyButton onClick={addNewProject}>Create Project</MyButton>
      </form>
    );
};

export default ProjectForm;