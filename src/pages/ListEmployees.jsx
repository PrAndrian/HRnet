import SeparationUI from "../components/SeparationUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import { useSelector } from "react-redux";
import ShowingRowTable from "../components/ShowingRowTable";
import PaginationTable from "../components/PaginationTable";
import { useState } from "react";

const ListEmployees = () => {
  const listEmployees = useSelector((state) => state.employees.list) 
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listEmployees.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Revenir à la première page lorsque le nombre d'éléments par page change
  };

  return (
    <>
      <h1 className="text-secondary text-[40px] w-[260px]">
        Current Employees
      </h1>
      <SeparationUI/>

      <div className="
        flex 
        justify-between 
        items-center 
        pt-[32px] 
        pb-[50px]
      ">
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
      
      <div className="overflow-y-hidden overflow-x-auto grow">
        <EmployeeTable listEmployees={currentItems}/>
      </div>

      <footer className="
        flex
        justify-between
        items-centers
        py-6
        h-[105px]
        border-t 
        border-[#414A3D] 
        border-opacity-40
      ">
        <ShowingRowTable
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
        <PaginationTable
          totalItems={listEmployees.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </footer>
    </>
  )
}

export default ListEmployees