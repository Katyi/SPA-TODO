import React, { useState } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';


const SubTasksList = ({ task }) => {
  // let arr = [];
  // arr = task.subtasks.length!==0 ? arr.push(task.subtasks) : arr;
  // arr.push(task.subtasks);
  console.log(task.subtasks);
  if (!task.subtasks) {
    return <div>Подзадач нет!</div>
  } else {
    return (
      task.subtasks.map((elem, index) => {
        <div className='subTasksList'>
          <div key={index}>
            <div >{index + 1}</div>
            <div>{elem}</div>
            <br />
          </div>
        </div >
      })
    )
  }
}

export default SubTasksList;