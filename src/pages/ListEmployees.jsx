import SeparationUI from "../components/SeparationUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import { useSelector } from "react-redux";

const ListEmployees = () => {
  const listEmployees = useSelector((state) => state.employees.list)
  return (
    <>
      <h1 className="text-secondary text-[40px] w-[260px]">
        Current Employees
      </h1>
      <SeparationUI/>

      <div className="flex justify-between items-center pt-[32px] pb-[50px]">
          <Link 
            to='/' 
            className="
              flex
              gap-2
              h-[45px] 
              w-[90px]
              bg-tertiary
              rounded
              items-center
              justify-center
              font-semibold
          ">
            <FontAwesomeIcon icon={faPlus} />
            New
          </Link>
        
        <SearchBar id={"searchEmployees"} setter={()=>{}}/>
      </div>
      <EmployeeTable listEmployees={listEmployees}/>
    </>
  )
}

export default ListEmployees