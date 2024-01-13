import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import TaskFile from "./TaskFile";
import InputMask from "react-input-mask";
import dayjs from 'dayjs';
import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);

// -----Просмотр и редактирование задачи в модальном окне-------------------------------------------------------------------------------------
const TaskUpdForm = ({ modal, setModal, currentTask, setCurrentTask, firebaseQuery, handleUpload, errors, setErrors }) => {

  const handleValidation = () => {
    const formErrors = {};
    let formIsValid = true;

    // title
    if (!currentTask.taskName) {
      formIsValid = false;
      formErrors.taskName = "Cannot be empty";
    }
    if (currentTask.taskName.length > 30) {
      formIsValid = false;
      formErrors.taskName = "Cannot be more 30 characters";
    }
    // description
    if (!currentTask.description) {
      formIsValid = false;
      formErrors.description = "Cannot be empty";
    }
    if (currentTask.description.length > 50) {
      formIsValid = false;
      formErrors.description = "Cannot be more 50 characters";
    }
    // createDate
    if (!currentTask.createDate) {
      formIsValid = false;
      formErrors.createDate = "Cannot be empty";
    } else if (currentTask.createDate.length < 10) {
      formIsValid = false;
      formErrors.createDate = "Date is not valid";
    }
    // WorkTime 
    if (!currentTask.workTime) {
      formIsValid = false;
      formErrors.workTime = "Cannot be empty";
    }
    //endDate
    if (!currentTask.endDate) {
      formIsValid = false;
      formErrors.endDate = "Cannot be empty";
    } else if (currentTask.endDate.length < 10) {
      formIsValid = false;
      formErrors.endDate = "Date is not valid";
    }
    // priority
    if (currentTask.priority === '') {
      formIsValid = false;
      formErrors.priority = "It's required";
    }
    setErrors(formErrors)
    return formIsValid;
  };

  const updTask = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      await updateDoc(doc(db, 'tasks', currentTask.id), {
        taskNumber: currentTask.taskNumber,
        taskName: currentTask.taskName,
        description: currentTask.description,
        createDate: currentTask.createDate,
        workTime: currentTask.workTime,
        endDate: currentTask.endDate,
        priority: currentTask.priority,
      });
      setModal(false);
      firebaseQuery();
    }
  }

  return (
    <div className="formWrap"
    // style={{ border: '2px solid #566573', padding: '20px' }}
    >
      <div className="inputForFileWrap">
        {!currentTask.fileUrl
          ? <TaskFile task={currentTask} firebaseQuery={firebaseQuery} setCurrentTask={setCurrentTask} />
          : <img src={currentTask.fileUrl} alt="" className="fileUrl" />
        }
      </div>
      <form
        className="taskUpdForm"
        onSubmit={updTask}
      >
        {/* <div className="inputWrap">
          <label className="projectLabel">Task number:</label>
          <MyInput
            value={currentTask.taskNumber || ""}
            onChange={e => setCurrentTask({ ...currentTask, taskNumber: e.target.value })}
            type={"number"}
            placeholder={"Task Number"}
          />
          <span className="error">{errors.taskNumber}</span>
        </div> */}

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
          <div className="dateInputWrap">
            <InputMask
              className="InputMask"
              mask='99.99.9999'
              maskChar=''
              placeholder='DD.MM.YYYY'
              value={currentTask.createDate || ""}
              onChange={e => setCurrentTask({ ...currentTask, createDate: e.target.value })}>
            </InputMask>
            <input
              type="date"
              className="calendar1"
              onChange={e => setCurrentTask({ ...currentTask, createDate: dayjs(e.target.value).format('DD.MM.YYYY') })}
            />
          </div>
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
          <div className="dateInputWrap">
            <InputMask
              className="InputMask"
              mask='99.99.9999'
              maskChar=''
              placeholder='DD.MM.YYYY'
              value={currentTask.endDate || ""}
              onChange={e => setCurrentTask({ ...currentTask, endDate: e.target.value })}>
            </InputMask>
            <input
              type="date"
              className="calendar1"
              onChange={e => setCurrentTask({ ...currentTask, endDate: dayjs(e.target.value).format('DD.MM.YYYY') })}
            />
          </div>
          <span className="error">{errors.endDate}</span>
        </div>

        <div className="inputWrap">
          <label className="projectLabel">Priority:</label>
          <select
            name="priority"
            id="priority-select"
            value={currentTask.priority}
            onChange={e => setCurrentTask({ ...currentTask, priority: e.target.value })}
            className="prioritySelect"
          >
            <option value="">--Please choose an option--</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <span className="error">{errors.priority}</span>
        </div>

        {/* <div className="inputWrap">
          <label className="projectLabel">Status:</label>
          <MyInput
            value={currentTask.status || ""}
            style={{background:"rgb(255, 255, 255)"}}
            // onChange={e => setCurrentTask({ ...currentTask, status: e.target.value })}
            type={"text"}
            disabled='disabled'
            placeholder={"Status"}
          />
          <span className="error">{errors.status}</span>
        </div> */}

        <div style={{ width: "90%", display: "flex", alignItems: "center", gap: "10px" }}>
          <MyButton type="submit">Update</MyButton>
          <MyButton type="button" onClick={() => setModal(false)}>Cancel</MyButton>
        </div>
      </form>
    </div>
  );
};

export default TaskUpdForm;