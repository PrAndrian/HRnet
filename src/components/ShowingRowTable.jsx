import PropTypes from 'prop-types';

const ShowingRowTable = ({itemsPerPage, onItemsPerPageChange}) => {
    const handleItemsPerPageChange = (event) => {
        const selectedItemsPerPage = parseInt(event.target.value, 10);
        onItemsPerPageChange(selectedItemsPerPage);
      };
    
    return (
    <span>
        <label htmlFor="show-rows" className="mr-2">
            Show
        </label>
        &nbsp;
        <select 
            id="show-rows"
            className="
                rounded-lg
                border
                border-[#414A3D] 
                border-opacity-40 
                bg-transparent
                h-[40px]
                px-2
                font-bold
                cursor-pointer
            " 
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
        >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
            <option value={100}>100 rows</option>
        </select>
        &nbsp; 
        1-10 of 50
    </span>
    )
}

ShowingRowTable.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    onItemsPerPageChange: PropTypes.func.isRequired,
};
  

export default ShowingRowTable