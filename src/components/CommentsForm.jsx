import React, { useState, useEffect } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, addDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


  // -----Добавление нового комментария для задачи в модальном окне-------------------------------------------------------------------------------------
const CommentsForm = ({ taskId }) => {
  const [UpdItem, setUpdItem] = useState({
    taskId: '',
    commentNumber: '',
    comment: ''
  });

  const addNewComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'comments'), {
      taskId: taskId,
      commentNumber: UpdItem.commentNumber,
      comment: UpdItem.comment,
    })
    setUpdItem({
      taskId: '',
      commentNumber: '',
      comment: ''
    });
    window.location.reload();
  }

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
      <MyButton onClick={addNewComment}>Add comments</MyButton>
    </form>
  );
};

export default CommentsForm;