import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// -----Редактирование проекта-------------------------------------------------------------------------------------
const ProjectUpdForm = ({modal, setModal, project, setProject, getAllProjects}) => {

  const updProject = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'projects', project.id), {
      projectNumber: project.projectNumber,
      projectName: project.projectName,
      description: project.description,
    })

    getAllProjects();
    setModal(false);
  }

  return (
    <form onSubmit={updProject} style={{display:"flex", flexDirection:"column", gap:"40px", paddingTop:"20px"}}>
      <MyInput
        value={project.projectNumber}
        onChange={e => setProject({ ...project, projectNumber: e.target.value })}
        type={"number"}
        placeholder={"Project Number"}
      />
      <MyInput
        value={project.projectName}
        onChange={e => setProject({...project, projectName: e.target.value})}
        type={"text"}
        placeholder={"Project title"}
      />
      <MyInput
        value={project.description}
        onChange={e => setProject({ ...project, description: e.target.value })}
        type={"text"}
        placeholder={"Project description"}
      />
      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
        <MyButton type="submit" >Update</MyButton>
        <MyButton type="button">Cancel</MyButton>
      </div>
    </form>
  );
};

export default ProjectUpdForm;