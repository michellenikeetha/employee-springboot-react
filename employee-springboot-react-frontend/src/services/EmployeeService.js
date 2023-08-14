import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees/all"
const EMPLOYEE_API = "http://localhost:8080/api/v1/employees"
const EMPLOYEE_API_UPDATE = "http://localhost:8080/api/v1/employees/update"
const EMPLOYEE_API_DELETE = "http://localhost:8080/api/v1/employees/delete"

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post("http://localhost:8080/api/v1/employees/add", employee)
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_UPDATE + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_DELETE + '/' + employeeId);
    }

}

export default new EmployeeService()