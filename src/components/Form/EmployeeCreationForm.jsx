import InputForm from "./InputForm";
import departments from '../../data/departments'
import states from '../../data/states'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux/features/employeesSlice";
import PropTypes from 'prop-types';
import  DatePicker from "datepicker-cmp";
import { SelectMenu } from 'selectmenu-cmp'
import { areStringsPhoneticallyAlike } from "../../utils/phoneticalComparaisonStrong";
import { formatDate, isAgeDifferenceAtLeast18Years, verfyDate, verfyWordSpaces } from "../../utils/verificationForm";

/**
 * EmployeeCreationForm is a component for creating employee profiles.
 *
 * @component
 * @param {Object} props - The component's props object.
 * @param {function} props.onToast - A callback function to display toast messages.
 * @returns {JSX.Element} Returns the EmployeeCreationForm component.
 */
const EmployeeCreationForm = ({onToast}) => {
    const listEmployees = useSelector((state)=>state.employees.list)
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [department, setdepartment] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')

    const dateRestriction = {
        birth: { minYear: 1950, subtractionYears: 18 },
        state: { minYear: 2000, subtractionYears: -5 },
    };

    const initialErrors = {
        firstName: false,
        lastName : false,
        birthdate : false,
        startDate : false,
        department: false,
        street: false,
        city: false,
        state: false,
        zipCode: false,
        isExisting : false,
    }

    // Initialize error states for each input field
    const [errors, setErrors] = useState(initialErrors);

    /**
     * Handles the form submission for creating an employee profile.
     *
     * @param {Object} event - The form submit event object.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
    
        const employee = {
            firstName: verfyWordSpaces(firstName),
            lastName: verfyWordSpaces(lastName),
            birthdate: formatDate(birthdate),
            startDate: formatDate(startDate),
            department: verfyWordSpaces(department),
            street: verfyWordSpaces(street),
            city: verfyWordSpaces(city),
            state: verfyWordSpaces(state),
            zipCode: verfyWordSpaces(zipCode),
        };
    
        const valuesEmployee = Object.values(employee);
        const regex = /^[a-zA-Z0-9\-/ éèàùìèùêâôîû]+$/;
    
        const newErrors = { ...initialErrors };

        listEmployees.forEach((theEmployee) => {
            if (
                theEmployee.birthdate === employee.birthdate &&
                areStringsPhoneticallyAlike(theEmployee.firstName, employee.firstName) && 
                areStringsPhoneticallyAlike(theEmployee.lastName, employee.lastName) ||
                areStringsPhoneticallyAlike(theEmployee.firstName, employee.lastName) &&
                areStringsPhoneticallyAlike(theEmployee.lastName, employee.firstName)
            ) {
                newErrors.isExisting = true
                onToast(true, 'Employee already exists', employee, true);
            }
        });

        if (!isAgeDifferenceAtLeast18Years(employee.birthdate, employee.startDate)) {
            newErrors.birthdate = true;
            newErrors.startDate = true;
            onToast(true, 'Employee must be at least 18 years old');
        }
    
        valuesEmployee.forEach((value, index) => {
            const YearsRestriction = index === 3 ? dateRestriction.state : dateRestriction.birth;
            if ((index === 2 || index === 3) && verfyDate(value, YearsRestriction)) {
                const maxYear = new Date().getFullYear() - YearsRestriction.subtractionYears;
                newErrors[Object.keys(employee)[index]] = true;
                onToast(true, `Date should be between ${YearsRestriction.minYear} and ${maxYear}`);
            }

            if (!regex.test(value)) {
                newErrors[Object.keys(employee)[index]] = true;
                onToast(true, 'No special characters are allowed');
            }

            if (value === '' || value.length === 0) {
                newErrors[Object.keys(employee)[index]] = true;
                onToast(true, 'No empty inputs are allowed');
            }
        });
    
        setErrors(newErrors);
    
        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some((error) => error);
    
        if (!hasErrors) {
            dispatch(createEmployee([...listEmployees, employee]));
    
            setFirstName('');
            setLastName('');
            setBirthdate('');
            setStartDate('');
            setdepartment('');
            setStreet('');
            setCity('');
            setState('');
            setZipCode('');
            onToast(false, 'Employee added successfully !');
        }
    };
    

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
                    minYear={dateRestriction.birth.minYear}
                    substractionYears={dateRestriction.birth.subtractionYears}
                    zIndex={"auto"}
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
                    minYear={dateRestriction.state.minYear}
                    substractionYears={dateRestriction.state.subtractionYears}
                    zIndex={"auto"}
                    setter={setStartDate}
                    isError={errors.startDate}
                    textColor={'#414A3D'}
                    width={'[370px]'}
                    height={'[45px]'}
                    selectedDate={startDate}
                />

                <label htmlFor="department">Department</label>
                <SelectMenu
                    id={"department"}
                    values={departments}
                    setter={setdepartment}
                    isError={errors.department}
                    inputValue={department}
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