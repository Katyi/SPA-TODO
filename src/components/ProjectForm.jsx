import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const [projectNums, setProjectNums] = useState ();
  const projectRef = collection(db, 'projects');
  const getProjects = async () => {
    const data = await getDocs(projectRef);
    setProjectNums(data.docs.map((doc)=> (doc.data().projectNumber)));
  };
  getProjects();
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({ projectNumber: '', projectName: '', description: '' });

  const addNewProject = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'projects'), {
      projectNumber: projectNums.length + 1,
      projectName: newProject.projectName,
      description: newProject.description
    })
    setNewProject({ projectNumber: '', projectName: '', description: '' });
    navigate("/Projects");
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
      <MyButton onClick={addNewProject}>Create Project</MyButton>
      <MyButton onClick={()=> navigate("/Projects")}>Cancel</MyButton>
    </form>
  );
};

export default ProjectForm;