import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

export default function CreateEmployeeComponent() {
    const { id } = useParams();

    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        emailId: ''
    });

    useEffect(() => {
        if (id === '-1') {
            return;
        } else {
            EmployeeService.getEmployeeById(id).then((res) => {
                let employeeData = res.data;
                setEmployee({
                    firstname: employeeData.firstname,
                    lastname: employeeData.lastname,
                    emailId: employeeData.emailId
                });
            });
        }
    }, [id]);

    const saveEmployee = (e) => {
        e.preventDefault();
        const updatedEmployee = {
            firstname: employee.firstname,
            lastname: employee.lastname,
            emailId: employee.emailId
        };

        if (id === '-1') {
            EmployeeService.createEmployee(updatedEmployee).then(() => {
              window.location.href = '/employees'; 
            });
        } else {
            EmployeeService.updateEmployee(updatedEmployee, id).then(() => {
              window.location.href = '/employees'; 
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    const getTitle = () => {
        if (id === '-1') {
            return <h3>Add Employee</h3>;
        } else {
            return <h3>Update Employee</h3>;
        }
    };

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {getTitle()}
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label> First Name: </label>
                                    <input
                                        placeholder='First Name'
                                        name='firstname'
                                        className='form-control'
                                        value={employee.firstname}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label> Last Name: </label>
                                    <input
                                        placeholder='Last Name'
                                        name='lastname'
                                        className='form-control'
                                        value={employee.lastname}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label> Email Id: </label>
                                    <input
                                        placeholder='Email Address'
                                        name='emailId'
                                        className='form-control'
                                        value={employee.emailId}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <button className='btn btn-success' onClick={saveEmployee}>
                                    Save
                                </button>
                                <Link to='/' className='btn btn-danger' style={{ marginLeft: '10px' }}>
                                    Cancel
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
