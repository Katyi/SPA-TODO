import React, {useState} from "react";
// import { useNavigate } from 'react-router-dom';
// import MyButton from "./UI/button/MyButton";
// import AlbumUpdForm from "./AlbumUpdForm";
// import MyModal from "./UI/MyModal/MyModal";

const ProjectItem = (props) => {
  let [modal, setModal] = useState(false);

  // let navigate = useNavigate();
  return (
      <div className="project">
        <div className="album__content">
        <strong> {props.project.id} {props.project.title}</strong>
          <div>
          {props.project.description}
          </div>
        </div>
      <div>
        {/* <MyButton onClick={() => navigate(`/albums/${props.album.id}`)}>
          Open
        </MyButton> */}
        {/* <MyButton onClick={() => setModal(true)}>
          UpDate
        </MyButton> */}
        {/* <MyModal visible={modal} setVisible={setModal}>
          <AlbumUpdForm upDate={props.upDate} album={props.album}/>
        </MyModal> */}
        {/* <MyButton onClick={() => props.remove(props.album)}>
          Delete
        </MyButton> */}
        </div>
    </div>
  );
};


export default ProjectItem;