import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter, Link } from 'react-router-dom'

import App from './App'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import IsPrivate from './components/IsPrivate/IsPrivate'
import IsAnon from './components/IsAnon/IsAnon'

import { AuthProviderWrapper } from './context/auth.context'
import './index.css'
import TasksPage from './pages/TasksPage/TasksPage'
import TaskList from './components/TaskList/TaskList'
import TaskNew from './components/TaskList/TaskNew'
import TaskSingle from './components/TaskList/TaskSingle'
import { TasksProvider } from './context/tasks.context'
import { AlarmProvider } from './context/alarm.context'

const NotFound = () => (
  <div className="text-center mt-32">
    <div className="alert alert-error shadow-lg">
      <div className="mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-2xl">Error 404! Task failed successfully.</span>
      </div>
    </div>
    <div className="text-xl mt-4 underline underline-offset-2">
      <Link to={'/'}>
        Please, go back{' '}
        <span className="text-4xl font-extrabold text-blue-700 hover:text-warning">
          ⌂
        </span>
      </Link>
    </div>
  </div>
)

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <IsAnon>
            <HomePage />
          </IsAnon>
        ),
        index: true,
      },
      {
        path: 'profile',
        element: (
          <IsPrivate>
            <ProfilePage />
          </IsPrivate>
        ),
      },
      {
        path: 'tasks',
        element: (
          <IsPrivate>
            <TasksPage />
          </IsPrivate>
        ),
        children: [
          {
            path: 'list',
            element: <TaskList />,
            index: true,
          },
          {
            path: 'new',
            element: <TaskNew />,
          },
          {
            path: ':taskId',
            element: <TaskSingle />,
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProviderWrapper>
    <AlarmProvider>
      <TasksProvider>
        {/* <MemoryRouter> */}
        <RouterProvider router={router} />
        {/* </MemoryRouter> */}
      </TasksProvider>
    </AlarmProvider>
  </AuthProviderWrapper>
)
