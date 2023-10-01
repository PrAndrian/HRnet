import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { useState } from "react";

const EmployeeTable = ({ headColumns,listEmployees,minWidth,height, headerBgColor, sortedColumnColor }) => {

    // État pour le tri
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    function isDate(string) {
        const date = new Date(string);
        return !isNaN(date.getTime());
    }
      

    // Fonction pour trier les données
    const sortData = (data, columnIndex, order) => {
        if (sortColumn === null) {
            setSortColumn("firstName");
        }
        
        return data.sort((a, b) => {
            const valueA = a[columnIndex];
            const valueB = b[columnIndex];

            if(isDate(valueA) || isDate(valueB)){
                const DateA = new Date(a[columnIndex]);
                const DateB = new Date(b[columnIndex]);

                return order === 'asc' ? 
                    DateA - DateB 
                : 
                    DateB - DateA;
            }

            return order === 'asc' ? 
                valueA.localeCompare(valueB) 
            : 
                valueB.localeCompare(valueA);
        });
    };

    // Gestion du clic sur l'en-tête de colonne pour le tri
    const handleSortClick = (columnIndex, order) => {
        setSortColumn(columnIndex);
        setSortOrder(order);
    };

    // Tri des données
    const sortedData = sortColumn !== null ?
        sortData([...listEmployees], sortColumn, sortOrder) :
        sortData([...listEmployees], "firstName", "asc");

    return (
        <table className={`
            flex 
            flex-col 
            grow
            lg:w-auto
            overflow-x-hidden 
            overflow-y-auto
        `}
            style={{height: height,minWidth: minWidth}}
        >
            <thead className={`sticky top-0 bg-${headerBgColor}`}>
                <tr className="flex h-[60px] items-center rounded-t-lg">
                    {headColumns.map((column) => (
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
                                        ${sortColumn === column.value && sortOrder === 'asc'
                                        ? `text-${sortedColumnColor}` : ""
                                        }
                                    `}
                                    icon={faChevronUp}
                                    onClick={() => handleSortClick(column.value, 'asc')}
                                />
                                <FontAwesomeIcon
                                    className={`w-3 h-3 cursor-pointer
                                        ${sortColumn === column.value && sortOrder === 'desc'
                                        ? `text-${sortedColumnColor}` : ""
                                        }
                                    `}
                                    icon={faChevronDown}
                                    onClick={() => handleSortClick(column.value, 'desc')}
                                />
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
                {sortedData.length === 0 ?
                    <tbody className="w-full my-20 text-xl font-bold flex justify-center items-center">
                        <tr>
                            <td>
                                Empty Table
                            </td>        
                        </tr>
                    </tbody> 
                    :
                    <tbody>
                        {sortedData.map((employee, index) => (
                            <tr
                                key={index}
                                className="
                                    flex                  
                                    border-b 
                                    border-[#414A3D] 
                                    border-opacity-40
                                ">
                                {Object.values(employee).map((value, i) => (
                                    <td key={value + i} className="
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
                }
        </table>
    );
}

EmployeeTable.propTypes = {
    listEmployees: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string || PropTypes.number)),
    headerBgColor: PropTypes.string, // Couleur de fond de l'en-tête
    sortedColumnColor: PropTypes.string, // Couleur de l'icône de colonne triée
    headColumns : PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    minWidth : PropTypes.string,
    height : PropTypes.string,
}
export default EmployeeTable;
