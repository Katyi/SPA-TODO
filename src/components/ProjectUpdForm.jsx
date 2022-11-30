import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const ProjectUpdForm = ( {project} ) => {
  const [UpdItem, setUpdItem] = useState({ projectName: '', description: '' });
  
  const updProject = async (e) => {
    e.preventDefault();
    console.log("Меняем проект ", project.id);
    await updateDoc(doc(db, 'projects', project.id), {
      projectName: UpdItem.projectName,
      description: UpdItem.description,
    })
    setUpdItem({ projectName: '', description: '' });
    // console.log("UDATE работает");
    window.location.reload();
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