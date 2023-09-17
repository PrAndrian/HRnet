import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const PaginationTable = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  activeButtonColor, // Couleur du bouton actif
  hoverButtonColor, // Couleur du bouton en survol
  width,
  height
}) => {
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
        isActive ? `bg-${activeButtonColor}` : `hover:bg-${hoverButtonColor}`
      } `;

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
    <nav className={` w-${width} h-${height} flex justify-end ${totalPages === 1 ? 'invisible' : 'visible'}`}>
      <ul className="inline-flex items-center space-x-2">
        <li className={`rounded-md ${currentPage === 1 ? 'invisible' : ''}`}>
          <button
            className={`px-3 py-1 rounded-full hover:bg-${hoverButtonColor} focus:outline-none hover:opacity-80`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </li>
        {renderPageNumbers()}
        <li className={`rounded-md ${currentPage === totalPages + 1 || currentPage === totalPages ? 'invisible' : ''}`}>
          <button
            className={`px-3 py-1 rounded-full hover:bg-${hoverButtonColor} focus:outline-none hover:opacity-80`}
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
  activeButtonColor: PropTypes.string.isRequired, // Prop pour la couleur du bouton actif
  hoverButtonColor: PropTypes.string.isRequired, // Prop pour la couleur du bouton en survol
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default PaginationTable;
