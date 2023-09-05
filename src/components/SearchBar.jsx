import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';


const SearchBar = ({onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
      onSearch(value);
    };

    return (
        <div className='flex w-[360px] h-[45px]'>
            <div className="
                flex
                items-center
                rounded-l-lg
                border-l
                border-t
                border-b
                border-[#414A3D] 
                border-opacity-40
                px-2 
            ">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input 
                id={"searbar-table"} 
                type={"text"} 
                className="
                    w-full
                    rounded-r-lg
                    border-r
                    border-t
                    border-b
                    border-[#414A3D] 
                    border-opacity-40 
                    bg-transparent
                    font-bold
                    pl-1
                " 
                onChange={handleSearchChange}
                placeholder={'Search'}
                value={searchTerm}
            />
        </div>
    )
}

SearchBar.propTypes = {
onSearch: PropTypes.func.isRequired,
};
  

export default SearchBar