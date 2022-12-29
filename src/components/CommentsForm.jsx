import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useLocation } from "react-router-dom";


  // -----Добавление нового комментария для задачи в модальном окне-------------------------------------------------------------------------------------
const CommentsForm = () => {
  const location = useLocation();
  const { taskId, projectId } = location.state;
  const [commentNums, setCommentNums] = useState ();
  const taskRef = query(collection(db, 'comments'), where("taskId", "==", taskId));
  const getComments = async () => {
    const data = await getDocs(taskRef);
    setCommentNums(data.docs.map((doc)=> (doc.data().commentNumber)));
  };
  getComments();

  const [UpdItem, setUpdItem] = useState({
    taskId: '',
    commentNumber: '',
    comment: ''
  });

  const addNewComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'comments'), {
      taskId: taskId,
      commentNumber: commentNums.length + 1,
      comment: UpdItem.comment,
    })
    setUpdItem({
      taskId: '',
      commentNumber: '',
      comment: ''
    });
  }

  return (
    <form>
      <MyInput
        value={UpdItem.comment}
        onChange={e => setUpdItem({...UpdItem, comment: e.target.value})}
        type={"text"}
        placeholder={"Task Comment"}
      />
      <MyButton onClick={addNewComment}>
        <Link className="createUpdDelBtn" to={`/Comments/${taskId}`} state={{projectId: projectId}}>Add comment</Link>
      </MyButton>
      <MyButton>
        <Link className="createUpdDelBtn" to={`/Comments/${taskId}`} state={{ projectId: projectId }}>Cancel</Link>
      </MyButton>
    </form>
  );
};

export default CommentsForm;