import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({ projectNumber: '', projectName: '', description: '' });
  const addNewProject = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'projects'), {
      projectNumber: Number(newProject.projectNumber),
      projectName: newProject.projectName,
      description: newProject.description
    })
    setNewProject({ projectNumber: '', projectName: '', description: '' });
    navigate("/Projects");
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
          onChange={e => setNewProject({...newProject, projectName: e.target.value })}
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
        <MyButton onClick={()=> navigate("/Projects")}>Cancel</MyButton>
      </form>
    );
};

export default ProjectForm;