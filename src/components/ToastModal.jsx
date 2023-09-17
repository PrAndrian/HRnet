import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ToastModal = ({ isVisible, message, error, setter }) => {
    
    const handleClick = () => {
        setter(false)
    }

    return (
        <div
            className={`
                fixed right-0 top-20 p-5 text-xl rounded-md transform transition-transform 
                ${isVisible ? ' translate-x-0 ' : ' translate-x-full '} 
                ${error ? " bg-red text-white " : ' bg-primary text-white '}`
            }
        >
            <FontAwesomeIcon 
                className={` 
                    ${isVisible ? 'block' : "invisible"}  
                    border 
                    absolute 
                    top-[-10px] 
                    left-[-10px] 
                    mr-2 
                    p-1 
                    bg-white 
                    rounded-md 
                    text-[#000] 
                    cursor-pointer`
                }

                onClick={handleClick}
                icon={faXmark}
            />
            <span className='pl-2'>{message}</span>
            <br/>
            {!error && <Link className='underline' to="/employees">Check list employees</Link>}
        </div>
    );
}

ToastModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    error: PropTypes.bool,
    setter : PropTypes.func.isRequired,
};

export default ToastModal