import InputForm from "./InputForm";
import departements from '../data/departements'
import states from '../data/states'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../redux/features/employeesSlice";
import PropTypes from 'prop-types';
import DatePicker from "./DatePicker";
import SelectMenu from "./SelectMenu";

const EmployeeCreationForm = ({onToast}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [departement, setDepartement] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState(0)

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

    const handleSubmit = (event) =>{
        event.preventDefault();
        
        setErrors(InitialErrors)

        function verfyWordSpaces(word){
            var regexEspaces = /\s{2,}/;
            return regexEspaces.test(word) ? word.replace(/\s+/g, ' ') : word 
        }
        
        const employee = {
            firstName: verfyWordSpaces(firstName),
            lastName : verfyWordSpaces(lastName),
            birthdate : birthdate,
            startDate : startDate,
            departement: verfyWordSpaces(departement),
            street: verfyWordSpaces(street),
            city: verfyWordSpaces(city),
            state: verfyWordSpaces(state),
            zipCode: verfyWordSpaces(zipCode),
        }

        const regex = /^[a-zA-Z0-9\-/ éèàùêâô]+$/;
        const valuesEmployee = Object.values(employee);

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
                />

                <label htmlFor="last-name">Last Name</label>
                <InputForm 
                    id='last-name' 
                    type='text' 
                    palceholder="mdith" 
                    setter={setLastName}
                    isError={errors.lastName}
                />

                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker
                    id={'date-of-birth'} 
                    minYear={1950}
                    substractionYears={18}
                    zIndex={"z-30"}
                    setter={setBirthdate}
                    isError={errors.birthdate}
                    textColor={'#414A3D'}
                    width={'[370px]'}
                    height={'[45px]'}
                />

                

                <label htmlFor="start-date">Start Date</label>
                <DatePicker 
                    id='start-date' 
                    minYear={2000}
                    substractionYears={-5}
                    zIndex={"z-20"}
                    setter={setStartDate}
                    isError={errors.startDate}
                    textColor={'#414A3D'}
                    width={'[370px]'}
                    height={'[45px]'}
                />

                <label htmlFor="department">Department</label>
                <SelectMenu
                    id={"departement"}
                    values={departements}
                    setter={setDepartement}
                    isError={errors.departement}
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
                />

                <label htmlFor="city">City</label>
                <InputForm 
                    id='city' 
                    type='text'
                    palceholder="St.Coachella" 
                    setter={setCity}
                    isError={errors.city}
                />

                <label htmlFor="state">State</label>
                <SelectMenu
                    id="state"
                    values={states}
                    setter={setState}
                    isError={errors.state}
                />

                <label htmlFor="zip-code">Zip Code</label>
                <InputForm 
                    id='zip-code' 
                    type='number'
                    palceholder="92236" 
                    setter={setZipCode}
                    isError={errors.zipCode}
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