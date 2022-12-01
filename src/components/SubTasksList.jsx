import React, { useState } from "react";
import { doc, getDoc} from 'firebase/firestore';
import { db } from '../firebase';


const SubTasksList = ({ task }) => {
  // const [arr, setArr] = useState([]);
  // let queueTasks;
  let task1 = task.subtasks;
  let arr = [];
  let arr1 = [];
  // arr = task.subtasks.length!==0 ? arr.push(task.subtasks) : arr;
  // arr.push(task.subtasks);
  // console.log(task.subtasks.length);
  if (!task.subtasks) {
    return <div>Подзадач нет!</div>
  }
  else {
    for (let i = 0; i < task1.length; i++) {
      
      firebaseQuery(task1[i]);
      // console.log(arr1[i]);
    }

    async function firebaseQuery(subtask) {
      const docRef = doc(db, "tasks", subtask);
      const docSnap = await getDoc(docRef);
      arr1.push(docSnap.data());
      // setArr(docSnap.data());
      
      // console.log(arr1);
      // return arr;
    }
    console.log(arr1);
    return (
      // arr.map((elem, index) => {
        
        // <div className='subTasksList'>
          /* <div key={index}> */
            /* <div >{index + 1}</div> */
            /* <div>{arr1}</div> */
            // <br />
          /* </div> */
        // </div >
      // }
      // )
    <div>Тут есть подзадачи</div>


      // <div>{task1.subtasks}</div>
      // <div>{queueTasks}</div>

    )
  }
  
}

export default SubTasksList;