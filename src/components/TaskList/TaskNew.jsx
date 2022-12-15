import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { TasksContext } from '../../context/tasks.context'
import apiService from '../../services/api.services'
import TaskForm from './TaskForm'

export default function TaskNew() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { task } = useContext(TasksContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await apiService.addTask({
        ...task,
        user,
      })
      return navigate('/tasks/list')
    } catch (err) {
      console.warn(err.message)
    }
  }

  return <TaskForm handleSubmit={handleSubmit} />
}
