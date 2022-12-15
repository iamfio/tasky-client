import { Outlet } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'

export default function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
