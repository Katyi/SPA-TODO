import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
// import { useNavigate } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import CommentItem from "../components/CommentItem";
import MyNavbar from "../components/UI/Navbar/MyNavbar";
import MyModal from "../components/UI/modal/MyModal";
import CommentsForm from "../components/CommentsForm";
import CommentsUpdForm from "../components/CommentsUpdForm";
// import { Pagination } from '@mui/material';

function Comments() {
  const location = useLocation();
  const { projectId } = location.state;
  const [modal6, setModal6] = useState(false);
  const [modal7, setModal7] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState([]);
  const [task, setTask] = useState([]);
  const [errors, setErrors] = useState({});
  // let [modal, setModal] = useState(false);
  let { id } = useParams();
  // const handleClose = () => setModal(false);

  // ------ Get Task Data --------------------------------------------
  const getTask = async(id) => {
    const docRef = doc(db, 'tasks', id);
    let docSnap = await getDoc(docRef);
    setTask(docSnap.data());
  }

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
    firebaseQuery();
  }

  const getComment = (comment) => {
    setCurrentComment(comment)
  };

  useEffect(() => {
    firebaseQuery();
    // eslint-disable-next-line
  },[]);

  useEffect(() => {
    getTask(id);
  }, [id]);

  // let navigate = useNavigate();
  return (
    <div className="App">
      <div className="wrapper">
        <MyNavbar title={'Comments'} linkPath={`/Projects/${projectId}`} linkLabel={'Back To Tasks'} taskName={task.taskName}/>
        <div className="comment_container">
          <MyButton style={{marginTop: '2%', marginBottom: '2%'}} onClick={() => setModal6(true)}>
            Add Comment
          </MyButton>
          <table>
            <thead>
              <tr className="comment_Header header_title">
                <th className="commentNumber">№</th>
                <th className="comment_comment">Comments</th>
                <th className="comment_bts">Actions</th>
              </tr>
            </thead>
            <tbody>
            {comments.sort((a,b)=>a.commentNumber > b.commentNumber ? 1 : -1)
              .map((comment, index) => (
              <CommentItem 
                remove={removeComments} firebaseQuery={firebaseQuery} projectId={projectId} comment={comment} key={index}
                modal={modal7} setModal={setModal7} getComment={getComment}
              />
            ))}
            </tbody>
          </table>

          {/* MODAL FOR CREATE COMMENT */}
          <MyModal visible={modal6} setVisible={setModal6} setErrors={setErrors}>
            <CommentsForm modal={modal6} setModal={setModal6} comments={comments} firebaseQuery={firebaseQuery}
              errors={errors} setErrors={setErrors}
            />
          </MyModal>

          {/* MODAL FOR UPDATE COMMENT */}
          <MyModal visible={modal7} setVisible={setModal7} setErrors={setErrors}>
            <CommentsUpdForm modal={modal7} setModal={setModal7} currentComment={currentComment} setCurrentComment={setCurrentComment} 
              firebaseQuery={firebaseQuery} errors={errors} setErrors={setErrors}
            />
          </MyModal>
        </div>
      </div>
    </div>
  )
};

export default Comments;