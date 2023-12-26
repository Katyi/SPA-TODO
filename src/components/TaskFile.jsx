import React, { useRef, useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import { updateDoc, doc} from 'firebase/firestore';
import { db } from '../firebase';


const TaskFile = (props) => {
  const [progress, setProgress] = useState(0);
  const portalRef = useRef(null);


  // -----Загрузка файла для задачи-------------------------------------------------------------------------------------
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    let arr = [].slice.call(e.target.parentElement.children);
    uploadFiles(file);
  }
  
  const uploadFiles = async (file) => {
    if (!file) return;
    let fileNewName = props.task.id + file.name;
    const sotrageRef = ref(storage, `files/${fileNewName}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    let fileName = fileNewName;

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
      fileName: fileName,
    });

    // props.firebaseQuery();
    props.setCurrentTask({...props.task, fileUrl: url})
  }

  return (
    <>
    {!props.task.fileUrl ?
    <form onSubmit={handleUpload} className='uploadUrl'>
      <MyInput type="file" className='uploadFile' style={{width: "47%"}}/>
      <MyButton type='submit' style={{width: "47%"}}>Upload</MyButton>
    </form>
    : <img src={props.task.fileUrl} alt="" className='fileUrl'/>
    }
    </>
  )
}

export default TaskFile;