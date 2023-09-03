import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <div className='flex'>
        <Navbar/>
        <main className="flex flex-col mx-[24px] mt-[102px] mb-[105px] w-full">
          <Outlet/>
        </main>
    </div>
    </>
  )
}

export default Layout