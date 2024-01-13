import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from "react-router-dom";


  // -----Добавление нового комментария для задачи в модальном окне-------------------------------------------------------------------------------------
const CommentsForm = ({modal, setModal, comments, firebaseQuery, errors, setErrors}) => {
  let { id } = useParams();
  
  const [UpdItem, setUpdItem] = useState({
    taskId: '',
    commentNumber: '',
    comment: ''
  });

  const handleValidation = () => {
    const formErrors = {};
    let formIsValid = true;

    // comment
    if(!UpdItem.comment){
      formIsValid = false;
      formErrors.comment = "Cannot be empty";
    } else if(UpdItem.comment.length > 500){
      formIsValid = false;
      formErrors.comment = "Cannot be more 500 characters";
    }
    setErrors(formErrors)
    return formIsValid;
  };

  const addNewComment = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
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
  }

  return (
    <form 
      className="commnentForm" onSubmit={addNewComment}>
      <label htmlFor="comment" className="commentLabel">Add comment for task:</label>
      <textarea
        className="commentTextArea"
        value={UpdItem.comment}
        onChange={e => setUpdItem({...UpdItem, comment: e.target.value})}
        id="comment" name="comment" rows="5" cols="33"
        placeholder={"Task Comment"}
      />
      <span className="error">{errors.comment}</span>

      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px", marginTop: "20px"}}>
        <MyButton type="submit">Add comment</MyButton>
        <MyButton type="button" onClick={() => {
          setModal(false);
          setErrors({});
          setUpdItem({taskId: '', commentNumber: '', comment: ''});
        }}>
          Cancel
        </MyButton>
      </div>
    </form>
  );
};

export default CommentsForm;