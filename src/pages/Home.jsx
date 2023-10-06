import { useCallback, useState } from "react";
import EmployeeCreationForm from "../components/Form/EmployeeCreationForm"
import SeparationUI from "../components/SeparationUI"
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../redux/features/employeesSlice";
import NotificationModal from "notification-cmp";
import { Link } from "react-router-dom";


const Home = () => {
  const [ToastVisible, setIsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState(false);
  const [isChoice, setIsChoice] = useState(false);
  const [employee, setIsEmployee] = useState(null);
  const listEmployees = useSelector((state)=>state.employees.list)
  const dispatch = useDispatch()

  const handleClickYes = useCallback(() => {
    dispatch(createEmployee([...listEmployees,employee]));
  },[dispatch,listEmployees,employee])

  const handleToast = (isError,message,employeeTmp,choice) => {
    setError(isError);
    setToastMessage(message);
    setIsVisible(true);
    employeeTmp && setIsEmployee(employeeTmp);
    setIsChoice(choice)
  };

  return (
    <>
      <h1 className="text-secondary text-[40px] w-[260px] p-5 md:p-5">
        Create New Employee
      </h1>
      <NotificationModal 
        isVisible={ToastVisible} 
        message={toastMessage} 
        error={error}
        setter={setIsVisible}
        onYes={handleClickYes}
        isChoice={isChoice}
        successElement={<Link className='underline' to="/employees">Check list employees</Link>}
      />
      <SeparationUI/>
      <EmployeeCreationForm  onToast={handleToast}/>
      <SeparationUI/>
      <footer className="h-[105px]"/>
    </>
  )
}

export default Home