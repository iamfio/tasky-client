import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import TaskForm from './TaskForm'

export default function TaskEdit() {
  const [text, setText] = useState('')
  const [description, setDescription] = useState('')
  const [alertTime, setAlertTime] = useState('')

  const handleSubmit = (e) => {}
  return (
    <>
      <TaskForm
        text={text}
        setText={setText}
        description={description}
        setDescription={setDescription}
        alertTime={alertTime}
        setAlertTime={setAlertTime}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
