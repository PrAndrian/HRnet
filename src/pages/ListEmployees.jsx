import SeparationUI from "../components/SeparationUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
// import { useSelector } from "react-redux"; // A dé/commenter selon les data que vous utilisez
import ShowingRowTable from "../components/ShowingRowTable";
import PaginationTable from "../components/PaginationTable";
import { useState } from "react";
import employees from "../data/employeeMock"

const ListEmployees = () => {
  // const listEmployees = useSelector((state) => state.employees.list) 
  const listEmployees = employees

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setSearchResults] = useState(listEmployees); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Définition des colonnes du tableau
    const columns = [
      { label: "First Name", value: "firstName" },
      { label: "Last Name", value: "lastName" },
      { label: "Birthday", value: "birthdate" },
      { label: "Start Date", value: "startDate" },
      { label: "Department", value: "department" },
      { label: "Street", value: "street" },
      { label: "City", value: "city" },
      { label: "State", value: "state" },
      { label: "Zip Code", value: "zipCode" }
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleSearch = (searchTerm) => {
    if(searchTerm===''){
      setSearchResults(listEmployees)
      return;
    }

    const filteredResults = listEmployees.filter((employee) =>{
      return Object.values(employee).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setSearchResults(filteredResults);
    setCurrentPage(1);
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
        
        <SearchBar 
          id={"table"}
          onSearch={handleSearch} 
          width="300px" 
          height="45px"
          placeHolder={'Search'}
          borderColor={'#414A3D'}
          backgroundColor={'transparent'}
        />
      </div>
      
      <div className="overflow-y-hidden overflow-x-auto grow">
        <EmployeeTable 
          headColumns={columns}
          listEmployees={
            currentItems.slice(indexOfFirstItem, indexOfLastItem)
          }
          headerBgColor={'tertiary'} 
          sortedColumnColor ={'secondary'}
          minWidth={'1440px'}
          height={'500px'}
        />
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
          totalItems={listEmployees.length}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          height={'[40px]'}
          labelColor="[#414A3D]" // Couleur de l'étiquette "Show"
          selectBorderColor={'[#414A3D]'} // Couleur de la bordure du select
          selectBackgroundColor="transparent" // Couleur de fond du select
          selectTextColor="[#414A3D]" // Couleur du texte du select
          selectCursor="[#414A3D]" // Type de curseur pour le select
          spanTextColor="[#414A3D]" // Couleur du texte dans la balise <span>
        />
        <PaginationTable
          totalItems={currentItems.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          activeButtonColor={'tertiary'} // Couleur du bouton actif
          hoverButtonColor={'tertiary'} // Couleur du bouton en survol
          width="[370px]"
          height="[45px]"
        />
      </footer>
    </>
  )
}

export default ListEmployees