import React, { Component } from 'react';
import EmployeeService from './services/EmployeeService';
import {Link } from 'react-router-dom';
class ListEmployee extends Component {
    constructor(props){
        super(props);
        this.state={
            employeeList :[],
        }
    }
    deleteAll(){
        var deleted = EmployeeService.deleteEmplyoees();
        if(deleted){
            EmployeeService.getEmployees().then(response=>{
                this.setState({
                    employeeList:response.data
                })
            })
        }
    }
    delete(event){
        var id = event.target.getAttribute("data-value");
        EmployeeService.deleteEmployee(id).then(response=>{
            EmployeeService.getEmployees().then(response=>{
                this.setState({
                    employeeList:response.data
                })
            })
        })
    }
    componentDidMount(){
        EmployeeService.getEmployees().then(response=>{
            this.setState({
                employeeList:response.data
            })
        })
    }
    render() {
        return (
            <div>
            <h2 className='text-center'>
                List Employee
            </h2>
            <div className=''>
           
              <Link to='/add-employee' >
              <button className='btn btn-primary'>       
                     Add Employee</button>
              </Link>
              <button className='btn btn-danger' onClick={this.deleteAll.bind(this)}>Delete All Employees</button>
            </div>
            <div className='table-wrapper-scroll-y my-custom-scrollbar'>
            <table className='table table-bordered table-striped'> 
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Id</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.employeeList && Number(this.state.employeeList.length) > 0?this.state.employeeList.map(employee=>
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td><Link to={`/add-employee?id=${employee.id}`}><button className='btn btn-info'>Update</button></Link><button className='btn btn-danger' onClick={this.delete.bind(this)} data-value={employee.id}>Delete</button></td>
                            </tr>
                            ):""}
                    </tbody>
            </table>
            </div>
            </div>
        );
    }
}

export default ListEmployee;