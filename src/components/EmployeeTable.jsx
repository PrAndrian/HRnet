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
                w-[1440px]
                lg:w-[auto]
                h-[439px]
                overflow-x-hidden 
                overflow-y-auto
                border-b 
                border-[#414A3D] 
                border-opacity-40
            ">
            <thead className="sticky top-0">
                <tr className="flex h-[60px] items-center bg-tertiary rounded-t-lg">
                {valuesColumn.map((value, index) =>(
                    <th 
                        key={index}
                        className="
                            flex 
                            flex-1 
                            items-center
                            pl-5
                        "
                    >
                        {value}
                        <div className="flex flex-col pl-4">
                            <FontAwesomeIcon 
                                className={"w-3 h-3 cursor-pointer"} 
                                icon={faChevronUp} 
                            />
                            <FontAwesomeIcon 
                                className={"w-3 h-3 cursor-pointer"} 
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
                        <td key={value} className="
                            flex-1
                            h-[60px]
                            text-ellipsis 
                            overflow-hidden
                            whitespace-nowrap
                            pl-5
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