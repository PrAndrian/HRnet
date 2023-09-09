import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types';
import { useState } from "react";

const EmployeeTable = ({listEmployees}) => {
    const columns = [
        { label: "First Name", value: "firstName" },
        { label: "Last Name", value: "lastName" },
        { label: "Birthday", value: "birthdate" },
        { label: "Start Date", value: "startDate" },
        { label: "Department", value: "departement" },
        { label: "Street", value: "street" },
        { label: "City", value: "city" },
        { label: "State", value: "state" },
        { label: "Zip Code", value: "zipCode" }
    ];

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const sortData = (data, columnIndex, order) => {
        if(sortColumn === null){
            setSortColumn("firstName") 
        }

        return data.sort((a, b) => {
            const valueA = a[columnIndex]
            const valueB = b[columnIndex]

            if (order === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });
    };

    const handleSortClick = (columnIndex,order) => {
        setSortColumn(columnIndex);
        setSortOrder(order);
    };


    const sortedData = sortColumn !== null ? 
        sortData([...listEmployees], sortColumn, sortOrder) 
        : sortData([...listEmployees], "firstName", "asc")

    return (
        <table className="
                flex 
                flex-col 
                grow
                w-[1440px]
                lg:w-[auto]
                h-[500px]
                overflow-x-hidden 
                overflow-y-auto
            ">
            <thead className="sticky top-0">
                <tr className="flex h-[60px] items-center bg-tertiary rounded-t-lg">
                {columns.map((column) =>(
                    <th 
                        key={column.value}
                        className="
                            flex 
                            flex-1 
                            items-center
                            pl-5
                        "
                    >
                        {column.label}
                        <div className="flex flex-col pl-4">
                            <FontAwesomeIcon 
                                className={`w-3 h-3 cursor-pointer 
                                    ${ sortColumn === column.value && sortOrder==='asc'
                                        ? "text-red" : ""
                                    }
                                `} 
                                icon={faChevronUp} 
                                onClick={() => handleSortClick(column.value,'asc')}
                            /> 
                        
                            <FontAwesomeIcon 
                                className={`w-3 h-3 cursor-pointer
                                    ${  sortColumn === column.value && sortOrder==='desc'
                                        ? "text-red" : ""
                                    }
                                `} 
                                icon={faChevronDown}
                                onClick={() => handleSortClick(column.value,'desc')}
                            />     
                        </div>
                    </th>
                ))}
                </tr>
            </thead>
            <tbody 
                >
                {sortedData.map((employee, index) =>(
                <tr 
                    key={index}
                    className="
                        flex                  
                        border-b 
                        border-[#414A3D] 
                        border-opacity-40
                    ">
                    {Object.values(employee).map((value,i)=>(
                        <td key={value+i} className="
                            flex-1
                            h-[60px]
                            text-ellipsis 
                            overflow-hidden
                            whitespace-nowrap
                            pl-5
                            pt-4
                        ">
                        {value}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    )
}

EmployeeTable.propTypes = {
    listEmployees : PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string || PropTypes.number)),
}

export default EmployeeTable