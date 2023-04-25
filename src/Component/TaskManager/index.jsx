import React, { useEffect, useState } from 'react'
import TaskInput from '../TaskInput/index'
import TaskTable from '../TaskTable/index'

const Index = () => {
  const [task,setTask]=useState([])

  const getTask=(data)=>{
    setTask([...task,data])
  }

  return (
    <div className='taskManager'>
      <h1>Task Manager</h1>
        <TaskInput getTask={getTask} />
       {task?.length>0&& <TaskTable Task={task}/>}
    </div>
  )
}

export default Index
