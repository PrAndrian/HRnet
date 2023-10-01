import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

const NotificationModal = ({ isVisible, message, error, setter, onYes, isChoice }) => {

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
                    flex
                    flex-col
                    relative 
                    p-5 
                    text-xl 
                    rounded-md
                    ${isChoice ? 'bg-orange text-white' : error ? " bg-red text-white " :  ' bg-primary text-white '}
                `
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
                <span className='font-bold'>{message}</span>

                {!error && <Link className='underline' to="/employees">Check list employees</Link>}

                {isChoice &&<span>Are you sure you want to continue ?</span>}
                {isChoice && (
                    <footer className='w-full flex gap-2 justify-center pt-4 pb-2 '>
                        <button id={'buttonCloseModal-yes'}
                            onClick={onYes} 
                            className='
                            w-full 
                            p-2 
                            bg-white 
                            text-black 
                            rounded'
                        >
                            Yes
                        </button>

                        <button id={'buttonCloseModal-no'}
                            onClick={(event)=>handleClick(event)} 
                            className='
                                w-full 
                                p-2 
                                bg-white 
                                text-black 
                                rounded
                            '
                        >
                            No
                        </button>
                    </footer>)
                }
            </div>
        </div>
    );
}

NotificationModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    setter : PropTypes.func.isRequired,
    error: PropTypes.bool,
    isChoice: PropTypes.bool,
    onYes: PropTypes.func,
    employeeTmp : PropTypes.objectOf(PropTypes.string)
};

export default NotificationModal