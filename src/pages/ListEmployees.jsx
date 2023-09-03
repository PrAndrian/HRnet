import { useSelector } from "react-redux";

const ListEmployees = () => {
  const listEmployees = useSelector((state) => state.employees.list)
  console.log(listEmployees)
  
  return (
    <div>ListEmployees</div>
  )
}

export default ListEmployees