import React, { useContext } from 'react'
import { minutesNumber, hourNumber } from '../../utils/alarmUtils'
import useSelect from '../../hooks/useSelect'
import { AlarmContext } from '../../context/alarm.context'
import { useNavigate } from 'react-router-dom'
import './AlarmInput.css'

export default function AlarmInput({ taskId }) {
  const navigate = useNavigate()

  const [hour, setHour] = useSelect('Hour')
  const [minutes, setMinutes] = useSelect('Minutes')
  const [amPmOption, setAmPmOption] = useSelect('Am-Pm')
  const { setAlarmTime, setTaskId, pauseAlarm, hasAlarm, setHasAlarm } =
    useContext(AlarmContext)

  const setAlarm = () => {
    if (hasAlarm) {
      pauseAlarm()
      setHasAlarm(false)
      return
    }

    if (
      !hour.includes('Hour') &&
      !minutes.includes('Minutes') &&
      !amPmOption.includes('Am-Pm')
    ) {
      setHasAlarm(true)
      setTaskId(taskId)
      setAlarmTime(`${hour}:${minutes} ${amPmOption}`)

      return navigate('/tasks/list')
    }
  }

  return (
    <div className="option-Container">
      <div className={`wrapper-option ${hasAlarm && 'disable'}`}>
        <select {...setHour}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={minutes}>
              {minutes}
            </option>
          ))}
        </select>
        <select {...setAmPmOption}>
          <option disabled value="Am-Pm">
            Am/Pm
          </option>
          <option value="AM">Am</option>
          <option value="PM">Pm</option>
        </select>
      </div>
      <button
        onClick={setAlarm}
        className={`btn btn-sm btn-warning px-6 m-3 ${hasAlarm && 'play'}`}
      >
        {hasAlarm ? 'Clear' : 'Set'}
      </button>
    </div>
  )
}
