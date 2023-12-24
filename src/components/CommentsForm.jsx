import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useLocation, useParams } from "react-router-dom";


  // -----Добавление нового комментария для задачи в модальном окне-------------------------------------------------------------------------------------
const CommentsForm = ({modal, setModal, comments, firebaseQuery}) => {
  const location = useLocation();
  const { projectId } = location.state;
  console.log(projectId)
  let { id } = useParams();
  console.log(id)
  // const [commentNums, setCommentNums] = useState ();
  // const taskRef = query(collection(db, 'comments'), where("taskId", "==", id));

  // const getComments = async () => {
  //   const data = await getDocs(taskRef);
  //   setCommentNums(data.docs.map((doc)=> (doc.data().commentNumber)));
  // };

  // getComments();

  

  const [UpdItem, setUpdItem] = useState({
    taskId: '',
    commentNumber: '',
    comment: ''
  });

  const addNewComment = async (e) => {
    e.preventDefault();
    let lastNumber =  comments?.length > 0 ? comments.sort((a, b) => a?.commentNumber > b?.commentNumber ? 1 : -1).slice(-1)[0]?.commentNumber : 0;

    await addDoc(collection(db, 'comments'), {
      taskId: id,
      commentNumber: lastNumber + 1,
      comment: UpdItem.comment,
    })
    setUpdItem({
      taskId: '',
      commentNumber: '',
      comment: ''
    });
    firebaseQuery();
    setModal(false);
  }

  return (
    <form 
      style={{display:"flex", flexDirection:"column", gap:"40px", paddingTop:"20px"}}
      onSubmit={addNewComment}
    >
      <MyInput
        value={UpdItem.comment}
        onChange={e => setUpdItem({...UpdItem, comment: e.target.value})}
        type={"text"}
        placeholder={"Task Comment"}
      />
      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
        <MyButton type="submit">
          Add comment
        </MyButton>
        <MyButton type="button" onClick={()=>setModal(false)}>
          Cancel
        </MyButton>
      </div>
    </form>
  );
};

export default CommentsForm;