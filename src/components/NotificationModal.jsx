import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

const NotificationModal = ({ isVisible, message, error, setter }) => {
    
    const handleClick = useCallback(event => {
        if (event.target.id || event.target.icon) {
            setter(false)
        }
    },[setter])

    return (
        <div id={'modal'} 
            onClick={(event)=>handleClick(event)} 
            className={`
                ${isVisible ? 'block' : 'hidden'} 
                absolute 
                left-0 
                top-0 
                h-[100%] 
                w-[100%] 
                flex 
                justify-center 
                items-center 
                bg-black 
                z-50
                bg-opacity-80
            `}
        >
            <div
                className={`
                relative 
                p-5 
                text-xl 
                rounded-md
                ${error ? " bg-red text-white " : ' bg-primary text-white '}`
            }>
                <button 
                    id={'buttonCloseModal'} 
                    className={` 
                        ${isVisible ? 'visible' : "invisible"}  
                        flex
                        border 
                        absolute 
                        top-[-10px] 
                        left-[-10px]
                        bg-white 
                        p-1
                        rounded-md 
                        text-[#000]
                        cursor-pointer`
                    }
                >
                    <FontAwesomeIcon id={'iconCloseModal'} icon={faXmark}/>
                </button>
                <span className='pl-2'>{message}</span>
                <br/>
                {!error && <Link className='underline' to="/employees">Check list employees</Link>}
            </div>
        </div>
    );
}

NotificationModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    error: PropTypes.bool,
    setter : PropTypes.func.isRequired,
};

export default NotificationModal