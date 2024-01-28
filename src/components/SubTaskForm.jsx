import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import localeData from "dayjs/plugin/localeData";
import DateInput from "./UI/DateInput/DateInput";
import CustomSelect from "./UI/CustomSelect/CustomSelect";
import {handleValidation} from "../utils/handleValidation";
dayjs.extend(localeData);

const SubTaskForm = ({modal, setModal, tasks, firebaseQuery, errors, setErrors}) => {
  const [open, setOpen] = useState(false);
  const options  = [
    { value: 'High'},
    { value: 'Medium'},
    { value: 'Low'},
  ];
  const location = useLocation();
  const { projectId } = location.state;
  let { id } = useParams();
  
  const [newTask, setNewTask] = useState({ 
    taskNumber: '', 
    taskName: '', 
    description: '',
    createDate: '',
    workTime: '',
    endDate: '',
    priority: 'Please choose an option',
    status: '',
    isSubtask: true,
    projectId: ''
  });
  // const handleValidation = () => {
  //   const formErrors = {};
  //   let formIsValid = true;

  //   // title
  //   if (!newTask.taskName) {
  //     formIsValid = false;
  //     formErrors.taskName = "Cannot be empty";
  //   }
  //   if (newTask.taskName.length > 30) {
  //     formIsValid = false;
  //     formErrors.taskName = "Cannot be more 30 characters";
  //   }
  //   // description
  //   if (!newTask.description) {
  //     formIsValid = false;
  //     formErrors.description = "Cannot be empty";
  //   }
  //   if (newTask.description.length > 50) {
  //     formIsValid = false;
  //     formErrors.description = "Cannot be more 50 characters";
  //   }
  //   // createDate
  //   if (!newTask.createDate) {
  //     formIsValid = false;
  //     formErrors.createDate = "Cannot be empty";
  //   } else if (newTask.createDate.length < 10) {
  //     formIsValid = false;
  //     formErrors.createDate = "Date is not valid";
  //   }
  //   // WorkTime 
  //   if (!newTask.workTime) {
  //     formIsValid = false;
  //     formErrors.workTime = "Cannot be empty";
  //   }
  //   //endDate
  //   if (!newTask.endDate) {
  //     formIsValid = false;
  //     formErrors.endDate = "Cannot be empty";
  //   } else if (newTask.endDate.length < 10) {
  //     formIsValid = false;
  //     formErrors.endDate = "Date is not valid";
  //   }
  //   // priority
  //   if (newTask.priority === 'Please choose an option') {
  //     formIsValid = false;
  //     formErrors.priority = "It's required";
  //   }
  //   setErrors(formErrors)
  //   return formIsValid;
  // };

  const addNewTask = async (e) => {
    e.preventDefault();
    if (handleValidation(newTask, setErrors)) {
      let lastNumber =  tasks?.length > 0 ? tasks.sort((a, b) => a?.taskNumber > b?.taskNumber ? 1 : -1).slice(-1)[0]?.taskNumber : 0;

    await addDoc(collection(db, 'tasks'), {
        taskNumber: lastNumber + 1,
        taskName: newTask.taskName,
        description: newTask.description,
        createDate: newTask.createDate,
        workTime: newTask.workTime,
        endDate: newTask.endDate,
        priority: newTask.priority,
        status: "Queue",
        isSubtask: true,
        taskId: id,
        projectId: projectId,
      })

      setNewTask({
        taskNumber: '',
        taskName: '',
        description: '',
        createDate: '',
        workTime: '',
        endDate: '',
        priority: '',
      });

      firebaseQuery();
      setModal(false);
    }
  }

  const handleSelectChange = (value) => {
    setNewTask({ ...newTask, priority: value });
    setOpen(false);
  }

  return (
    <>
    <form 
      onSubmit={addNewTask}
      className="taskForm">
      <div className="inputWrap">
        <label className="projectLabel">Title:</label>
        <MyInput
          value={newTask.taskName}
          onChange={e => setNewTask({ ...newTask, taskName: e.target.value })}
          type={"text"}
          placeholder={"Task Name"}
        />
        <span className="error">{errors.taskName}</span>
      </div>

      <div className="inputWrap">
        <label className="projectLabel">Description:</label>
        <MyInput
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          type={"text"}
          placeholder={"Task Description"}
        />
        <span className="error">{errors.description}</span>
      </div>

      <div className="inputWrap">
        <label className="projectLabel">CreateDate:</label>
        <DateInput selectedDate={newTask.createDate} setSelectedDate={v => setNewTask({...newTask, createDate: v})}/>
        <span className="error">{errors.createDate}</span>
      </div>

      <div className="inputWrap">
        <label className="projectLabel">WorkTime:</label>
        <MyInput
          value={newTask.workTime}
          onChange={e => setNewTask({ ...newTask, workTime: e.target.value })}
          type={"number"}
          placeholder={"Task Time"}
        />
        <span className="error">{errors.workTime}</span>
      </div>

      <div className="inputWrap">
        <label className="projectLabel">EndDate:</label>
        <DateInput selectedDate={newTask.endDate} setSelectedDate={v => setNewTask({...newTask, endDate: v})}/>
        <span className="error">{errors.endDate}</span>
      </div>

      <div className="inputWrap">
        <label htmlFor="priority-select" className="projectLabel">Priority:</label>
        <CustomSelect
          options={options}
          priority={newTask.priority || ""}
          onChange={handleSelectChange}
          open={open}
          // handleOpen={() => setOpen(!open)}
          setOpen={setOpen}
        />
        <span className="error">{errors.priority}</span>
      </div>

      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
        <MyButton type="submit">Create</MyButton>
        <MyButton type="button" 
          onClick={() => {
            setModal(false);
            setNewTask({
              taskNumber: '',
              taskName: '',
              description: '',
              createDate: '',
              workTime: '',
              endDate: '',
              priority: '',
              status: '',
              isSubtask: false,
              projectId: ''
            });
            setErrors({});
          }}
        >Cancel</MyButton>
      </div>
    </form>
    </>
  );
};

export default SubTaskForm;