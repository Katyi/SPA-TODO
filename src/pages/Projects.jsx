import React, { useState, useEffect } from "react";
import { query, collection, doc, deleteDoc,getDocs, where  } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from '../firebase';
import ProjectItem from "../components/ProjectItem";
import MyButton from "../components/UI/button/MyButton";
import MyNavbar from "../components/UI/Navbar/MyNavbar";
import MyModal from "../components/UI/modal/MyModal";
import ProjectForm from "../components/ProjectForm";
import ProjectUpdForm from "../components/ProjectUpdForm";
import { Pagination } from '@mui/material';
import Footer from "../components/UI/footer/Footer";
// import Loader from "../components/UI/Loader/Loader";
// import * as ReactBootStrap from "react-bootstrap";

const styles = {
  table: {
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
    width: '100%',
  },
  thead: {
    backgroundColor: '#f1f1f1',
  },
  th: {
    padding: '8px',
    border: '1px solid #ddd',
  },
  td: {
    padding: '8px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  // const itemsPerPage = 5;
  const [limit] = useState(
    Math.floor((window.innerHeight * 76 / 100 - 30 - 15 - 71 - 20 - 32 ) / 72)
  );

  let indexOfLastProject = page * limit;
  let indexOfFirstProject = indexOfLastProject - limit;
  let currentProjects = projects?.sort((a, b) => a.projectNumber > b.projectNumber ? 1 : -1).slice(indexOfFirstProject, indexOfLastProject);
  
  // GET ALL PROJECTS
  const getAllProjects = async() => {
    // const q = query(collection(db, 'projects'))
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   let projectsArr = [];
    //   querySnapshot.forEach((doc) => {
    //     projectsArr.push({ ...doc.data(), id: doc.id })
    //   })
    //   setProjects(projectsArr)
    // })
    // return () => unsubscribe()
    let projectsCollectionRef = collection(db, 'projects');
    let data = await getDocs(projectsCollectionRef)
    // setLoading(true)
    setProjects(data.docs.map((doc)=>({...doc.data(), id: doc.id}))) 
  };

  // FOR PAGINATION
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // DELETE PROJECT AND HIS ALL CHILDREN
  const removeProject = async (projectId) => {
    // -------------------------------------- Delete images for project with tasks and subtasks of project -------------
    const storage = getStorage();
    const q2 = query(collection(db, 'tasks'), where('projectId', '==', projectId));
    let tasksArr2 = [];
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      tasksArr2.push({ ...doc.data(), id: doc.id })
    })
    tasksArr2.forEach(async (task) => {
      if (task.hasOwnProperty('fileName')) {
        const imgRef1 = ref(storage, `files/${task.fileName}`);
        await deleteObject(imgRef1).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      }
    })

    const q = query(collection(db, 'tasks'), where('projectId', '==', projectId));
    let tasksArr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tasksArr.push({ ...doc.data(), id: doc.id })
    })
    tasksArr.forEach(async (task) => {
    // -------------------------------------- Удаление комментов-проекта -----------------------------------------------
      const q2 = query(collection(db, 'comments'), where('taskId', '==', task.id));
      let tasksArr2 = [];
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc) => {
        tasksArr2.push({ ...doc.data(), id: doc.id });
        })
      tasksArr2.forEach(async(comment) => {
        await deleteDoc(doc(db, 'comments', comment.id));
      })
    // ------------------------------------  Удаление подзадач проекта------------------------------------------------
      const q1 = query(collection(db, 'tasks'), where('taskId', '==', task.id));
      let tasksArr1 = [];
      const querySnapshot1 = await getDocs(q1);
      querySnapshot1.forEach(async(doc) => {
        tasksArr1.push({ ...doc.data(), id: doc.id })
      })
      tasksArr1.forEach(async (task) => {
        await deleteDoc(doc(db, 'tasks', task.id));
      })
    // ------------------------------------Удаление задач проекта ----------------------------------------------------
      await deleteDoc(doc(db, 'tasks', task.id));
    })
    // ------------------------------------Удаление проекта-----------------------------------------------------------
    await deleteDoc(doc(db, 'projects', projectId));
    getAllProjects()
  };

  const getProject = (project) => {
    setCurrentProject(project)
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <MyNavbar title={'Projects'}/>
        {/* {loading 
        ? <ReactBootStrap.Spinner animation="border" /> */}
        : <div className='project_container'>
          {/* BUTTON FOR CREATE PROJECT */}
          <div className="project_container_1">
            <MyButton onClick={() => setModal(true)}>Create Project</MyButton>
          </div>
          {/* TABLE OF PROJECTS */}
          <table>
            <thead>
              <tr className="project_Header header_title">
                <th className="project_id">№</th>
                <th className="project_name">Projects</th>
                <th className="project_description">Description</th>
                <th className="project_bts">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects?.map((project, i)=>(
                <ProjectItem key={project.id} remove={removeProject} project={project}
                idx={indexOfFirstProject + i + 1} modal={modal1} setModal={setModal1}
                getProject={getProject} getAllProjects={getAllProjects}
                errors={errors} setErrors={setErrors}
                />
              ))}
            </tbody>
          </table>
          {/* PAGINATION */}
          <Pagination
            style={styles.pagination}
            count={Math.ceil(projects?.length / limit)}
            page={page}
            onChange={handleChangePage}
          />
          {/* MODAL FOR CREATE PROJECT */}
          <MyModal visible={modal} setVisible={setModal} setErrors={setErrors}>
            <ProjectForm modal={modal} setModal={setModal} projects={projects} setProjects={setProjects} getAllProjects={getAllProjects}
              errors={errors} setErrors={setErrors}
            />
          </MyModal>

          {/* MODAL FOR UPDATE PROJECT */}
          <MyModal visible={modal1} setVisible={setModal1} setErrors={setErrors}>
            <ProjectUpdForm modal={modal1} setModal={setModal1} currentProject={currentProject} setCurrentProject={setCurrentProject} 
              getAllProjects={getAllProjects} errors={errors} setErrors={setErrors}
            />
          </MyModal>
        </div>
      </div>
      <Footer/>
    </div>
  )
};

export default Projects;