import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import TaskFile from "./TaskFile";
import dayjs from 'dayjs';
import localeData from "dayjs/plugin/localeData";
import DateInput from "./UI/DateInput/DateInput";
import CustomSelect from "./UI/CustomSelect/CustomSelect";
import { useState } from "react";
import {handleValidation} from "../utils/handleValidation";
dayjs.extend(localeData);

// -----Просмотр и редактирование задачи в модальном окне-------------------------------------------------------------------------------------
const TaskUpdForm = ({ modal, setModal, currentTask, setCurrentTask, firebaseQuery, handleUpload, errors, setErrors }) => {
  const [open, setOpen] = useState(false);
  const options  = [
    { value: 'High'},
    { value: 'Medium'},
    { value: 'Low'},
  ];

  const handleSelectChange = (value) => {
    setCurrentTask({ ...currentTask, priority: value });
    setOpen(false);
  }

  const updTask = async (e) => {
    e.preventDefault();
    if (handleValidation(currentTask, setErrors)) {
      await updateDoc(doc(db, 'tasks', currentTask.id), {
        taskNumber: currentTask.taskNumber,
        taskName: currentTask.taskName,
        description: currentTask.description,
        createDate: currentTask.createDate,
        workTime: currentTask.workTime,
        endDate: currentTask.endDate,
        priority: currentTask.priority,
        // fileUrl: currentTask.fileUrl,
        // fileName: currentTask.fileName,
      });
      firebaseQuery();
      setModal(false);
      setErrors({});
    }
  }

  return (
    <div className="formWrap">
      <div className="inputForFileWrap">
        <TaskFile task={currentTask} firebaseQuery={firebaseQuery} setCurrentTask={setCurrentTask}/>
      </div>
      <form
        className="taskCreateUpdForm"
        onSubmit={updTask}
      >
        <div className="inputWrap">
          <label className="projectLabel">Title:</label>
          <MyInput
            value={currentTask.taskName || ""}
            onChange={e => setCurrentTask({ ...currentTask, taskName: e.target.value })}
            type={"text"}
            placeholder={"Task Name"}
          />
          <span className="error">{errors.taskName}</span>
        </div>

        <div className="inputWrap">
          <label className="projectLabel">Description:</label>
          <MyInput
            value={currentTask.description || ""}
            onChange={e => setCurrentTask({ ...currentTask, description: e.target.value })}
            type={"text"}
            placeholder={"Task Description"}
          />
          <span className="error">{errors.description}</span>
        </div>

        <div className="inputWrap">
          <label className="projectLabel">CreateDate:</label>
          <DateInput selectedDate={currentTask.createDate} setSelectedDate={v => setCurrentTask({...currentTask, createDate: v})}/>
          <span className="error">{errors.createDate}</span>
        </div>

        <div className="inputWrap">
          <label className="projectLabel">WorkTime:</label>
          <MyInput
            value={currentTask.workTime || ""}
            onChange={e => setCurrentTask({ ...currentTask, workTime: e.target.value })}
            type={"number"}
            placeholder={"Task Time"}
          />
          <span className="error">{errors.workTime}</span>
        </div>

        <div className="inputWrap">
          <label className="projectLabel">EndDate:</label>
          <DateInput selectedDate={currentTask.endDate} setSelectedDate={v => setCurrentTask({...currentTask, endDate: v})}/>
          <span className="error">{errors.endDate}</span>
        </div>

        <div className="inputWrap">
          <label className="projectLabel">Priority:</label>
          <CustomSelect
            options={options}
            priority={currentTask.priority || ""}
            onChange={handleSelectChange}
            open={open}
            // handleOpen={() => setOpen(!open)}
            setOpen={setOpen}
          />
          <span className="error">{errors.priority}</span>
        </div>

        <div style={{ width: "90%", display: "flex", alignItems: "center", gap: "10px" }}>
          <MyButton type="submit">Update</MyButton>
          <MyButton 
            type="button" 
            onClick={() => {
              setModal(false);
              setErrors({});
            }}
          >Cancel</MyButton>
        </div>
      </form>
    </div>
  );
};

export default TaskUpdForm;