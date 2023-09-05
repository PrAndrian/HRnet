import { useState } from "react";
import EmployeeCreationForm from "../components/EmployeeCreationForm"
import SeparationUI from "../components/SeparationUI"
import ToastModal from "../components/ToastModal";

const Home = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState(false);

  const handleToast = (isError,message) => {
    setError(isError);
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
      setError(false);
    }, 3000); // Le toast disparaîtra après 3 secondes
  };

  return (
    <>
      <h1 className="text-secondary text-[40px] w-[260px]">
        Create New Employee
      </h1>
      <ToastModal showToast={showToast} message={toastMessage} error={error}/>
      <SeparationUI/>
      <EmployeeCreationForm  onToast={handleToast}/>
      <SeparationUI/>
      <footer className="h-[105px]"/>
    </>
  )
}

export default Home