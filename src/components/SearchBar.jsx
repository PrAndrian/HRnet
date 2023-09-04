import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const SearchBar = ({id,setter,listEmployees}) => {
    console.log(listEmployees)

    const handleValue = (event) => {
        event.preventDefault();
        setter(event.target.value)
    }

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
                id={id} 
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
                onChange={handleValue}
                placeholder={'Search'}
            />
        </div>
    )
}

SearchBar.propTypes = {
    id : PropTypes.string.isRequired, 
    setter : PropTypes.func.isRequired,
    listEmployees : PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string || PropTypes.number))
}

export default SearchBar