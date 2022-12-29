import React from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './styles/App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </DndProvider>
  );
};

export default App;
