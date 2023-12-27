import MyButton from "../components/UI/button/MyButton";

const CommentItem = (props) => {
  return (
    <tr className='comment'>
      <td className='commentNumber'>{props.comment.commentNumber}</td>
      <td className='comment_comment'>{props.comment.comment}</td>
      <td className="comment_bts">
        <MyButton 
          style={{width: 120, marginLeft: 3}}
          type="button"
          onClick={() => {
            props.setModal(true);
            props.getComment(props.comment);
          }}
        >
          Update
        </MyButton >
      <MyButton onClick={() => props.remove(props.comment)} style={{width: 120, marginLeft: 3}}>Delete</MyButton>
      </td>
    </tr>
  );
};

export default CommentItem;