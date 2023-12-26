import { useNavigate } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";

const ProjectItem = (props) => {
  let navigate = useNavigate();

  return (
    <tr className='project'>
      <td className='project_id'>{props.idx}</td>
      <td className='project_name'>{props.project.projectName}</td>
      <td className='project_description'>{props.project.description}</td>
      <td className="project_bts">
        {/* OPEN PROJECT'S TASKS */}
        <MyButton
          style={{width: 100}} 
          onClick={() => navigate(`/Projects/${props.project.id}`)}
        >
          Open
        </MyButton>
        {/* UPDATE PROJECT */}
        <MyButton className="createUpdDelBtn"
          type="button"
          onClick={() => {
            props.setModal(true);
            props.getProject(props.project);
          }}
        >
          UpDate
        </MyButton>
        {/* DELETE PROJECT */}
        <MyButton onClick={() => {
          props.remove(props.project.id);
          }} style={{ width: 100 }}>
          Delete
        </MyButton>
      </td>
    </tr>
  );
};

export default ProjectItem;