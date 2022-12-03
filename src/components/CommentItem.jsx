import React, {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import CommentsUpdForm from "./CommentsUpdForm";
import MyModalForComments from "./UI/modal/MyModalForComments";

const CommentItem = (props) => {
  let [modal2, setModal2] = useState(false);

  return (
    <div className='comment'>
      <div className='commentNumber'>{props.comment.commentNumber}</div>
      <div className='comment_comment'>{props.comment.comment}</div>
      <MyButton onClick={() => setModal2(true)} style={{width: 120}}>UpdComments</MyButton>
      <MyModalForComments visible={modal2} setVisible={setModal2}>
        <CommentsUpdForm comment={props.comment}/>
      </MyModalForComments>
      <MyButton onClick={() => props.remove(props.comment)} style={{width: 120, marginLeft: 3}}>Delete</MyButton>
    </div>
  );
};

export default CommentItem;