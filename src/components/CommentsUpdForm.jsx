import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

  // -----Редактирование проекта-------------------------------------------------------------------------------------
const CommentsUpdForm = ( {comment, firebaseQuery, handleClose} ) => {
  const [UpdItem, setUpdItem] = useState({ commentNumber: comment.commentNumber, comment: comment.comment });
  
  const updProject = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'comments', comment.id), {
      commentNumber: UpdItem.commentNumber,
      comment: UpdItem.comment,
    })
    // handleClose();
    // firebaseQuery();
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
        placeholder={"Комментарий"}
      />
      <MyButton onClick={updProject}>Update Commnet</MyButton>
    </form>
  );
};

export default CommentsUpdForm;