import React from 'react';
import classes from './MyNavbar.module.css';
import MyButton from '../button/MyButton';
import { useLocation, useNavigate } from 'react-router-dom';

const MyNavbar = ({title, linkPath, linkLabel, projectName, taskName, ...props}) => {
  let navigate = useNavigate();
  const location = useLocation()
  let pathName = location.pathname.split('/')[2];

  return (
    <div {...props} className={classes.header}>
      <div 
        className={classes.title}>{title} {projectName ? `of project: ${projectName}` : ""} {taskName ? `of task: ${taskName}` : ""}
      </div>
      {pathName !== undefined &&
      <MyButton
        className={classes.link}
        onClick={() => {
          navigate(`${linkPath}`, 
          {state: {projectName: projectName}})
        }}
      >
        {linkLabel} 
      </MyButton>
      }
    </div>
  )
}

export default MyNavbar;