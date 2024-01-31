import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { query, collection, where, getDocs, doc, updateDoc, deleteField } from 'firebase/firestore';
import { storage, db } from '../firebase';

const TaskFile = (props) => {
  const [progress, setProgress] = useState(0);

  // -----Загрузка файла для задачи-------------------------------------------------------------------------------------
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    uploadFiles(file);
  }

  const uploadFiles = async (file) => {
    if (!file) return;
    let fileNewName = props.task.id ? props.task.id + file.name : crypto.randomUUID() + file.name;
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
          if (props.task.id) {
            recordUrl(downloadURL, fileName);
          } else {
            props.setCurrentTask({ ...props.task, fileUrl: downloadURL, fileName: fileName });
            setProgress(0);
          }
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
    props.setCurrentTask({ ...props.task, fileUrl: url, fileName: fileName });
    props.firebaseQuery();
    setProgress(0);
  }

  const handleDeleteFile = async (e) => {
    e.preventDefault();
    const storage = getStorage(); //
    if (props.task.id) {
      const q2 = query(collection(db, 'tasks'), where('taskId', '==', props.task.id));
      let tasksArr2 = [props.task];
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        tasksArr2.push({ ...doc.data(), id: doc.id })
      })
      tasksArr2.forEach(async (task) => {
        if (task.hasOwnProperty('fileName')) {
          const imgRef1 = ref(storage, `files/${task.fileName}`);//
          await deleteObject(imgRef1).then(() => {
            // File deleted successfully
          }).catch((error) => {
            // Uh-oh, an error occurred!
          });
        }
      })
      const newItems = { ...props.task };
      delete newItems.fileUrl;
      delete newItems.fileName;
      props.setCurrentTask(newItems);

      await updateDoc(doc(db, 'tasks', props.task.id), {
        fileUrl: deleteField(),
        fileName: deleteField(),
      });
      props.firebaseQuery();
    } else {
      const imgRef1 = ref(storage, `files/${props.task.fileName}`);
      await deleteObject(imgRef1).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
      const newItems = { ...props.task };
      delete newItems.fileUrl;
      delete newItems.fileName;
      props.setCurrentTask(newItems);
    }
  };

  return (
    <>
      {!props.task.fileUrl ?
        <form onSubmit={handleUpload} className='uploadUrl'>
          {progress > 0
            ? <div className='fileUploadProgress'>Please wait, uploaded {progress}%</div>
            : <input type="file" />
          }
          <MyButton type='submit'>Upload</MyButton>

        </form>
        :
        <form onSubmit={handleDeleteFile} className='uploadUrl'>
          <img src={props.task.fileUrl} alt="fileUrl" className='fileUrl' />
          <MyButton type='submit'>Delete</MyButton>
        </form>
      }
    </>
  )
}

export default TaskFile;