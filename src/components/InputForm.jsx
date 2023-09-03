import PropTypes from 'prop-types';

const InputForm = ({id,type,palceholder,setter}) => {

    const handleValue = (event) => {
        event.preventDefault();
        setter(event.target.value)
    }

    return (
        <input 
            id={id} 
            type={type} 
            className="
                rounded-lg
                border
                border-[#414A3D] 
                border-opacity-40 
                bg-transparent
                h-[40px]
                p-2
                font-bold
            " 
            onChange={handleValue}
            placeholder={palceholder}
        />
    )
}

InputForm.propTypes = {
    id : PropTypes.string.isRequired, 
    type : PropTypes.string.isRequired,
    palceholder : PropTypes.string.isRequired, 
    setter : PropTypes.func.isRequired 
}

export default InputForm