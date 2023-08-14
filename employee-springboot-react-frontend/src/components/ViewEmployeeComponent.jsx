import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

export default function ViewEmployeeComponent() {
    const { id } = useParams();

    const [employee, setEmployee] = useState({});

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            setEmployee(res.data);
        });
    }, [id]);

    return (
        <div>
            <div className='card col-md-6 offset-md-3'>
                <h3 className='text-center'>View Employee Details</h3>
                <div className='card-body'>
                    <div className='row'>
                        <label> Employee First Name:</label>
                        <div>{employee.firstname}</div>
                    </div>
                    <div className='row'>
                        <label> Employee Last Name: </label>
                        <div> {employee.lastname}</div>
                    </div>
                    <div className='row'>
                        <label> Employee Email ID: </label>
                        <div> {employee.emailId}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
