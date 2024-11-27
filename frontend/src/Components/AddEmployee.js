import React, { useEffect, useState } from 'react';
import { notify } from '../utils';
import { CreateEmployee, UpdateEmployeeById } from '../api';
import './AddEmplyer.css'; // Custom CSS file

function AddEmployee({ showModal, setShowModal, fetchEmployees, employeeObj }) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null,
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (employeeObj) {
            setEmployee(employeeObj);
            setUpdateMode(true);
        }
    }, [employeeObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    };

    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
        });
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode
                ? await UpdateEmployeeById(employee, employee._id)
                : await CreateEmployee(employee);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create Employee', 'error');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployeeStates();
    };

    return (
        <div className={`custom-modal ${showModal ? 'visible' : ''}`}>
            <div className="custom-modal-dialog">
                <div className="custom-modal-content">
                    <div className="custom-modal-header">
                        <h5 className='auto'>{updateMode ? 'Update Employee' : 'Add Employee'}</h5>
                        <button className="close-button" onClick={handleModalClose}>
                            ×
                        </button>
                    </div>
                    <div className="custom-modal-body">
                        <form onSubmit={handleAddEmployee}>
                            {[
                                { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter a Name' },
                                { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter an Email' },
                                { label: 'Phone', name: 'phone', type: 'text', placeholder: 'Enter a Phone Number' },
                                { label: 'Department', name: 'department', type: 'text', placeholder: 'Enter a Department' },
                                { label: 'Salary', name: 'salary', type: 'text', placeholder: 'Enter a Salary' },
                            ].map(({ label, name, type, placeholder }) => (
                                <div className="form-group" key={name}>
                                    <label>{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={employee[name]}
                                        onChange={handleChange}
                                        placeholder={placeholder} // Add placeholder here
                                        required
                                    />
                                </div>
                            ))}
                            {/* <div className="form-group">
                                <label>Profile Image</label>
                                <input type="file" name="profileImage" onChange={handleFileChange} />
                            </div> */}
                            <button type="submit" className="submit-button">
                                {updateMode ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
