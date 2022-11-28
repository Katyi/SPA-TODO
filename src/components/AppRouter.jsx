import React from 'react'
import { Route, Routes } from "react-router-dom";
import Projects from '../pages/Projects';
import { routes } from './UI/router/routes';

export default function AppRouter() {
  return (
    <Routes>
      {routes.map(route =>
        <Route
          element={<route.component/>}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      )}
      <Route path="/*" element={<Projects/>}/>
    </Routes>
  )
}
