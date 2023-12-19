import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useLocation } from "react-router-dom";

  // -----Редактирование проекта-------------------------------------------------------------------------------------
const CommentsUpdForm = () => {
  const location = useLocation();
  const {comment, projectId} = location.state;
  const [UpdItem, setUpdItem] = useState({ commentNumber: comment.commentNumber, comment: comment.comment });
  
  const updProject = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'comments', comment.id), {
      commentNumber: UpdItem.commentNumber,
      comment: UpdItem.comment,
    })
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
        placeholder={"Комментарий"}
      />
      <MyButton onClick={updProject}>
        <Link className="createUpdDelBtn" to={`/Comments/${comment.taskId}`} state={{projectId: projectId}}>Update</Link>
      </MyButton>
      <MyButton>
        <Link className="createUpdDelBtn" to={`/Comments/${comment.taskId}`} state={{projectId: projectId}}>Cancel</Link>
      </MyButton>
    </form>
  );
};

export default CommentsUpdForm;