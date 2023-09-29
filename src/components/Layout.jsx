import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <div className='flex h-screen'>
        <Navbar/>
        <main className="flex flex-col px-[15px] md:px-[24px] pt-[102px] w-screen">
          <Outlet/>
        </main>
    </div>
    </>
  )
}

export default Layout