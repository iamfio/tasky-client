import React, { createContext, useEffect, useState } from 'react'
import { months } from '../month'
import Sound from '../assets/alarm01.wav'
import apiService from '../services/api.services'

const alarm = new Audio(Sound)
const AlarmContext = createContext()

function AlarmProvider({ children }) {
  const [hourDigital, setHourDigital] = useState('')
  const [minutesDigital, setMinutesDigital] = useState('')
  const [amPm, setAmPm] = useState('')
  const [dayNow, setDayNow] = useState('')
  const [monthNow, setMonthNow] = useState('')
  const [yearNow, setYearNow] = useState('')
  const [alarmTime, setAlarmTime] = useState('')
  const [hasAlarm, setHasAlarm] = useState(false)
  const [isAlarm, setIsAlarm] = useState(false)

  const [taskId, setTaskId] = useState('')

  useEffect(() => {
    setInterval(() => {
      const date = new Date()

      let HH = date.getHours()
      let MM = date.getMinutes()
      let day = date.getDate()
      let month = date.getMonth()
      let year = date.getFullYear()
      let ampm

      if (HH >= 12) {
        HH = HH - 12
        ampm = 'PM'
      } else {
        ampm = 'AM'
      }

      if (HH === 0) HH = 12
      if (HH < 10) HH = `0${HH}`
      if (MM < 10) MM = `0${MM}`

      setHourDigital(HH)
      setMinutesDigital(MM)
      setAmPm(ampm)
      setDayNow(day)
      setMonthNow(months[month])
      setYearNow(year)
    }, 1000)
  }, [])
  const updateTaskAlarm = async () => {
    await apiService.updateTask({ taskId, alertTime: alarmTime })
  }

  if (alarmTime && taskId) {
    updateTaskAlarm()
  }

  if (alarmTime === `${hourDigital}:${minutesDigital} ${amPm}`) {
    setIsAlarm(true)
    alarm.play()
    alarm.loop = true
    setAlarmTime('')
  }

  const pauseAlarm = () => {
    alarm.pause()
    setAlarmTime('')
    updateTaskAlarm()
  }

  return (
    <AlarmContext.Provider
      value={{
        hourDigital,
        minutesDigital,
        amPm,
        dayNow,
        monthNow,
        yearNow,
        alarmTime,
        setAlarmTime,
        pauseAlarm,
        hasAlarm,
        setHasAlarm,
        setTaskId,
        isAlarm,
        setIsAlarm,
      }}
    >
      {children}
    </AlarmContext.Provider>
  )
}

export { AlarmProvider, AlarmContext }
