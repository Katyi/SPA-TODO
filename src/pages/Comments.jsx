import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import CommentItem from "../components/CommentItem";
import CommentsForm from "../components/CommentsForm";
import MyModalForComments from "../components/UI/modal/MyModalForComments";

function Comments() {
  const [comments, setComments] = useState([]);
  let [modal, setModal] = useState(false);
  let { id } = useParams();
  const handleClose = () => setModal(false);

  // -----Параметры для отображения комментариев------------------------------------------------------------------
  async function firebaseQuery() {
    const q = query(collection(db, 'comments'), where("taskId", "==", id));
    let tasksArr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tasksArr.push({ ...doc.data(), id: doc.id })
    })
    setComments(tasksArr)
  }

  const removeComments = async (comment) => {
    await deleteDoc(doc(db, 'comments', comment.id));
    // firebaseQuery();
    window.location.reload();
  }

  useEffect(() => {
    firebaseQuery();
  }, []);

  let navigate = useNavigate();
  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <div className="header_container">
            <div className="header_title">Комментарии к задаче</div>
            <div className="header__link">
              <MyButton onClick={() => navigate(-1)}>Обратно к задачам</MyButton>
            </div>
          </div>
        </div>
        <div className="container_2">
        <MyButton style={{ marginLeft: 30, marginBottom: 5 }} onClick={() => setModal(true)}>
          AddComment
          </MyButton>
          <div></div>
        <MyModalForComments visible={modal} setVisible={setModal}>
            <CommentsForm taskId={id} firebaseQuery={firebaseQuery} handleClose={handleClose}/>
        </MyModalForComments>
          <div className='comments'>
            {comments.map((comment, index) => (
              <CommentItem remove={removeComments} firebaseQuery={firebaseQuery} comment={comment} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Comments;