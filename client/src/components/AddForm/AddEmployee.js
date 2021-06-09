import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, retrieveEmployees } from "../../actions/employees";
import './addemployee.css';

export const AddEmployee = () => {
    const initialEmployeeState = {
        id:"",
        firstName:"",
        lastName:"",
        userName:""
    };

    const [employee, setEmployee] = useState(initialEmployeeState);
    const [myEmployeeData, setMyEmployeeData] = useState([]);
    const [validateErr, setValidateErr] = useState("");
    const employees = useSelector(state => state.employees);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveEmployees());
    }, [])
    console.log("addemployee",employees)

    const handleInputChange = event => {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });
    };

    const saveEmployee = (e) => {
        e.preventDefault();
        const { firstName, lastName, userName} = employee;

        

        if(firstName === '' || lastName === '' || userName === ''){
            setValidateErr("All fields are required");
        }
        else{
            dispatch(createEmployee(firstName, lastName, userName))
            .then(data => {
                setEmployee({
                id:data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                userName: data.userName
                });
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
            setEmployee({
                firstName:"",
                lastName:"",
                userName:""
            })
        }
      };


    return(
        <>
            <div className="addemployee_main">
                <form autoComplete="off">
                    <div className="addemployee_flex">
                        <div className="addemployee_input">
                            <input type="text" name="firstName" placeholder="FirstName"  value={employee.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="addemployee_input">
                            <input type="text" name="lastName" placeholder="LastName" value={employee.lastName} onChange={handleInputChange} />
                        </div>
                        <div className="addemployee_input">
                            <input type="text" name="userName" placeholder="UserName" value={employee.userName} onChange={handleInputChange} />
                        </div>
                        <div className="addemployee_input">
                            <button onClick={(e) => saveEmployee(e)} className="btn">
                                ADD
                            </button>
                        </div>
                    </div>
                    <h4 style={{color:"red", textAlign:"center"}}>{validateErr}</h4>
                </form>
            </div>
        </>
    )
}