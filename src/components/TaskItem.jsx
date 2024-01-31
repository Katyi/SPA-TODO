import MyButton from "../components/UI/button/MyButton";
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';

const TaskItem = (props) => {
  let navigate = useNavigate();
  
  // DRAG-N-DROP                                                                                                                      
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: props.task,
    collect: (monitor) => ({
      // opacity: monitor.isDragging() ? 0 : 1,
      isDragging: !!monitor.getItem()
    }),
  });

  return (
    <div className='task' ref={drag} style={{ opacity: isDragging ? 0.7 : 1 }}>
      {<span className="tooltip-text" id="top" style={{ opacity: isDragging ? 0 : 1 }}>You can drag</span>}
      <div className='taskNumber'>{props.task.taskNumber}</div>
      <div className='taskName'>{props.task.taskName}</div>
      {isDragging}
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