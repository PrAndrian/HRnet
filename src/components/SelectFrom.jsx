import PropTypes from 'prop-types';

const SelectFrom = ({id,options,setter}) => {
    
    const handleValue = (event) => {
        event.preventDefault();
        setter(event.target.value)
    }

    return (
        <select 
            name={id} 
            id={id}
            className="
                rounded-lg
                border
                border-[#414A3D] 
                border-opacity-40 
                bg-transparent
                h-[40px]
                px-2
                font-bold
            " 
            onChange={handleValue}
        >
            {options.map((option,i)=>(
                <option key={i}>
                    {option.name}
                </option>
            ))}
        </select>
    )
}

SelectFrom.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.objectOf(
            PropTypes.string
        )
    ).isRequired,
    setter : PropTypes.func.isRequired
}

export default SelectFrom