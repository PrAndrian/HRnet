import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo_wealth_Health.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faGear, faHouse, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className={`
      z-50
      bg-white
      md:bg-transparent
      flex 
      flex-col 
      items-center
      px-2
      md:px-0
      w-fit
      md:w-[240px] 
      h-screen 
      border-r
      border-opacity-40
      border-[#414A3D]
      fixed
      md:relative
      ${ !isOpen ? 'left-[-14%] md:left-0' : 'left-0'}`}
    >
      <div className='
        absolute 
        top-[45px] 
        right-[-18px] 
        md:right-[-15px] 
        border 
        border-opacity-40
        border-[#414A3D] 
        rounded-md 
        px-1 
        bg-[#F8FFEC]
        cursor-pointer
      '
      onClick={()=>setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faChevronUp} className={`${isOpen ? "rotate-[-90deg]" : "rotate-[90deg]"}`} />
      </div>

      <Link to="/" >
        <div className='flex items-center mt-[119px] mb-[55px]'>
          <img className="w-[40px] h-[40px]" src={Logo}/>
          <span className='hidden md:block text-[40px] text-[#596F06]'>HRnet</span>
        </div>
      </Link>
      
      <div className='flex grow flex-col gap-[14px]'>
        <NavLink 
        to="/" 
        onClick={()=>setIsOpen(false)}
        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 
          "flex items-center w-fit md:w-[170px] font-medium  p-2 bg-secondary rounded-lg text-white" 
        : 
          "flex items-center w-fit md:w-[170px] font-medium  p-2 hover:bg-secondary hover:rounded-lg hover:text-white"}
        >
          <FontAwesomeIcon 
            icon={faHouse} 
            className='md:pr-[10px] w-[26px] h-[26px]'
          />
          <span className='hidden md:block'>Home</span>
        </NavLink>

        <NavLink 
          to="/employees" 
          onClick={()=>setIsOpen(false)}
          className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 
            "flex items-center ww-fit md:w-[170px] font-medium  p-2 p-2 bg-secondary rounded-lg text-white" 
          : 
            "flex items-center w-fit md:w-[170px] font-medium  p-2 hover:bg-secondary hover:rounded-lg hover:text-white"}>
          <FontAwesomeIcon 
            icon={faSuitcase} 
            className='md:pr-[10px] w-[26px] h-[26px]'
          />
          <span className='hidden md:block'>Employees</span>
        </NavLink>

      </div>

      <footer className='
        flex
        w-fit 
        md:w-[170px] 
        justify-center 
        border-t 
        mb-[45px]       
        border-opacity-40
        border-[#414A3D]'
      >
        <FontAwesomeIcon icon={faGear} className='w-[28px] h-[28px] mt-[32px] ' />
      </footer>
    </nav>
  )
}

export default Navbar