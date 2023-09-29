import InputForm from "./InputForm";
import departements from '../data/departements'
import states from '../data/states'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../redux/features/employeesSlice";
import PropTypes from 'prop-types';
import DatePicker from "./DatePicker";
import SelectMenu from "./SelectMenu";

/**
 * EmployeeCreationForm is a component for creating employee profiles.
 *
 * @component
 * @param {Object} props - The component's props object.
 * @param {function} props.onToast - A callback function to display toast messages.
 * @returns {JSX.Element} Returns the EmployeeCreationForm component.
 */
const EmployeeCreationForm = ({onToast}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [departement, setDepartement] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')

    const YearsBirthRestriction = {
        minYear: 1950,
        substractionYears: 18,
    }
    const YearsStateRestriction = {
        minYear: 2000,
        substractionYears: -5,
    }

    const dispatch = useDispatch()
    const listEmployees = useSelector((state)=>state.employees.list)
    const [error, setError] = useState(false);

    const InitialErrors = {
        firstName: false,
        lastName : false,
        birthdate : false,
        startDate : false,
        departement: false,
        street: false,
        city: false,
        state: false,
        zipCode: false,
    }

    // Initialize error states for each input field
    const [errors, setErrors] = useState(InitialErrors);
    
    /**
     * Formats a date string from 'YYYY-MM-DD' to 'DD/MM/YYYY'.
     *
     * @param {string} inputDate - The input date string in 'YYYY-MM-DD' format.
     * @returns {string} The formatted date string in 'DD/MM/YYYY' format.
    */
    function formatDate(inputDate) {
        // Parse the input date string in "YYYY-MM-DD" format
        const parts = inputDate.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        
        
        // Create a Date object with the parsed year, month, and day
        const date = new Date(year, month - 1, day);
        
        // Use the Date object's methods to get day, month, and year components
        const formattedDay = date.getDate().toString().padStart(2, '0');
        const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const formattedYear = date.getFullYear();
        
        // Format these components into "DD/MM/YYYY" format
        const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;

        return !isNaN(formattedDay || formattedMonth || formattedYear) ? formattedDate : '';
    }

    /**
     * Verifies and replaces consecutive spaces in a word with a single space.
     *
     * @param {string} word - The word to be verified.
     * @returns {string} The word with consecutive spaces replaced.
     */
    function verfyWordSpaces(word){
        var regexEspaces = /\s{2,}/;
        return regexEspaces.test(word) ? word.replace(/\s+/g, ' ') : word 
    }
        
    /**
     * Verifies if a given date string is within a specified year range.
     *
     * @param {string} date - The date string in 'DD/MM/YYYY' format.
     * @param {Object} YearsRestriction - The year restriction object with minYear and substractionYears.
     * @returns {boolean} Returns true if the date is outside the specified range; otherwise, false.
     */
    function verfyDate(date,YearsRestriction){
        const parts = date.split('/');
        const year = parts[2];

        const maxYear = new Date().getFullYear() - YearsRestriction.substractionYears
        const minYear = YearsRestriction.minYear

        return year < minYear || year > maxYear
    }

    /**
     * Handles the form submission for creating an employee profile.
     *
     * @param {Object} event - The form submit event object.
     */
    const handleSubmit = (event) =>{
        event.preventDefault();
        
        setErrors(InitialErrors)

        const employee = {
            firstName: verfyWordSpaces(firstName),
            lastName : verfyWordSpaces(lastName),
            birthdate : formatDate(birthdate),
            startDate : formatDate(startDate),
            departement: verfyWordSpaces(departement),
            street: verfyWordSpaces(street),
            city: verfyWordSpaces(city),
            state: verfyWordSpaces(state),
            zipCode: verfyWordSpaces(zipCode),
        }

        const valuesEmployee = Object.values(employee);
        const regex = /^[a-zA-Z0-9\-/ éèàùìèùêâôîû]+$/;

        valuesEmployee.map((value,index)=>{

            if(value==='' || value===0){
                setError(true);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [Object.keys(employee)[index]]: true,
                }));
                onToast(true, 'No empty inputs are allowed');
                throw new Error("field(s) is empty : "+error);
            }
            

            const YearsRestriction = index===3 ? YearsStateRestriction : YearsBirthRestriction
            if(((index===2 || index===3) && verfyDate(value,YearsRestriction))){
                const maxYear = new Date().getFullYear() - YearsRestriction.substractionYears
                
                setError(true);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [Object.keys(employee)[index]]: true,
                }));
                onToast(true, `Date should be between ${YearsRestriction.minYear} and ${maxYear}`);
                throw new Error("azeaezae : "+error);
            }

            if(!regex.test(value)){
                setError(true);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [Object.keys(employee)[index]]: true,
                }));
                onToast(true, 'No special characters are allowed');
                throw new Error(" : "+error);
            }
        })

        dispatch(createEmployee([...listEmployees,employee]));
        setError(false);
        setFirstName('')
        setLastName('')
        setBirthdate('')
        setStartDate('')
        setDepartement('')
        setStreet('')
        setCity('')
        setState('')
        setZipCode('')
        onToast(false, 'Employé ajouté avec succès !')
    }

    return (
    <form 
        onSubmit={handleSubmit} 
        id="create-employee"
        className="flex flex-col grow justify-center items-center p-5"
    >
        <div className="flex justify-center flex-wrap gap-10 md:gap-40 mb-[50px] w-full" >
            <fieldset className="
                flex 
                flex-col 
                w-full 
                max-w-[375px] 
                gap-2
            ">
                <label htmlFor="first-name">First Name</label>
                <InputForm 
                    id='first-name' 
                    type='text' 
                    palceholder="John"
                    setter={setFirstName}
                    isError={errors.firstName}
                    value={firstName}
                />

                <label htmlFor="last-name">Last Name</label>
                <InputForm 
                    id='last-name' 
                    type='text' 
                    palceholder="Doe" 
                    setter={setLastName}
                    isError={errors.lastName}
                    value={lastName}
                />

                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker
                    id={'date-of-birth'} 
                    minYear={YearsBirthRestriction.minYear}
                    substractionYears={YearsBirthRestriction.substractionYears}
                    zIndex={"z-30"}
                    setter={setBirthdate}
                    isError={errors.birthdate}
                    textColor={'#414A3D'}
                    width={'[370px]'}
                    height={'[45px]'}
                    selectedDate={birthdate}
                />

                

                <label htmlFor="start-date">Start Date</label>
                <DatePicker 
                    id='start-date' 
                    minYear={YearsStateRestriction.minYear}
                    substractionYears={YearsStateRestriction.substractionYears}
                    zIndex={"z-20"}
                    setter={setStartDate}
                    isError={errors.startDate}
                    textColor={'#414A3D'}
                    width={'[370px]'}
                    height={'[45px]'}
                    selectedDate={startDate}
                />

                <label htmlFor="department">Department</label>
                <SelectMenu
                    id={"departement"}
                    values={departements}
                    setter={setDepartement}
                    isError={errors.departement}
                    inputValue={departement}
                />
            </fieldset>

            <fieldset className="
                flex 
                flex-col 
                w-full 
                max-w-[375px] 
                md:border 
                md:border-[#414A3D] 
                rounded-xl
                pt-[15px]
                px-[30px]
                pb-[30px]
                gap-2
            ">                
                <h2 className="text-[32px] mb-[30px]">Address</h2>

                <label htmlFor="street">Street</label>
                <InputForm 
                    id='street' 
                    type='text' 
                    palceholder="8530 Selby" 
                    setter={setStreet}
                    isError={errors.street}
                    value={street}
                />

                <label htmlFor="city">City</label>
                <InputForm 
                    id='city' 
                    type='text'
                    palceholder="St.Coachella" 
                    setter={setCity}
                    isError={errors.city}
                    value={city}
                />

                <label htmlFor="state">State</label>
                <SelectMenu
                    id="state"
                    values={states}
                    setter={setState}
                    isError={errors.state}
                    inputValue={state}
                />

                <label htmlFor="zip-code">Zip Code</label>
                <InputForm 
                    id='zip-code' 
                    type='number'
                    palceholder="92236" 
                    setter={setZipCode}
                    isError={errors.zipCode}
                    value={zipCode}
                />
            </fieldset>
        </div>
        <button 
            type="submit"
            className="
                w-[263px]
                h-[40px]
                rounded-md
                bg-tertiary
            "
        >
            Save
        </button>
    </form>
  )
}

EmployeeCreationForm.propTypes = {
    onToast: PropTypes.func.isRequired,
};
  

export default EmployeeCreationForm