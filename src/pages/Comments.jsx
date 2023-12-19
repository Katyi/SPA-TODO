import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { query, collection, where, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from "../components/UI/button/MyButton";
import CommentItem from "../components/CommentItem";
import { Navbar } from "../components/Navbar";
import MyNavbar from "../components/UI/Navbar/MyNavbar";
// import CommentsForm from "../components/CommentsForm";
// import MyModalForComments from "../components/UI/modal/MyModalForComments";

function Comments() {
  const location = useLocation();
  const { projectId } = location.state;
  const [comments, setComments] = useState([]);
  const [task, setTask] = useState([]);
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

  useEffect(() => {
    firebaseQuery();
  }, []);

  useEffect(() => {
    getTask(id);
  }, []);

  let navigate = useNavigate();
  return (
    <div className="App">
      <div className="wrapper">
        {/* <Navbar projectId={projectId}/> */}
        <MyNavbar title={'Comments'} linkPath={`/Projects/${projectId}`} linkLabel={'Back To Tasks'} taskName={task.taskName}/>
        <div className="container_2">
          <MyButton style={{marginLeft: '2%', marginTop: '2%'}}>
            <Link className="createUpdDelBtn" to='/CreateComment' state={{ taskId: id, projectId: projectId }}>
              Add Comment</Link>
          </MyButton>
          <div className='comments'>
            {comments.sort((a,b)=>a.commentNumber > b.commentNumber ? 1 : -1)
              .map((comment, index) => (
                <CommentItem remove={removeComments} firebaseQuery={firebaseQuery} projectId={projectId} comment={comment} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Comments;