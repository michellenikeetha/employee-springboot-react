import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

export default function UpdateEmployeeComponent() {
    const { id } = useParams();

    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        emailId: ''
    });

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            const employeeData = res.data;
            setEmployee({
                firstname: employeeData.firstname,
                lastname: employeeData.lastname,
                emailId: employeeData.emailId
            });
        });
    }, [id]);

    const updateEmployee = (e) => {
        e.preventDefault();
        const updatedEmployee = {
            firstname: employee.firstname,
            lastname: employee.lastname,
            emailId: employee.emailId
        };

        console.log('updatedEmployee => ', updatedEmployee);

        EmployeeService.updateEmployee(updatedEmployee, id).then((res) => {
            console.log('Employee updated successfully.');
            // Redirect to employees list page
            window.location.href = '/employees'; 
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3>Update Employee</h3>
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

                                <button className='btn btn-success' onClick={updateEmployee}>
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
