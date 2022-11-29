// import About from "../../../pages/About"
import Projects from "../../../pages/Projects"
import Tasks from "../../../pages/Tasks"
// import AlbumIdPage from "../../../pages/AlbumIdPage"

export const routes =[
  // {path: '/about', component: About, exact: true},
  {path: '/Projects', component: Projects, exact: true},
  {path: '/Projects/:id', component: Tasks, exact: true},
]