import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase';
import { storage } from '../firebase';


const TaskUpdForm = ({ task }) => {
  const [UpdItem, setUpdItem] = useState({
    taskName: task.taskName,
    description: task.description,
    createDate: task.createDate,
    workTime: task.workTime,
    endDate: task.endDate,
    priority: task.priority,
    fileName: task.fileName,
    status: task.status
  });
  const [progress, setProgress] = useState(0);
    
  const updTask = async (e) => {
    e.preventDefault();
    console.log("Меняем задачу ", task.id);
    await updateDoc(doc(db, 'tasks', task.id), {
      taskName: UpdItem.taskName,
      description: UpdItem.description,
      createDate: UpdItem.createDate,
      workTime: UpdItem.workTime,
      endDate: UpdItem.endDate,
      priority: UpdItem.priority,
      fileName: UpdItem.fileName,
      status: UpdItem.status
    });
    setUpdItem({
      taskName: '',
      description: '',
      createDate: '',
      workTime: '',
      endDate: '',
      priority: '',
      fileName: '',
      status: ''
    });
    window.location.reload();
  }

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    let arr = [].slice.call(e.target.parentElement.children);
    let divUuid = arr.find((val) => {
      if (val.className === 'uuid')
        return val;
    }).textContent;
    console.log(divUuid);
    uploadFiles(file, divUuid);
  }

  const uploadFiles = async (file, divUuid) => {
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
          // recordUrl(downloadURL, divUuid, fileName);
        });
      }
    );
  };

  // const recordUrl = (url, divUuid, fileName) => {
  //   update(ref_database(db, `/${divUuid}`, divUuid), {
  //     uuid: divUuid,
  //     fileUrl: url,
  //     fileName: fileName
  //   });
  // }

  return (
    <form>
      <MyInput
        value={UpdItem.taskName}
        onChange={e => setUpdItem({...UpdItem, taskName: e.target.value})}
        type={"text"}
        placeholder={"Название задачи"}
      />
      <MyInput
        value ={UpdItem.description}
        onChange={e => setUpdItem({ ...UpdItem, description: e.target.value })}
        type={"text"}
        placeholder={"Описание задачи"}
      />
      <MyInput
        value ={UpdItem.createDate}
        onChange={e => setUpdItem({ ...UpdItem, createDate: e.target.value })}
        type={"date"}
        placeholder={"Дата создания задачи"}
      />
      <MyInput
        value ={UpdItem.workTime}
        onChange={e => setUpdItem({ ...UpdItem, workTime: e.target.value })}
        type={"number"}
        placeholder={"Время в работе"}
      />
      <MyInput
        value ={UpdItem.endDate}
        onChange={e => setUpdItem({ ...UpdItem, endDate: e.target.value })}
        type={"date"}
        placeholder={"Дата окончания"}
      />
      <MyInput
        value={UpdItem.priority}
        onChange={e => setUpdItem({ ...UpdItem, priority: e.target.value })}
        type={"text"}
        placeholder={"Приоритет"}
      />
      <MyInput
        value ={UpdItem.fileName}
        onChange={e => setUpdItem({ ...UpdItem, fileName: e.target.value })}
        type={"text"}
        placeholder={"Вложенные файлы"}
      />
      <MyInput
        value ={UpdItem.status}
        onChange={e => setUpdItem({ ...UpdItem, status: e.target.value })}
        type={"text"}
        placeholder={"Текущий статус"}
      />
      <MyButton onClick={updTask}>Update task</MyButton>
      <div><br /></div>
      <form onSubmit={handleUpload} className='uploadUrl' >
        <input type="file" className='inputfileUrl' />
        <button type='submit'> Upload </button>
      </form>
    </form>
  );
};

export default TaskUpdForm;