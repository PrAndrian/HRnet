import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types';
import { useState } from "react"
import SearchBar from "./SearchBar"

const SelectMenu = ({
  id,
  values,
  setter,
  isError,
  width,
  backgroundColor,
  textColor,
  }) => {
  const [options, setOptions] = useState(values)
  const [inputValue, setInputValue] = useState("")
  const [visibility, setVisibility] = useState(false)

  const handleClickValue = (e) => {
    setInputValue(e.target.getAttribute("value"))
    setter(e.target.getAttribute("value"))
    setVisibility(false);
  }

  const handleToggle = (e) =>{
    e.preventDefault()
    if(visibility===false){
      setOptions(values)
    }
    setVisibility(!visibility)
  }

  const handleSearch = (searchTerm) => {
    if(searchTerm===''){
      setOptions(values)
      return;
    }

    const filteredResults = values.filter((employee) =>{
      return Object.values(employee).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setOptions(filteredResults);
  };

  return (
    <div className={`w-${width} relative`}>
      <input id={id} name={id} type="hidden" value={inputValue}/>
      <button 
        className={`
          font-semibold
          flex
          items-center
          justify-between
          p-2
          mb-2
          bg-transparent
          border
          rounded-lg
          w-${width}
          ${isError ? 'border-4 border-red' : `border-[#ccc]`}
        `}
        style={{ backgroundColor, color: textColor }}
        onClick={handleToggle}
      >
          <span>{inputValue === "" ? "Choose..." : inputValue}</span>
          <FontAwesomeIcon className={`w-3 h-3 ${visibility ? 'rotate-180': ''}`} icon={faChevronDown}/>    
      </button>
      {visibility &&
        <div className={`
            w-${width}
            absolute
            bg-white
            border
            rounded-lg
            shadow-[0_3px_10px_rgb(0,0,0,0.2)]
          `}
          style={{ width }}
        >
          <div className="p-2">
            <SearchBar 
              onSearch={handleSearch}
              width={width} 
              height="[45px]" 
              placeHolder={'Search'}
              borderColor={'#414A3D'}
              backgroundColor={'transparent'}
            />
          </div>
          <ul className="mt-1 px-2 max-h-[200px] overflow-y-auto pb-2 ">
            {
              options.sort().map(option=>
                <li 
                  key={option.name} 
                  value={option.name}
                  className={`
                    py-1
                    px-2 
                    font-semibold 
                    cursor-pointer
                    hover:opacity-75
                    rounded-lg
                    ${inputValue===option.name ? 'bg-tertiary' : ''}
                  `}
                  onClick={handleClickValue}
                >
                  {option.name}
                </li>
              )
            }
          </ul>
        </div>
      }
    </div>
  )
}

SelectMenu.propTypes = {
  id: PropTypes.string.isRequired,
  setter: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  values: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string || PropTypes.number)).isRequired,
  width: PropTypes.string, // Largeur personnalisée
  height: PropTypes.string, // Hauteur personnalisée
  backgroundColor: PropTypes.string, // Couleur de fond personnalisée
  textColor: PropTypes.string, // Couleur du texte personnalisée
  borderColor: PropTypes.string, // Couleur de la bordure personnalisée
};

// Définir les valeurs par défaut pour les nouvelles props
SelectMenu.defaultProps = {
  width: 'full', // Largeur par défaut
  backgroundColor: 'transparent', // Couleur de fond par défaut
  textColor: '#000', // Couleur du texte par défaut
};

export default SelectMenu