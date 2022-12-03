import React, {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import { useNavigate } from 'react-router-dom';
import TaskUpdForm from "./TaskUpdForm";
import MyModalForTask from "./UI/modal/MyModalForTask";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { storage } from '../firebase';
import MyInput from "./UI/input/MyInput";
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import TaskCommentsForm from "./TaskCommentsForm";
import MyModalForComments from "./UI/modal/MyModalForComments";

const TaskItem = (props) => {
  let [modal, setModal] = useState(false);
  let [modal1, setModal1] = useState(false);
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
  const recordUrl =  async (url, fileName) => {
    await updateDoc(doc(db, 'tasks', props.task.id), {
      fileUrl: url,
      fileName: fileName
    });
    window.location.reload();
  }

  let navigate = useNavigate();
  //      drag-n-drop                                                                                                                       
  const [{ opacity }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item:  props.task.taskName ,
    end(item, monitor) {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        let alertMessage = ''
        const isDropAllowed =
          dropResult.allowedDropEffect === 'any' ||
          dropResult.allowedDropEffect === dropResult.dropEffect
        if (isDropAllowed) {
          const isCopyAction = dropResult.dropEffect === 'copy'
          const actionName = isCopyAction ? 'copied' : 'moved'
          alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
        } else {
          alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
        }
        alert(alertMessage)
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }),
    [props.task.taskName],
  )

  return (
    <div className='task' ref={drag}>
      <div className='id'>{props.task.taskNumber}</div>
      <div className='taskName'>{props.task.taskName}</div>
      <MyButton onClick={() => setModal(true)}>Open/Update</MyButton>
      <MyModalForTask visible={modal} setVisible={setModal}>
        <TaskUpdForm task={props.task} />
      </MyModalForTask>
      <MyButton onClick={() => props.remove(props.task)}>Delete</MyButton>
      {props.task.isSubtask===false
        ? <MyButton onClick={() => navigate(`/tasks/${props.task.id}`)}>SubTasks</MyButton>
        : <></>
      }
      <MyButton onClick={() => setModal(true)}>Comments</MyButton>
      <MyModalForComments visible={modal} setVisible={setModal}>
        <TaskCommentsForm task={props.task} />
      </MyModalForComments>
      <form onSubmit={handleUpload} className='uploadUrl' >
        <MyInput type="file" className='uploadFile' />
        <MyButton type='submit'>Upload</MyButton>
      </form>
      
      
    </div>
  );
};

export default TaskItem;