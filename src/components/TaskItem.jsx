import React, {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import { useNavigate } from 'react-router-dom';
import TaskUpdForm from "./TaskUpdForm";
import MyModalForTask from "./UI/modal/MyModalForTask";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc} from 'firebase/firestore';
import { db } from '../firebase';
import { storage } from '../firebase';
import MyInput from "./UI/input/MyInput";
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';

const TaskItem = (props) => {
  let [modal, setModal] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // -----Загрузка файла для задачи-------------------------------------------------------------------------------------
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
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log("Error", error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          recordUrl(downloadURL, fileName);
        });
      }
    );
  };
  // -----Выгрузка ссылки загруженного файла для задачи-------------------------------------------------------------------------------------
  const recordUrl = async (url, fileName) => {
    await updateDoc(doc(db, 'tasks', props.task.id), {
      fileUrl: url,
      fileName: fileName
    });
    window.location.reload();
  }

  let navigate = useNavigate();

  //      drag-n-drop                                                                                                                       
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: props.task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  )

  return (
    <div className='task' ref={drag}>
      <div className='taskNumber'>{props.task.taskNumber}</div>
      <div className='taskName'>{props.task.taskName}</div>
      {isDragging}
      <MyButton onClick={() => setModal(true)} style={{width: 120, marginBottom: 10}}>Open/Update</MyButton>
      <MyModalForTask visible={modal} setVisible={setModal}>
        <TaskUpdForm task={props.task} />
      </MyModalForTask>
      <MyButton onClick={() => props.remove(props.task.id)} style={{width: 120, marginBottom: 10}}>Delete</MyButton>
      {!props.task.isSubtask && <MyButton onClick={() => navigate(`/tasks/${props.task.id}`)} style={{width: 120, marginBottom: 10}}>SubTasks</MyButton>}
      {!props.task.isSubtask && <MyButton onClick={() => navigate(`/comments/${props.task.id}`)} style={{width: 120, marginBottom: 10}}>Comments</MyButton>}
      <form onSubmit={handleUpload} className='uploadUrl' >
          <MyInput type="file" className='uploadFile' style={{width: 500, marginBottom: 10}}/>
          <MyButton type='submit' style={{width: 120}}>Upload</MyButton>
        </form>
    </div>
  );
};

export default TaskItem;