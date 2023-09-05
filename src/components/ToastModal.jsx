import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ToastModal = ({ showToast, message, error }) => {
    return (
        <div
            className={`fixed right-0 top-20 p-5 text-xl rounded-md transform transition-transform 
            ${showToast ? ' translate-x-0 ' : ' translate-x-full '} 
            ${error ? " bg-red text-white " : ' bg-primary text-white '}`}
        >
            {message}
            <br/>
            {!error && <Link className='underline' to="/employees">Check list employees</Link>}
        </div>
    );
}

ToastModal.propTypes = {
    showToast: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    error: PropTypes.bool
};

export default ToastModal