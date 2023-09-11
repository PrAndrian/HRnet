import PropTypes from 'prop-types';

const DatePicker = ({setter, isError}) => {

    const handleValue = (event) => {
        event.preventDefault();
        setter(event.target.value)
    }

    return (
        <input 
            id={'datepicker'} 
            type={'date'} 
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
            placeholder="dd-mm-yyyy"
        />
    )
}

DatePicker.propTypes = {
    setter : PropTypes.func.isRequired, 
    isError : PropTypes.bool.isRequired, 
}

export default DatePicker