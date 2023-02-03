import { Link, useNavigate } from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";

export const Navbar = ({projectId}) => {
  const pathName = window.location.pathname;
  let navigate = useNavigate();
  if (pathName === '/Projects' || pathName === '/') {
    return (
      <div className="header_1">
        <div className="header_title">Projects</div>
        <div className='header_of_projects'>
          <div className="header_project_id">№</div>
          <div className='header_project_name'>projects</div>
          <div className='header_project_description'>Description</div>
        </div>
      </div>
    )
  }
  if (pathName.slice(0, 10) === '/Projects/') {
    return (
      <div className="header_2">
        <div className="header_container">
          <div className="header_title">Tasks</div>
          <div className="header__link">
            <MyButton>
              <Link className="createUpdDelBtn" to="/Projects">Back To Projects</Link>
            </MyButton>
          </div>
        </div>
        <div className='header_of_tasks'>
          <div className="header_Queue">Tasks In Queue</div>
          <div className='header_Development'>Tasks In Development</div>
          <div className='header_Done'>Tasks Completed</div>
        </div>
      </div>
    )
  }
  if (pathName.slice(0, 6) === '/Tasks') {
    return (
      <div className="header_2">
      <div className="header_container">
        <div className="header_title">SubTasks</div>
        <div className="header__link">
          <MyButton onClick={() => navigate(`/Projects/${projectId}`)} style={{ marginRight: 30, width: 200 }}>Back To Tasks</MyButton>
        </div>
      </div>
      <div className='header_of_tasks'>
        <div className="header_Queue">SubTasks In Queue</div>
        <div className='header_Development'>SubTasks In Development</div>
        <div className='header_Done'>SubTasks Completed</div>
      </div>
    </div>
    )
  }
  if (pathName.slice(0, 9) === '/Comments') {
    return (
      <div className="header_3">
        <div className="header_container">
          <div className="header_title">Task Comments</div>
          <div className="header__link">
            <MyButton>
              <Link className="createUpdDelBtn" to={`/Projects/${projectId}`}>Back To Tasks</Link>
            </MyButton>
          </div>
        </div>
      </div>
    )
  }
};