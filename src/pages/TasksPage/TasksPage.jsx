import { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Quotes from '../../components/Quotes/Quotes'
import { AuthContext } from '../../context/auth.context'

export default function TasksPage() {
  const {user} = useContext(AuthContext)
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mt-12 mb-10">
        <span className='capitalize'>{user?.fullName}</span>, let's make your day better!
      </h1>

      <ul className="tabs">
        <li>
          <NavLink
            to={'/tasks/list'}
            className={({ isActive }) =>
              isActive
                ? 'tab tab-lg tab-lifted tab-active text-primary'
                : 'tab tab-lg tab-lifted'
            }
          >
            All Tasks
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/tasks/new'}
            className={({ isActive }) =>
              isActive
                ? 'tab tab-lg tab-lifted tab-active text-primary'
                : 'tab tab-lg tab-lifted'
            }
          >
            New Task
          </NavLink>
        </li>
      </ul>
      
      
      <Quotes />

      <Outlet />
    </div>
  )
}
