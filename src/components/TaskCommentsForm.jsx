import React, { useState, useEffect } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc, query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


  // -----Просмотр и редактирование задачи в модальном окне-------------------------------------------------------------------------------------
const TaskCommentsForm = ({ task }) => {
  // const [queryTasks, setQueryTasks] = useState([]);
  
  // async function firebaseQuery() {
  //   const q = query(collection(db, 'comments'), where('projectId', '==', task.projectId), where('taskId', '==', task.id));
  //   let tasksArr = [];
    
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     tasksArr.push({ ...doc.data(), id: doc.id })
  //   })
  //   setQueryTasks(tasksArr)
  // }
  // let comment = firebaseQuery();
  // useEffect(() => {
  //   firebaseQuery();
  // }, []);

  const [UpdItem, setUpdItem] = useState({
    commentNumber: "comment.commentNumber",
    comment: "comment.comment"
  });

  // const updTask = async (e) => {
  //   e.preventDefault();
  //   await updateDoc(doc(db, 'comments', task.id), {
  //     commentNumber: UpdItem.commentNumber,
  //     comment: UpdItem.comment,
  //   });
  //   window.location.reload();
  // }

  return (
    <form>
      <MyInput
        value={UpdItem.commentNumber}
        onChange={e => setUpdItem({...UpdItem, commentNumber: e.target.value})}
        type={"number"}
        placeholder={"Номер комментария"}
      />
      <MyInput
        value={UpdItem.comment}
        onChange={e => setUpdItem({...UpdItem, comment: e.target.value})}
        type={"text"}
        placeholder={"Комментарий задачи"}
      />
      <MyButton onClick={TaskCommentsForm}>Update comments</MyButton>
    </form>
  );
};

export default TaskCommentsForm;