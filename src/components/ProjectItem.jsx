import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import ProjectUpdForm from "../components/ProjectUpdForm";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";

const ProjectItem = (props) => {
  let [modal, setModal] = useState(false);

  let navigate = useNavigate();
  return (
    <div className='project'>
      <div className='id'>{props.num}</div>
      <div className='projectName'>{props.project.projectName}</div>
      <div className='description'>{props.project.description}</div>
      <div className="btn1"><MyButton onClick={() => navigate(`/projects/${props.project.id}`)}>Open</MyButton></div>
      <div className="btn2">
        <MyButton onClick={() => setModal(true)}>UpDate</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <ProjectUpdForm project={props.project} />
        </MyModal>
      </div>
      <div className="btn3">
      <MyButton onClick={() => props.remove(props.project)}>Delete</MyButton>
      </div>
    </div>
  );
};


export default ProjectItem;