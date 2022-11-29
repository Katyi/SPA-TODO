import React, {useState} from "react";
// import { useNavigate } from 'react-router-dom';
// import ProjectUpdForm from "../components/ProjectUpdForm";
// import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import ProjectUpdForm from "./ProjectUpdForm";
import MyModalForTask from "./UI/modal/MymodalForTask";

const TaskItem = (props) => {
  let [modal, setModal] = useState(false);

  // let navigate = useNavigate();
  return (
    <div className='task'>
      <div className='id'>{props.num}</div>
      <div className='taskName'>{props.task.taskName}</div>
      {/* <MyButton onClick={() => console.log(`${props.task.id}`)}>Open</MyButton> */}
      {/* <div className="btn2"> */}
        <MyButton onClick={() => setModal(true)}>Open</MyButton>
        <MyModalForTask visible={modal} setVisible={setModal}>
          <ProjectUpdForm project={props.project}/>
        </MyModalForTask>
      {/* </div> */}
    </div>
  
  );
};


export default TaskItem;