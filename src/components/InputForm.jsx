import PropTypes from 'prop-types';

const InputForm = ({id,type,palceholder,setter, isError}) => {

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
                border-[#414A3D] 
                border-opacity-40 
                bg-transparent
                h-[40px]
                p-2
                font-bold
                ${isError ? "border border-4 border-red" : ""}
            `}
            onChange={handleValue}
            placeholder={palceholder}
        />
    )
}

InputForm.propTypes = {
    id : PropTypes.string.isRequired, 
    type : PropTypes.string.isRequired,
    palceholder : PropTypes.string.isRequired, 
    setter : PropTypes.func.isRequired, 
    isError : PropTypes.bool.isRequired, 
}

export default InputForm