import React, { useContext } from 'react'
import TaskBoard from '../components/reusable/TaskBoard'
import { OverallContext } from '../components/context/Overall'
import { mytasks } from '../components/utils/demo_data';
export default function MyTasks() {
    const {setMyTasks} = useContext(OverallContext);
  return (
    <TaskBoard data={mytasks} setData={setMyTasks} title={"My Tasks"}/>
  )
}
