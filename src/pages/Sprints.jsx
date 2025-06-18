import { useContext } from 'react'
import TaskBoard from '../components/reusable/TaskBoard'
import { sprints } from '../components/utils/demo_data'
import { OverallContext } from '../components/context/Overall'

export default function Sprints() {
    const {setSprints} = useContext(OverallContext)
  return (
   <TaskBoard data={sprints} setData={setSprints} title={"Sprints Overview"}/>
  )
}
