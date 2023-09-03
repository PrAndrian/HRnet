import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const SearchBar = ({id,type,setter}) => {
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
                type={type} 
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
    type : PropTypes.string.isRequired,
    placeholder : PropTypes.string.isRequired, 
    setter : PropTypes.func.isRequired 
}

export default SearchBar