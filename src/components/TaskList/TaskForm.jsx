import { useContext } from 'react'
import { TasksContext } from '../../context/tasks.context'
import AlarmInput from '../Alarm/AlarmInput'

export default function TaskForm({ handleSubmit, isEdit }) {
  const { task, setTask } = useContext(TasksContext)

  const taskId = task?._id

  const handleChange = (e) => {
    const { name, value } = e.target

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit}>
        <div className="form-control py-4">
          <input
            type="text"
            name="text"
            placeholder="Task"
            className="input input-bordered w-full my-2"
            value={'' || (isEdit && task?.text)}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full my-2"
            value={'' || (isEdit && task?.description)}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-outline btn-primary my-2">
            {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
      <div className="text-center">
        <AlarmInput taskId={taskId} />
      </div>
    </div>
  )
}
