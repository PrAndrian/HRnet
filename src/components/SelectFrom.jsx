import PropTypes from 'prop-types';

const SelectFrom = ({id,options,setter,isError}) => {
    
    const handleValue = (event) => {
        event.preventDefault();
        setter(event.target.value)
    }

    return (
        <select 
            name={id} 
            id={id}
            className={`
                rounded-lg
                border
                border-[#414A3D] 
                border-opacity-40 
                bg-transparent
                h-[40px]
                px-2
                font-bold
                ${isError ? "border border-4 border-red" : ""}
            `}
            onChange={handleValue}
        >
            <option value="">Choisir...</option>
            {options.map((option,i)=>(
                <option 
                    key={i}
                    value={option.name}
                >
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
    setter : PropTypes.func.isRequired,
    isError : PropTypes.bool.isRequired, 
}

export default SelectFrom