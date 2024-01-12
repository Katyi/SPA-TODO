import MyButton from "./UI/button/MyButton";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

  // -----Редактирование проекта-------------------------------------------------------------------------------------
const CommentsUpdForm = ({modal, setModal, currentComment, setCurrentComment, firebaseQuery, errors, setErrors}) => {

  const handleValidation = () => {
    const formErrors = {};
    let formIsValid = true;

    // comment
    if(!currentComment.comment){
      formIsValid = false;
      formErrors.comment = "Cannot be empty";
    } else if(currentComment.comment.length > 500){
      formIsValid = false;
      formErrors.comment = "Cannot be more 500 characters";
    }
    setErrors(formErrors)
    return formIsValid;
  };
  
  const updProject = async (e) => {
    e.preventDefault();
      if (handleValidation()) {
      await updateDoc(doc(db, 'comments', currentComment.id), {
        commentNumber: currentComment.commentNumber,
        comment: currentComment.comment,
      })
      setModal(false);
      firebaseQuery();
    }
  }

  return (
    <form onSubmit={updProject} style={{display:"flex", flexDirection:"column", paddingTop:"20px", width:"500px"}}>
      <label className="commentLabel">Update comment for task:</label>
      <textarea
        className="commentTextArea"
        value={currentComment.comment || ""}
        onChange={e => setCurrentComment({...currentComment, comment: e.target.value})}
        type={"text"}
        placeholder={"Комментарий"}
      />
      <span className="error">{errors?.comment}</span>
      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px", marginTop: '20px'}}>
        <MyButton type="submit">
          Update
        </MyButton>
        <MyButton type="button" onClick={() => {
          setModal(false);
          setErrors({});
        }}>
          Cancel
        </MyButton>
      </div>
    </form>
  );
};

export default CommentsUpdForm;