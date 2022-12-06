import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import ProjectUpdForm from "../components/ProjectUpdForm";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";

const ProjectItem = (props) => {
  let [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  let navigate = useNavigate();
  
  return (
    <div className='project'>
      <div className='project_id'>{props.project.projectNumber}</div>
      <div className='project_name'>{props.project.projectName}</div>
      <div className='project_description'>{props.project.description}</div>
      <div className="project_bts">
        <MyButton onClick={() => navigate(`/projects/${props.project.id}`)} style={{ width: 120 }}>
          Open
        </MyButton>
        <MyButton onClick={() => setModal(true)} style={{ width: 120}}>
          UpDate</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <ProjectUpdForm project={props.project} handleClose={handleClose}/>
        </MyModal>
        <MyButton onClick={() => props.remove(props.project.id)} style={{ width: 120 }}>
          Delete
        </MyButton>
      </div>
    </div>
  );
};


export default ProjectItem;