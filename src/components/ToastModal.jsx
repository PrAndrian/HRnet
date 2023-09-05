import PropTypes from 'prop-types';

const ToastModal = ({ showToast, message, error }) => {
    return (
        <div
            className={`fixed right-0 top-20 m-4 p-2 rounded-md transform transition-transform 
            ${showToast ? ' translate-x-0 ' : ' translate-x-full '} 
            ${error ? " bg-red text-white " : ' bg-primary text-white '}`}
        >
            {message}
        </div>
    );
}

ToastModal.propTypes = {
    showToast: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    error: PropTypes.bool
};

export default ToastModal