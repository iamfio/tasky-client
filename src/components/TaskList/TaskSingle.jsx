import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { AuthContext } from '../../context/auth.context'
import { TasksContext } from '../../context/tasks.context'
import apiService from '../../services/api.services'

import TaskForm from './TaskForm'

export default function TaskSingle() {
  const navigate = useNavigate()
  const { taskId } = useParams()

  const { user } = useContext(AuthContext)
  const { task, setTask } = useContext(TasksContext)

  const [edit, setEdit] = useState(false)

  const handleDelete = async () => {
    await apiService.deleteTask({ taskId, user })
    return navigate('/tasks/list')
  }

  const handleClickDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmDialog onClose={onClose} handleDelete={handleDelete} />
      ),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await apiService.updateTask({
        taskId,
        ...task,
        user,
      })
      return navigate('/tasks/list')
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    const getTaskById = async (id) => {
      try {
        const { data } = await apiService.getTaskById(id)
        setTask(data)
      } catch (err) {
        console.warn(err.message)
      }
    }
    getTaskById(taskId)
  }, [taskId, setTask])

  return (
    <div className="flex flex-col w-full py-2 px-3 my-4 border rounded-lg shadow-sm hover:shadow-lg shadow-primary-content hover:shadow-primary-content ">
      <h3 className="mb-1 text-lg text-primary font-bold capitalize">
        {task?.text}
      </h3>
      <p className="text-sm">{task?.description}</p>
      <div className="pt-2">
        <code className="text-xs text-gray-400">
          {task?.alertTime || 'alarm not set'}
        </code>
      </div>
      <div className="flex-row ">
        <div className="action-buttons">
          <button
            onClick={() => setEdit((current) => !current)}
            className="btn btn-xs btn-outline my-2 mr-2"
          >
            Edit
          </button>

          <button
            onClick={handleClickDelete}
            className="btn btn-xs btn-outline btn-warning my-2"
          >
            Delete
          </button>
        </div>

        {edit && (
          <TaskForm
            taskId={taskId}
            text={task?.text}
            description={task?.description}
            alertTime={task?.alertTime}
            setTask={setTask}
            handleSubmit={handleSubmit}
            isEdit
          />
        )}
      </div>
    </div>
  )
}

const ConfirmDialog = ({ onClose, handleDelete }) => (
  <div className="py-2 px-3 my-4 border rounded-lg shadow-sm hover:shadow-lg shadow-primary-content hover:shadow-primary-content text-center">
    <h1 className="text-xl text-primary">Are you sure?</h1>
    <p className="py-2">You want to delete this task?</p>
    <div className="text-center">
      <button onClick={onClose} className="btn btn-info p-2 mr-2">
        No
      </button>
      <button
        onClick={() => {
          handleDelete()
          onClose()
        }}
        className="btn btn-warning p-2"
      >
        Yes
      </button>
    </div>
  </div>
)
