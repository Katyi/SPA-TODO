import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const ProjectForm = () => {
  const [project, setProject] = useState({ projectNumber: '', projectName: '', description: '' });

  const addNewProject = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'projects'), {
      projectNumber: project.projectNumber,
      projectName: project.projectName,
      description: project.description
    })
    window.location.reload();
}

    return (
      <form>
        <MyInput
          value={project.projectNumber}
          onChange={e => setProject({ ...project, projectNumber: e.target.value })}
          type={"number"}
          placeholder={"Номер проекта"}
        />
        <MyInput
          value={project.projectName}
          onChange={e => setProject({ ...project, projectName: e.target.value })}
          type={"text"}
          placeholder={"Название проекта"}
        />
        <MyInput
          value={project.description}
          onChange={e => setProject({ ...project, description: e.target.value })}
          type={"text"}
          placeholder={"Описание проекта"}
        />
        <MyButton onClick={addNewProject}>Create Project</MyButton>
      </form>
    );
};

export default ProjectForm;