import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveEmployees } from '../../actions/employees';
import { AddEmployee } from "../AddForm/AddEmployee";
import { UpdateEmployee } from "../UpdateForm/UpdateEmployee";
import {Icon} from 'semantic-ui-react';
import './employeetable.css';


export const EmployeeTable = () => {
    const [addForm, setAddForm] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    const [checked, setChecked] = useState(false);
    const [select, setSelect] = useState(false)
    const [updatedData, setUpdatedData] = useState({});
    const employees = useSelector(state => state.employees);
    const [newEmp, setNewEmp] = useState([]);
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveEmployees());
    }, [])

    console.log(employees)

    const AddEmployeeForm = () => {
        setAddForm(true);
        setUpdateForm(false);
        setChecked(false)
    }

    const UpdateEmployeeForm = () => {
        setUpdateForm(true)
        setAddForm(false);
    }

    const indexSelect = (dataId, index) => {
        setChecked(true);
        setSelect({...select,[index]:!select[index]})
        const filterEmployee = employees.filter((data) => data.id === dataId);
        setUpdatedData(filterEmployee)
    }

    const sortFirstName = (order) => {
        setShow1(!show1)
        switch (order) {
            case 'asc':
                return setNewEmp(employees.sort((a,b) => a.firstName > b.firstName ? 1:-1))
                break;
            case 'desc':
                return setNewEmp(employees.sort((a,b) => a.firstName < b.firstName ? 1:-1))
                break;
            default:
                break;
        }
    }

    const sortLastName = (order) => {
        setShow2(!show2)
        switch (order) {
            case 'asc':
                return setNewEmp(employees.sort((a,b) => a.lastName > b.lastName ? 1:-1))
                break;
            case 'desc':
                return setNewEmp(employees.sort((a,b) => a.lastName < b.lastName ? 1:-1))
                break;
        
            default:
                break;
        }
    }

    const sortUserName = (order) => {
        setShow3(!show3)
        switch (order) {
            case 'asc':
                return setNewEmp(employees.sort((a,b) => a.userName > b.userName ? 1:-1))
                break;
            case 'desc':
                return setNewEmp(employees.sort((a,b) => a.userName < b.userName ? 1:-1))
                break;
        
            default:
                break;
        }
    }

    return (
       <>
        <div  className="employee_table_flow">
            <div className="employee_table_main">
                    <div className="action_buttons">
                        <button onClick={AddEmployeeForm}>ADD</button>
                        <button onClick={UpdateEmployeeForm}>Update</button>
                    </div>
                <div className="employee_table_content">
                    <div>
                        {addForm &&
                        <>
                        <AddEmployee />
                        </>
                        }
                        {checked && 
                        <>
                        <UpdateEmployee myUpdateData={updatedData} />
                        </>
                        }
                    </div>
                    <div className="employee_table_display"> 
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th onClick={() => sortFirstName(show1 ? 'asc':'desc')} >FirstName {show1 ? <Icon name="angle up" />: <Icon name="angle down" />}</th>
                                    <th onClick={() => sortLastName(show2 ? 'asc':'desc')}>LastName {show2 ? <Icon name="angle up" />: <Icon name="angle down" />}</th>
                                    <th onClick={() => sortUserName(show3 ? 'asc':'desc')}>UserName {show3 ? <Icon name="angle up" />: <Icon name="angle down" />}</th>
                                    {updateForm && <th>Active</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {employees && employees.map((employee, ind) => {
                                    return(
                                        <tr key={ind}>
                                            <td>{ind+1}</td>
                                            <td>{employee.firstName} </td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.userName}</td>
                                            {updateForm && <td><input type="checkbox"   onChange={() => indexSelect(employee.id, ind) } /></td>}
                                        </tr>     
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
       </>
    )
}
