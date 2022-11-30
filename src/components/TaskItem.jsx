import React, {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import TaskUpdForm from "./TaskUpdForm";
import MyModalForTask from "./UI/modal/MymodalForTask";
// import MyModal from "./UI/modal/MymodalForTask";

const TaskItem = (props) => {
  let [modal, setModal] = useState(false);

  return (
    <div className='task'>
      <div className='id'>{props.num}</div>
      <div className='taskName'>{props.task.taskName}</div>
      {/* <div className="btn2"> */}
        <MyButton onClick={() => setModal(true)}>Open/Update</MyButton>
        <MyModalForTask visible={modal} setVisible={setModal}>
        <TaskUpdForm task={props.task}/>
        </MyModalForTask>
      {/* </div> */}
      <MyButton onClick={() => props.remove(props.task)}>Delete</MyButton>
    </div>
  );
};

export default TaskItem;