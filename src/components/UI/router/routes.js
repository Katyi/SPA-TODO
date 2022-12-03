// import About from "../../../pages/About"
import Projects from "../../../pages/Projects";
import Tasks from "../../../pages/Tasks";
import SubTasks from "../../../pages/SubTasks";
import Comments from "../../../pages/Comments";
// import AlbumIdPage from "../../../pages/AlbumIdPage"

export const routes =[
  // {path: '/about', component: About, exact: true},
  {path: '/Projects', component: Projects, exact: true},
  {path: '/Projects/:id', component: Tasks, exact: true},
  {path: '/Tasks/:id', component: SubTasks, exact: true},
  {path: '/Comments/:id', component: Comments, exact: true},
]