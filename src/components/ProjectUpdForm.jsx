import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// -----Редактирование проекта-------------------------------------------------------------------------------------
const ProjectUpdForm = ({modal, setModal, currentProject, setCurrentProject, getAllProjects, errors, setErrors}) => {

  const handleValidation = () => {
    const formErrors = {};
    let formIsValid = true;

    // title
    if(!currentProject.projectName){
      formIsValid = false;
      formErrors.projectName = "Cannot be empty";
    }
    if(currentProject.projectName.length > 30){
      formIsValid = false;
      formErrors.projectName = "Cannot be more 30 characters";
    }
    // description
    if(!currentProject.description){
      formIsValid = false;
      formErrors.description = "Cannot be empty";
    }
    if(currentProject.description.length > 50){
      formIsValid = false;
      formErrors.description = "Cannot be more 50 characters";
    }
    setErrors(formErrors)
    return formIsValid;
  };
  
  const updProject = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      await updateDoc(doc(db, 'projects', currentProject.id), {
        projectName: currentProject.projectName,
        description: currentProject.description,
      })
      getAllProjects();
      setModal(false);
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <form onSubmit={updProject} style={{display:"flex", flexDirection:"column", paddingTop:"20px"}}>
      <label className="projectLabel">Title:</label>
      <MyInput
        style={{marginBottom: "5px"}}
        value={currentProject.projectName || ""}
        onChange={e => setCurrentProject({...currentProject, projectName: e.target.value})}
        type={"text"}
        placeholder={"Project title"}
      />
      <span className="error">{errors?.projectName}</span>

      <label className="projectLabel">Description:</label>
      <MyInput
        style={{marginBottom: "5px"}}
        value={currentProject.description || ""}
        onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
        type={"text"}
        placeholder={"Project description"}
      />
      <span className="error">{errors?.description}</span>

      <div style={{width:"90%", display:"flex", alignItems:"center", gap: "10px"}}>
        <MyButton type="submit" >Update</MyButton>
        <MyButton type="button" onClick={() => {
          setModal(false);
          setErrors({});
        }}>
          Cancel
        </MyButton>
      </div>
    </form>
  );
};

export default ProjectUpdForm;