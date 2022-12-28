// import About from "../../../pages/About"
import Projects from "../../../pages/Projects";
import Tasks from "../../../pages/Tasks";
import SubTasks from "../../../pages/SubTasks";
import Comments from "../../../pages/Comments";
import ProjectForm from "../../ProjectForm";
import ProjectUpdForm from "../../ProjectUpdForm";
import TaskForm from "../../TaskForm";
import TaskUpdForm from "../../TaskUpdForm";
import SubTaskForm from "../../SubTaskForm";

export const routes =[
  // {path: '/about', component: About, exact: true},
  {path: '/Projects', component: Projects, exact: true},
  {path: '/Projects/:id', component: Tasks, exact: true},
  {path: '/Tasks/:id', component: SubTasks, exact: true},
  {path: '/Comments/:id', component: Comments, exact: true},
  {path: '/CreateProject', component: ProjectForm, exact: true},
  { path: '/UpdateProject', component: ProjectUpdForm, exact: true},
  { path: '/CreateTask', component: TaskForm, exact: true},
  { path: '/UpdateTask', component: TaskUpdForm, exact: true },
  { path: '/CreateSubTask', component: SubTaskForm, exact: true},
]

