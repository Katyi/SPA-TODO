import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import ProjectUpdForm from "../components/ProjectUpdForm";
import MyModal1 from "../components/UI/modal/MyModal1";
import MyButton from "../components/UI/button/MyButton";

const ProjectItem = (props) => {
  let [modal1, setModal1] = useState(false);
  const handleClose = () => setModal1(false);
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
        <MyButton onClick={() => setModal1(true)} style={{ width: 120}}>
          UpDate</MyButton>
        <MyModal1 visible={modal1} setVisible={setModal1}>
          <ProjectUpdForm project={props.project} handleClose={handleClose}/>
        </MyModal1>
        <MyButton onClick={() => props.remove(props.project.id)} style={{ width: 120 }}>
          Delete
        </MyButton>
      </div>
    </div>
  );
};


export default ProjectItem;