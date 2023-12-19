import React from 'react';
import classes from './MyNavbar.module.css';
import MyButton from '../button/MyButton';
import { Link, useLocation } from 'react-router-dom';

const MyNavbar = ({title, linkPath, linkLabel, projectName, taskName, ...props}) => {
  const location = useLocation()
  let pathName = location.pathname.split('/')[2];

  return (
    <div {...props} className={classes.header}>
      <div 
        className={classes.title}>{title} {projectName ? `of project: ${projectName}` : ""} {taskName ? `of task: ${taskName}` : ""}
      </div>
      {pathName !== undefined &&
      <MyButton>
        <Link className={classes.link} to={linkPath} state={ {projectName: projectName} }
        >{linkLabel} 
      </Link>
      </MyButton>
      }
    </div>
  )
}

export default MyNavbar;