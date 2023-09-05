import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const PaginationTable = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => {
      const pageNumber = i + 1;
      const isActive = currentPage === pageNumber;
      const buttonClasses = `inline-block px-3 py-1 rounded-full focus:outline-none ${
        isActive ? 'bg-tertiary' : 'hover:bg-tertiary'
      } ${
        totalPages === 1 ? 'hidden' : 'visible'
      }`;
  
      return (
        <button
          key={pageNumber}
          className={buttonClasses}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  };
  

  return (
    <nav className="flex justify-center ">
      <ul className="inline-flex items-center space-x-2">
        <li className={`rounded-md ${currentPage === 1 ? 'invisible' : ''}`}>
          <button
            className="px-2 py-1 rounded-md hover:bg-tertiary focus:outline-none"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </li>
        {renderPageNumbers()}
        <li
          className={`rounded-md ${
            currentPage == totalPages ? 'invisible' : ''
          }`}
        >
          <button
            className="px-2 py-1 rounded-md hover:bg-tertiary focus:outline-none"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

PaginationTable.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationTable;
