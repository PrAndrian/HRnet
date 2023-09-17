import PropTypes from 'prop-types';

const ShowingRowTable = ({
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  indexOfFirstItem,
  indexOfLastItem,
  labelColor,
  selectBorderColor,
  selectBackgroundColor,
  selectTextColor,
  spanTextColor,
  width, // Largeur du composant
  height, // Hauteur du composant
}) => {
  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = parseInt(event.target.value, 10);
    onItemsPerPageChange(selectedItemsPerPage);
  };

  return (
    <span style={{ width, height }} className='flex items-center gap-2'>
      <label
        htmlFor="show-rows"
        style={{ color: labelColor }}
      >
        Show
      </label>
      <select
        id="show-rows"
        className={`
          rounded-lg
          border
          border-${selectBorderColor}
          border-opacity-40
          bg-${selectBackgroundColor}
          h-${height}
          px-2
          font-bold
          cursor-pointer
          text-${selectTextColor}
        `}
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value={10}>10 rows</option>
        <option value={25}>25 rows</option>
        <option value={50}>50 rows</option>
        <option value={100}>100 rows</option>
      </select>
      <span style={{ color: spanTextColor }}>
        {indexOfFirstItem === 0 ? 1 : indexOfFirstItem}-
        {indexOfLastItem + ' of ' + totalItems}
      </span>
    </span>
  );
};

ShowingRowTable.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  indexOfFirstItem: PropTypes.number.isRequired,
  indexOfLastItem: PropTypes.number.isRequired,
  labelColor: PropTypes.string,
  selectBorderColor: PropTypes.string,
  selectBackgroundColor: PropTypes.string,
  selectTextColor: PropTypes.string,
  spanTextColor: PropTypes.string,
  width: PropTypes.string.isRequired, // Largeur du composant
  height: PropTypes.string.isRequired, // Hauteur du composant
};

export default ShowingRowTable;
