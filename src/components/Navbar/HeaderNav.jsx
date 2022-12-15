import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

export default function HeaderNav() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext)

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to={''}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={'login'}>Login</NavLink>
                </li>
                <li>
                  <NavLink to={'signup'}>Signup</NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to={'tasks'}>Tasks</NavLink>
                </li>
                <li>
                  <NavLink to={'profile'}>Profile</NavLink>
                </li>
                <li>
                  <button onClick={logOutUser} className="text-gray-400">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          to={isLoggedIn ? 'tasks' : '/'}
          className="btn btn-ghost normal-case text-xl"
        >
          Tasky
        </Link>
      </div>
      <div className="navbar-end">
        {isLoggedIn && (
          <Link to="profile">
            <img
              src={user.userpic}
              alt=""
              className="h-10 w-10 border-4 border-secondary-content rounded-full"
            />
          </Link>
        )}
      </div>
    </div>
  )
}
