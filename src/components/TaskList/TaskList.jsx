import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import apiService from '../../services/api.services'

import EmptyTaskListAlert from '../Alert/EmptyListAlert'
import TaskListItem from './TaskListItem'

export default function TaskList() {
  const { user } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await apiService.getTasks(user?._id)
        setTasks(data)
      } catch (err) {
        console.warn(err.message)
      }
    }

    getTasks()
  }, [user])

  return (
    <>
      {!tasks.length && <EmptyTaskListAlert />}

      <ul className="my-4 p-1 w-full">
        {tasks?.map((task) => (
          <TaskListItem key={task._id} {...task} />
        ))}
      </ul>
    </>
  )
}
