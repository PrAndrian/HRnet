import EmployeeCreationForm from "../components/EmployeeCreationForm"
import SeparationUI from "../components/SeparationUI"

const Home = () => {
  return (
    <>
        <h1 className="text-secondary text-[40px] w-[260px]">
          Create New Employee
        </h1>
        <SeparationUI/>
        <EmployeeCreationForm/>
        <SeparationUI/>
    </>
  )
}

export default Home