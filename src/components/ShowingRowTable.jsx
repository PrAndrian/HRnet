import PropTypes from 'prop-types';

const ShowingRowTable = ({setter,listEmployees}) => {
    const handleValue = (event) => {
        event.preventDefault();
        setter(event.target.value)
    }

    console.log(listEmployees)

    return (
    <span>
        Show 
        &nbsp;
        <select 
            name={"selectRows"} 
            id={"selectRows"}
            className="
                rounded-lg
                border
                border-[#414A3D] 
                border-opacity-40 
                bg-transparent
                h-[40px]
                px-2
                font-bold
                cursor-pointer
            " 
            onChange={handleValue}
        >
            <option>10 rows</option>
            <option>25 rows</option>
            <option>50 rows</option>
            <option>100 rows</option>
        </select>
        &nbsp; 
        1-10 of 50
    </span>
    )
}

ShowingRowTable.propTypes = {
    setter : PropTypes.func.isRequired,
    listEmployees : PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string || PropTypes.number))
}


export default ShowingRowTable