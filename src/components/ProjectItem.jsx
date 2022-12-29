import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";

const ProjectItem = (props) => {
  let navigate = useNavigate();
  return (
    <div className='project'>
      <div className='project_id'>{props.project.projectNumber}</div>
      <div className='project_name'>{props.project.projectName}</div>
      <div className='project_description'>{props.project.description}</div>
      <div className="project_bts">
        <MyButton onClick={() => navigate(`/Projects/${props.project.id}`)} style={{ width: 120 }}>
          Open
        </MyButton>
        <MyButton>
          <Link className="createUpdDelBtn" to="/UpdateProject" state={{ project: props.project }}> UpDate </Link>
        </MyButton>
        <MyButton onClick={() => props.remove(props.project.id)} style={{ width: 120 }}>
          Delete
        </MyButton>
      </div>
    </div>
  );
};

export default ProjectItem;