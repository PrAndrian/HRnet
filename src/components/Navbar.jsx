import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo_wealth_Health.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faGear, faHouse, faSuitcase } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <nav className="
      flex 
      flex-col 
      items-center 
      w-[240px] 
      h-screen 
      border-r
      border-opacity-40
      border-[#414A3D]
      relative
    ">
      <div className='
        absolute 
        top-[45px] 
        right-[-15px] 
        border 
        border-opacity-40
        border-[#414A3D] 
        rounded-md 
        px-1 
        bg-[#F8FFEC]
        cursor-pointer
      '>
        <FontAwesomeIcon icon={faChevronUp} className='rotate-[-90deg]' />
      </div>

      <Link to="/" >
        <div className='flex items-center mt-[119px] mb-[55px]'>
          <img className="w-[40px] h-[40px]" src={Logo}/>
          <span className='text-[40px] text-[#596F06]'>HRnet</span>
        </div>
      </Link>
      
      <div className='flex grow flex-col gap-[14px]'>
        <NavLink 
        to="/" 
        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 
          "flex items-center w-[170px] font-medium  p-2 p-2 bg-secondary rounded-lg text-white" 
        : 
          "flex items-center w-[170px] font-medium  p-2 hover:bg-secondary hover:rounded-lg hover:text-white"}
        >
          <FontAwesomeIcon 
            icon={faHouse} 
            className='pr-[10px] w-[26px] h-[26px]'
          />
          Home
        </NavLink>

        <NavLink 
          to="/employees" 
          className={({ isActive, isPending }) => isPending ? "pending" : isActive ? 
            "flex items-center w-[170px] font-medium  p-2 p-2 bg-secondary rounded-lg text-white" 
          : 
            "flex items-center w-[170px] font-medium  p-2 hover:bg-secondary hover:rounded-lg hover:text-white"}>
          <FontAwesomeIcon 
            icon={faSuitcase} 
            className='pr-[10px] w-[26px] h-[26px]'
          />
          Employees
        </NavLink>

      </div>

      <footer className='
        flex 
        w-[170px] 
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