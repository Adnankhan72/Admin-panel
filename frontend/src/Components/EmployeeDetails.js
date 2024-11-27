import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetEmployeeDetailsById } from '../api';
import './EmployeeDetails.css'; // Import custom CSS

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    const fetchEmployeeDetails = async () => {
        try {
            const data = await GetEmployeeDetailsById(id);
            setEmployee(data);
        } catch (err) {
            alert('Error', err);
        }
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);

    if (!employee) {
        return <div className="not-found">Employee not found</div>;
    }

    return (
        <div className="employee-container">
            <div className="employee-card">
                <div className="employee-header">
                    <h2>Employee Details</h2>
                </div>
                <div className="employee-body">
                    <div className="employee-details">
                        <img
                            src={employee.profileImage}
                            alt={employee.name}
                            className="employee-image"
                        />
                        <div className="employee-info">
                            <h4>{employee.name}</h4>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Phone:</strong> {employee.phone}</p>
                            <p><strong>Department:</strong> {employee.department}</p>
                            <p><strong>Salary:</strong> {employee.salary}</p>
                        </div>
                    </div>
                    <button
                        className="back-button"
                        onClick={() => navigate('/employee')}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
