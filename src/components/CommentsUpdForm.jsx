import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

  // -----Редактирование проекта-------------------------------------------------------------------------------------
const CommentsUpdForm = ({modal, setModal, currentComment, setCurrentComment, firebaseQuery}) => {
  
  const updProject = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'comments', currentComment.id), {
      commentNumber: currentComment.commentNumber,
      comment: currentComment.comment,
    })
    setModal(false);
    firebaseQuery();
  }

  return (
    <form onSubmit={updProject} style={{display:"flex", flexDirection:"column", paddingTop:"20px"}}>
      <label className="commentLabel">Number:</label>
      <MyInput
        style={{marginBottom: "20px"}}
        value={currentComment.commentNumber || ""}
        onChange={e => setCurrentComment({...currentComment, commentNumber: e.target.value})}
        type={"number"}
        placeholder={"Номер комментария"}
      />
      <label className="commentLabel">Update comment for task:</label>
      <textarea
        className="commentTextArea"
        value={currentComment.comment || ""}
        onChange={e => setCurrentComment({...currentComment, comment: e.target.value})}
        type={"text"}
        placeholder={"Комментарий"}
      />
      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
        <MyButton type="submit">
          Update
        </MyButton>
        <MyButton type="button" onClick={()=>setModal(false)}>
          Cancel
        </MyButton>
      </div>
    </form>
  );
};

export default CommentsUpdForm;