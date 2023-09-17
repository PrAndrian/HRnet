import { useState } from "react";
import EmployeeCreationForm from "../components/EmployeeCreationForm"
import SeparationUI from "../components/SeparationUI"
import ToastModal from "../components/ToastModal";

const Home = () => {
  const [ToastVisible, setIsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState(false);

  const handleToast = (isError,message) => {
    setError(isError);
    setToastMessage(message);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setToastMessage('');
      setError(false);
    }, 7000); // Le toast disparaîtra après 3 secondes
  };

  return (
    <>
      <h1 className="text-secondary text-[40px] w-[260px] p-5 md:p-5">
        Create New Employee
      </h1>
      <ToastModal 
        isVisible={ToastVisible} 
        message={toastMessage} 
        error={error}
        setter={setIsVisible}
      />
      <SeparationUI/>
      <EmployeeCreationForm  onToast={handleToast}/>
      <SeparationUI/>
      <footer className="h-[105px]"/>
    </>
  )
}

export default Home