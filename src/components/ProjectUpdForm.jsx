import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, useNavigate } from "react-router-dom";

  // -----Редактирование проекта-------------------------------------------------------------------------------------
const ProjectUpdForm = () => {
  const location = useLocation();
  const { project } = location.state;
  const navigate = useNavigate();
  const [UpdItem, setUpdItem] = useState({
    projectNumber: project.projectNumber,
    projectName: project.projectName,
    description: project.description
  });
  
  const updProject = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'projects', project.id), {
      projectNumber: UpdItem.projectNumber,
      projectName: UpdItem.projectName,
      description: UpdItem.description,
    })
    navigate("/Projects");
  }

  return (
    <form>
      <MyInput
        value={UpdItem.projectNumber}
        onChange={e => setUpdItem({ ...UpdItem, projectNumber: e.target.value })}
        type={"number"}
        placeholder={"Project Number"}
      />
      <MyInput
        value={UpdItem.projectName}
        onChange={e => setUpdItem({...UpdItem, projectName: e.target.value})}
        type={"text"}
        placeholder={"Project title"}
      />
      <MyInput
        value={UpdItem.description}
        onChange={e => setUpdItem({ ...UpdItem, description: e.target.value })}
        type={"text"}
        placeholder={"Project description"}
      />
      <MyButton onClick={updProject}>Update/Cancel</MyButton>
      {/* <MyButton onClick={()=> navigate("/Projects")}>Cancel</MyButton> */}
    </form>
  );
};

export default ProjectUpdForm;