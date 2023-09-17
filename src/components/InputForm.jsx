import PropTypes from 'prop-types';

const InputForm = ({id,type,palceholder,setter, isError,value}) => {

    const handleValue = (event) => {
        event.preventDefault();
        setter(event.target.value)
    }

    return (
        <input 
            id={id} 
            type={type} 
            className={`
                rounded-lg
                border
                bg-transparent
                h-[40px]
                p-2
                font-bold
                ${isError ? "border-4 border-red" : "border-[#ccc] "}
            `}
            onChange={handleValue}
            placeholder={palceholder}
            value={value}
        />
    )
}

InputForm.propTypes = {
    id : PropTypes.string.isRequired, 
    type : PropTypes.string.isRequired,
    value : PropTypes.string.isRequired,
    palceholder : PropTypes.string.isRequired, 
    setter : PropTypes.func.isRequired, 
    isError : PropTypes.bool.isRequired, 
}

export default InputForm