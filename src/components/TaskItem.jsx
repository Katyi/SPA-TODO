import React, { useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import TaskFile from "./TaskFile";

const TaskItem = (props) => {
  const [inDrag, setInDrag] = useState(false);

  const handleDrag = () => {
    setInDrag(!inDrag);
  }

  // DRAG-N-DROP                                                                                                                      
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: props.task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  )

  return (
    <div className='task' ref={drag} style={{opacity: isDragging ? 0.5 : 1}}>
      <div className='taskNumber'>{props.task.taskNumber}</div>
      <div className='taskName'>{props.task.taskName}</div>
      {isDragging}
      <div className="blockInTask">
        <MyButton style={{width: "47%", backGround: "red"}}
          onClick={() => {
            props.setModal(true);
            props.setCurrentTask(props.task)
          }}
        >
          Open/Update
        </MyButton>
        <MyButton onClick={() => props.remove(props.task)} style={{ width: "47%"}}>
          Delete
        </MyButton>
      </div>
      <div className="blockInTask">
        {!props.task.isSubtask && 
          <Link className="createUpdDelBtn" style={{width:"47%"}} to={`/Tasks/${props.task.id}`} state={{ projectId: props.task.projectId, taskName: props.task.taskName }}>
            <MyButton style={{ width: '100%'}}>
              SubTasks
            </MyButton>
          </Link>}
        {!props.task.isSubtask && 
          <Link className="createUpdDelBtn" style={{width:"47%"}} to={`/Comments/${props.task.id}`} state={{ projectId: props.task.projectId }}>
            <MyButton style={{ width: "100%"}}>
            Comments
            </MyButton>
          </Link>}
      </div>
      {!props.task.fileUrl 
        ? <TaskFile task={props.task} firebaseQuery={props.firebaseQuery} setCurrentTask={props.setCurrentTask}/>
        : <img src={`${props.task.fileUrl}`} alt="" className="fileUrl"/>
      }
    </div>
  );
};

export default TaskItem;