import React, { useState    } from "react";
import { useDispatch } from "react-redux";
import { deleteEmployee, updateEmployee } from '../../actions/employees';
import './updateemployee.css';

export const UpdateEmployee = ({myUpdateData}) => {
    const initialEmployeeState = {
        id:"",
        firstName:"",
        lastName:"",
        userName:""
    };
    const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
    const dispatch = useDispatch(); 
    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentEmployee({ ...currentEmployee, [name]: value });
    };
    const updateContent = (id) => {
        const data = {
            id: id,
            firstName: currentEmployee.firstName,
            lastName: currentEmployee.lastName,
            userName: currentEmployee.userName
        }
        dispatch(updateEmployee(id, data))
        .then((response) =>{
            console.log(response);
            setCurrentEmployee({...currentEmployee})
        })
        .catch(e => {
            console.log(e);
        });
    }

   const deleteContent = (id) => {
            dispatch(deleteEmployee(id))
            .then(() => {
            })
            .catch(e => {
            console.log(e);
            });
    }
    console.log(myUpdateData)
    return (
        <div>
          {myUpdateData.map((data) => {
              return(
                  <div key={data} className="update_employee_main">
                       <form>
                            <div className="update_employee_flex">
                                <div className="update_employee_input">
                                    <input type="text" name="firstName" value={data.firstName} onChange={handleInputChange}   />
                                </div>
                                <div className="update_employee_input">
                                    <input type="text" name="lastName" value={data.lastName} onChange={handleInputChange}  />   
                                </div>
                                <div className="update_employee_input">
                                    <input type="text" name="userName" value={data.userName} onChange={handleInputChange}  />
                                </div>
                                <div className="update_employee_input">
                                    <button onClick={()=>updateContent(data.id)} className="btn">
                                        Update
                                    </button>
                                </div>  
                            </div>
                            <div className="update_employee_delete">
                                    <button onClick={() => deleteContent(data.id)}>Delete</button>
                            </div>
                        </form>
                  </div>
              )
          })}
        </div>
    )
}
