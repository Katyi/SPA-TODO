import React, {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import TaskUpdForm from "./TaskUpdForm";
import SubtasksList from "./SubTasksList"
import MyModalForTask from "./UI/modal/MymodalForTask";
// import MyModal from "./UI/modal/MyModal";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { storage } from '../firebase';
import MyInput from "./UI/input/MyInput";

const TaskItem = (props) => {
  let [modal, setModal] = useState(false);
  let [modal1, setModal1] = useState(false);
  // const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    let arr = [].slice.call(e.target.parentElement.children);
    console.log(arr);
    uploadFiles(file);
  }

  const uploadFiles = async (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    let fileName = file.name;

    uploadTask.on(
      "state_changed",
      // (snapshot) => {
        // const prog = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // setProgress(prog);
      // },
      (error) => console.log("Error", error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          recordUrl(downloadURL, fileName);
        });
      }
    );
  };

  const recordUrl =  async (url, fileName) => {
    await updateDoc(doc(db, 'tasks', props.task.id), {
      fileUrl: url,
      fileName: fileName
    });
    window.location.reload();
  }

  return (
    <div className='task'>
      {/* <div className="task_part_1"> */}
        <div className='id'>{props.num}</div>
        <div className='taskName'>{props.task.taskName}</div>
        {/* <div className="btn2"> */}
        <MyButton onClick={() => setModal(true)}>Open/Update</MyButton>
        <MyModalForTask visible={modal} setVisible={setModal}>
          <TaskUpdForm task={props.task} />
        </MyModalForTask>
        {/* </div> */}
        <MyButton onClick={() => props.remove(props.task)}>Delete</MyButton>
        <MyButton onClick={() => setModal1(true)}>SubTasks</MyButton>
        <MyModalForTask visible={modal1} setVisible={setModal1}>
          <SubtasksList task={props.task} />
        </MyModalForTask>
      {/* </div> */}
      {/* <div className="task_part_2"> */}
        <form onSubmit={handleUpload} className='uploadUrl' >
          <MyInput type="file" className='uploadFile' />
          <MyButton type='submit'>Upload</MyButton>
        </form>
      {/* </div> */}
    </div>
  );
};

export default TaskItem;