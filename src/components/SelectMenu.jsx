import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types';
import { useState } from "react"
import SearchBar from "./SearchBar"

const SelectMenu = ({id,values,setter, isError}) => {
  console.log(id)
  const [options, setOptions] = useState(values)
  const [inputValue, setInputValue] = useState("")
  const [visibility, setVisibility] = useState(false)

  const handleClickValue = (e) => {
    setInputValue(e.target.getAttribute("value"))
    setter(e.target.getAttribute("value"))
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
    <div className="w-[370px] relative">
      <input id={id} name={id} type="hidden" value={inputValue}/>
      <button 
        className={`
          font-semibold
          flex
          items-center
          justify-between
          h-[45px]
          w-full
          p-2
          mb-2
          bg-transparent
          border
          border-[#414A3D] 
          border-opacity-40 
          rounded-lg
          ${isError ? 'border-red' : 'border-[#414A3D]'}
        `}
        onClick={handleToggle}
      >
          <span>{inputValue === "" ? "Choose..." : inputValue}</span>
          <FontAwesomeIcon className={`w-3 h-3 ${visibility ? 'rotate-180': ''}`} icon={faChevronDown}/>    
      </button>
      {visibility &&
        <div className="
          absolute
          w-full
          bg-white
          border
          border-[#414A3D] 
          border-opacity-40 
          rounded-lg
          shadow-[0_3px_10px_rgb(0,0,0,0.2)]
        ">
          <div className="p-2">
            <SearchBar 
              onSearch={handleSearch}
              width="full" 
              height="[45px]" 
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
  setter : PropTypes.func.isRequired,
  isError : PropTypes.bool.isRequired,
  values : PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string || PropTypes.number)).isRequired
}

export default SelectMenu