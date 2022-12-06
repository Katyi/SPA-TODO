import React, {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import CommentsUpdForm from "./CommentsUpdForm";
import MyModalForComments from "./UI/modal/MyModalForComments";

const CommentItem = (props) => {
  let [modal2, setModal2] = useState(false);
  const handleClose2 = () => setModal2(false);

  return (
    <div className='comment'>
      <div className='commentNumber'>{props.comment.commentNumber}</div>
      <div className='comment_comment'>{props.comment.comment}</div>
      <div className="comment_bts">
      <MyButton onClick={() => setModal2(true)} style={{width: 120}}>UpdComments</MyButton>
      <MyModalForComments visible={modal2} setVisible={setModal2}>
        <CommentsUpdForm comment={props.comment} firebaseQuery={props.firebaseQuery} handleClose={handleClose2}/>
      </MyModalForComments>
      <MyButton onClick={() => props.remove(props.comment)} style={{width: 120, marginLeft: 3}}>Delete</MyButton>
      </div>
      
    </div>
  );
};

export default CommentItem;