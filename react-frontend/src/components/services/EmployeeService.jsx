import React, { Component } from 'react';
import axios from 'axios'
const EMPLOYEE_API_BASE_URL  = "http://localhost:8080/api/v1/"
class EmployeeService{
 
    createEmployee(employee){
       return axios.post(EMPLOYEE_API_BASE_URL+"save-employee",employee)
    }
    updateEmployee(employee,id){
        return axios.put(EMPLOYEE_API_BASE_URL+"update-employee"+"/"+ id, employee)
     }
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL+"get-employees")
    }
    getEmployeeById(id){
        return axios.get(EMPLOYEE_API_BASE_URL+"get-employee-by-id" +"/"+id)
    }
    deleteEmplyoees(){
        return axios.delete(EMPLOYEE_API_BASE_URL+"delete-employees")
    }
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL+"delete-employee" +"/"+ id)
    }
}

export default new EmployeeService();