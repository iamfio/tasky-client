import { createContext, useState } from 'react'

const TasksContext = createContext()

function TasksProvider({ children }) {
  const [task, setTask] = useState(null)

  return (
    <TasksContext.Provider
      value={{
        task,
        setTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksProvider, TasksContext }
