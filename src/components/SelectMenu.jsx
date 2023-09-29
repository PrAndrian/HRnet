import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types';
import { useState } from "react"
import SearchBar from "./SearchBar"

const SelectMenu = ({
  id,
  values,
  setter,
  inputValue,
  isError,
  width,
  inputHeight,
  inputTextColor,
  inputBackgroundColor,
  backgroundColor,
  activeColor,
  textColor,
  iconColor,
  }) => {
  const [options, setOptions] = useState(values)
  const [visibility, setVisibility] = useState(false)

  const handleClickValue = (e) => {
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
    <div 
      className={`relative`}
      style={{ width: width }}
    >
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
          w-full
          ${isError ? 'border-4 border-red' : `border-[#ccc]`}
        `}
        style={{ backgroundColor: inputBackgroundColor, color: textColor, width : width, height: inputHeight}}
        onClick={handleToggle}
      >
          <span>{inputValue === "" ? "Choose..." : inputValue}</span>
          <FontAwesomeIcon className={`w-3 h-3 ${visibility ? 'rotate-180': ''}`} icon={faChevronDown}/>    
      </button>
      {visibility &&
        <div className={`
            w-full
            absolute
            bg-white
            border
            rounded-lg
            shadow-[0_3px_10px_rgb(0,0,0,0.2)]
          `}
          style={{ backgroundColor:backgroundColor, color: textColor, width : width}}
        >
          <div className="p-2">
            <SearchBar 
              id={id}
              onSearch={handleSearch}
              height={inputHeight}
              width="auto" 
              placeHolder={'Search'}
              borderColor={textColor}
              backgroundColor={inputBackgroundColor}
              iconColor={iconColor}
              inputTextColor={inputTextColor}
              placeholderColor={inputTextColor}
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
                  `}
                  onClick={handleClickValue}

                  style={{ backgroundColor: inputValue===option.name ? `${activeColor}` : '', }}
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
  inputValue: PropTypes.string.isRequired,
  setter: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  values: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string || PropTypes.number)).isRequired,
  width: PropTypes.string,
  inputHeight: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  inputTextColor: PropTypes.string,
  inputBackgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  activeColor: PropTypes.string,
};


SelectMenu.defaultProps = {
  width: '100%',
  backgroundColor: 'white',
  textColor: 'black',
  inputHeight: '45px',
  borderColor: 'black',
  inputTextColor: 'black',
  inputBackgroundColor: 'transparent',
  iconColor: 'black',
  activeColor: '#D0E7B9',
};

export default SelectMenu