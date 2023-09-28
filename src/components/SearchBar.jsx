import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import '../index.css'

const SearchBar = ({ 
    id={id},
    onSearch, 
    width, 
    height, 
    placeHolder,
    iconColor, 
    borderColor, 
    backgroundColor,
    inputTextColor,
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div 
            className={`flex`} 
            style={{height:height,width:width}}
        >
            <div className={`
                flex
                items-center
                rounded-l-lg
                border-l
                border-t
                border-b
                border-opacity-40
                px-2 
            `}

            style={{backgroundColor:backgroundColor, borderColor:borderColor,color:iconColor}}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </div>
            <input
                id={`${id}-searchbar`}
                type={"text"}
                className={`
                    w-full
                    rounded-r-lg
                    border-r
                    border-t
                    border-b
                    border-opacity-40 
                    font-bold
                    pl-1
                `}
                style={{
                    backgroundColor:backgroundColor, 
                    color:inputTextColor,
                    borderColor:borderColor,            
                }}
                onChange={handleSearchChange}
                placeholder={placeHolder}
                value={searchTerm}
            />
        </div>
    );
}

SearchBar.propTypes = {
    id: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    iconColor: PropTypes.string, // Couleur de l'icône
    borderColor: PropTypes.string, // Couleur de la bordure
    inputTextColor: PropTypes.string, // Couleur du texte de l'placeholder
    backgroundColor: PropTypes.string, // Couleur de fond de l'input
    placeHolder: PropTypes.string, // Couleur de fond de l'input
};


SearchBar.defaultProps = {
    iconColor: "black",
    borderColor: "black",
    inputTextColor: "black",
    backgroundColor: "white",
    placeHolder: "Search"
  };

export default SearchBar;
