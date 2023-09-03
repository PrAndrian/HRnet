import { useSelector } from "react-redux";
import SeparationUI from "../components/SeparationUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const ListEmployees = () => {
  const listEmployees = useSelector((state) => state.employees.list)
  const valuesColumn = [
    "First Name",
    "Last Name",
    "Date of Birth",
    "Start Date",
    "Department",
    "Street",
    "City",
    "State",
    "Zip Code"
  ]
  console.log(listEmployees)

  return (
    <>
      <h1 className="text-secondary text-[40px] w-[260px]">
        Current Employees
      </h1>
      <SeparationUI/>

      <div className="flex justify-between pt-[32px] pb-[50px]">
          <Link 
            to='/' 
            className="
              flex
              gap-2
              h-[40px] 
              w-[90px]
              bg-tertiary
              rounded
              items-center
              justify-center
          ">
            <FontAwesomeIcon icon={faPlus} />
            New
          </Link>
        
        <SearchBar/>
      </div>

      <table className="flex flex-col grow">
        <thead>
          <tr className="flex h-[45px] items-center bg-tertiary rounded-t-lg">
            {valuesColumn.map((value, index) =>(
              <th 
                key={index}
                className="
                  flex 
                  flex-1 
                  px-2
                  items-start 
                ">
                {value}
              </th>
            ))}
          </tr>
        </thead>
          <tbody>
            {listEmployees.map((employee, index) =>(
              <tr key={index}className="flex">
                {Object.values(employee).map((value)=>(
                  <td key={index} className="
                    flex-1
                    flex
                    items-center
                    w-[130px]
                    h-[60px]
                    px-2
                    border-b 
                    border-[#414A3D] 
                    border-opacity-40 
                  ">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
      </table>
      <SeparationUI/>
    </>
  )
}

export default ListEmployees