import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ projects, title }) => {
  // console.log("Переданный проект ", projects.length);
  if (!projects.length) {
    return (
      <div className="aboutPage">
        Postcard albums not found!
      </div>
    )
  }
  return (
    <div>
      <div className="pageTitle">
        {title}
        </div>
      <TransitionGroup>
        {projects.map((project, index) =>
          <CSSTransition
            key={project.id}
            timeout={500}
            classNames="project">
            <ProjectItem number={index + 1} project={project}/>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  )
};

export default ProjectList;