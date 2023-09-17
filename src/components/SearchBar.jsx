import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchBar = ({ onSearch, width, height, placeHolder,iconColor, borderColor, placeholderColor, backgroundColor }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className={`flex w-${width} h-${height}`}>
            <div className={`
                flex
                items-center
                rounded-l-lg
                border-l
                border-t
                border-b
                border-${borderColor}
                bg-${backgroundColor}
                border-opacity-40
                px-2 
            `}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={`text-${iconColor}`} />
            </div>
            <input
                id={"searchbar-table"}
                type={"text"}
                className={`
                    w-full
                    rounded-r-lg
                    border-r
                    border-t
                    border-b
                    border-${borderColor}
                    border-opacity-40 
                    bg-${backgroundColor}
                    text-${placeholderColor}
                    font-bold
                    pl-1
                `}
                onChange={handleSearchChange}
                placeholder={placeHolder}
                value={searchTerm}
            />
        </div>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    iconColor: PropTypes.string, // Couleur de l'icône
    borderColor: PropTypes.string, // Couleur de la bordure
    placeholderColor: PropTypes.string, // Couleur du texte de l'placeholder
    backgroundColor: PropTypes.string, // Couleur de fond de l'input
    placeHolder: PropTypes.string, // Couleur de fond de l'input
};

export default SearchBar;
