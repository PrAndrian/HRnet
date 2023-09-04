import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types';

const EmployeeTable = ({listEmployees}) => {
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
    return (
        <table className="
            flex 
            flex-col 
            grow
            h-[439px]
            overflow-x-hidden 
            overflow-y-auto
            last:border-b 
            last:border-[#414A3D] 
            last:border-opacity-40
        ">
        <thead className="sticky top-0">
            <tr className="flex h-[60px] items-center bg-tertiary rounded-t-lg ">
            {valuesColumn.map((value, index) =>(
                <th 
                key={index}
                className="
                    flex 
                    flex-1 
                    pl-4
                    last:pr-4
                    items-center 
                ">
                {value}
                <div className="flex flex-col pl-4">
                    <FontAwesomeIcon 
                        className={"w-3 h-3"} 
                        icon={faChevronUp} 
                    />
                    <FontAwesomeIcon 
                        className={"w-3 h-3"} 
                        icon={faChevronDown} 
                    />
                </div>
                </th>
            ))}
            </tr>
        </thead>
        <tbody 
            >
            {listEmployees.map((employee, index) =>(
            <tr 
                key={index}
                className="
                flex                   
                border-b 
                last:border-b-0 
                border-[#414A3D] 
                border-opacity-40 
                ">
                {Object.values(employee).map((value)=>(
                <td key={index} className="
                    flex
                    flex-1
                    items-center
                    w-[130px]
                    h-[60px]
                    px-4
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
    listEmployees : PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string || PropTypes.number))
}

export default EmployeeTable