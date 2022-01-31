import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from './services/EmployeeService';
import queryString from 'query-string'
class CreateEmployee extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName:"",
            lastName:"",
            emailId:"",
            cancel:false,  
        }
        this.changeValue = this.changeValue.bind(this);
    }
    changeValue(event){
        this.setState({
            [event.target.name]:event.target.value
       })
    }
    saveOrUpdate(event,id){
        var id = event.target.getAttribute('data-value');
        event.preventDefault();
        let employee = {firstName:this.state.firstName,lastName:this.state.lastName,emailId:this.state.emailId}
        if(id){
            EmployeeService.updateEmployee(employee,id).then(response=>{
                window.location.href = '/employees'
            })
        }else{
            EmployeeService.createEmployee(employee).then(response=>{
            window.location.href = '/employees'
            })
        }
       
    }
    cancel(event){
        event.preventDefault();
        this.setState({
            firstName:"",
            lastName:"",
            emailId:""

        })
    }
    componentDidMount(){
        const value=queryString.parse(window.location.search);
        const id=value.id;
       if(id === -1){
           return 
       }else{
        EmployeeService.getEmployeeById(id).then(response=>{
           this.setState({
               firstName:response.data.firstName,
               lastName:response.data.lastName,
               emailId:response.data.emailId,
           })
        })
       }
       this.setState({
           id:id
       })
    }
    render() {
         return (
        <div className='container'>
            {this.state.cancel === true?<Link to="/add-employee"></Link>:""}
            <div className='row'>
              <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h3 className='text-center'>Add Employee</h3>
                <div className='card-body'>
                    <form>
                        <div className='form-group'> 
                            <label>First Name :</label>
                            <input className='form-control' placeholder='First Name' 
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.changeValue}
                            >
                            </input>
                        </div>
                        <div className='form-group mt-2'> 
                            <label>Last Name :</label>
                            <input className='form-control' placeholder='Last Name' 
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.changeValue}
                            >
                            </input>
                        </div>
                        <div className='form-group mt-2' >  
                            <label>Email Id :</label>
                            <input className='form-control' placeholder='Email Id' 
                            name="emailId"
                            value={this.state.emailId}
                            onChange={this.changeValue}
                            >
                            </input>
                        </div>
                            <button className='btn btn-success mt-2'  onClick={this.saveOrUpdate.bind(this)} data-value={this.state.id}>{this.state.id?'Update':'Add'}</button>
                            <button className='btn btn-danger mt-2' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                            <Link to="/employees"> <button className='btn btn-primary mt-2' style={{marginLeft:"10px"}}>Back</button></Link>
                    </form>
                </div>
              </div>
           </div>
        </div>
        );
    }
}

export default CreateEmployee;