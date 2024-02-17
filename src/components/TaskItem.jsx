import { useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import { useNavigate } from 'react-router-dom';
import Tooltip from "./UI/tooltip/Tooltip";

const TaskItem = (props) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  }

  const onHover = (e) => {
    setShow(true);
  };

  return (
    <div className='task' 
      draggable onDragStart={(e) => onDragStart(e, props.task.id)} 
      onMouseOver={onHover} 
      onMouseOut={() => setShow(false)} 
      onMouseDown={() => setShow(false)}
    >
      {show && <Tooltip setShow={setShow}/>}
      <div className='taskNumber'>{props.task.taskNumber}</div>
      <div className='taskName'>{props.task.taskName}</div>
      <div className="blockInTask">
        <MyButton style={{ width: "47%", backGround: "red" }}
          onClick={() => {
            props.setModal(true);
            props.setCurrentTask(props.task)
          }}
        >
          Open/Update
        </MyButton>
        <MyButton onClick={() => props.remove(props.task)} style={{ width: "47%" }}>
          Delete
        </MyButton>
      </div>
      <div className="blockInTask">
        {!props.task.isSubtask &&
          <MyButton
            style={{ width: '47%' }}
            className="createUpdDelBtn"
            onClick={() => {
              navigate(`/Tasks/${props.task.id}`,
                { state: { projectId: props.task.projectId, taskName: props.task.taskName } })
            }}
          >
            SubTasks
          </MyButton>
        }
        {!props.task.isSubtask &&
          <MyButton
            style={{ width: "47%" }}
            className="createUpdDelBtn"
            onClick={() => {
              navigate(`/Comments/${props.task.id}`,
                { state: { projectId: props.task.projectId } })
            }}
          >
            Comments
          </MyButton>
        }
      </div>
      <img src={`${props.task.fileUrl}`} alt="" className="fileUrl" />
    </div>
  );
};

export default TaskItem;