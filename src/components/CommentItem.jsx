import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";

const CommentItem = (props) => {
  return (
    <div className='comment'>
      <div className='commentNumber'>{props.comment.commentNumber}</div>
      <div className='comment_comment'>{props.comment.comment}</div>
      <div className="comment_bts">
        <MyButton>
          <Link className="createUpdDelBtn" to="/UpdateComment" state={{ comment: props.comment, projectId: props.projectId }}> Update </Link>
        </MyButton>
      <MyButton onClick={() => props.remove(props.comment)} style={{width: 120, marginLeft: 3}}>Delete</MyButton>
      </div>
    </div>
  );
};

export default CommentItem;