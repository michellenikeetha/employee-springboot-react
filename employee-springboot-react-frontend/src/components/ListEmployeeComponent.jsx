import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

export default class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
        }
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then ( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>

                <div className="row">
                    <Link to="/add-employees" className="btn btn-primary">
                        Add Employee
                    </Link>
                </div>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.firstname}</td>
                                    <td>{employee.lastname}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                        <Link
                                            to={`/update-employees/${employee.id}`}
                                            className="btn btn-info"
                                        >
                                            Update
                                        </Link>
                                        <button onClick={ () => this.deleteEmployee(employee.id)} className='btn btn-danger' style={{marginLeft: "10px"}}>Delete</button>
                                        <button onClick={ () => this.viewEmployee(employee.id)} className='btn btn-info' style={{marginLeft: "10px"}}>View</button>
                                        <Link
                                            to={`/view-employee/${employee.id}`}
                                            className="btn btn-info"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
