import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <div className='flex h-screen'>
        <Navbar/>
        <main className="flex flex-col mx-[24px] mt-[102px] w-screen">
          <Outlet/>
        </main>
    </div>
    </>
  )
}

export default Layout