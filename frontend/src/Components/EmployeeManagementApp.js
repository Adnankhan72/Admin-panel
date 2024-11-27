import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { ToastContainer } from 'react-toastify';
import { GetAllEmployees } from '../api';
import DarkMode from './Darkmode';
import './EmployeeManagementApp.css'; // Import the CSS file

const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null);
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 9,
            totalEmployees: 0,
            totalPages: 0,
        },
    });

    const fetchEmployees = async (search = '', page = 1, limit = 9) => {
        try {
            const data = await GetAllEmployees(search, page, limit);
            setEmployeesData(data);
        } catch (err) {
            alert('Error fetching employees:', err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSearch = (e) => {
        fetchEmployees(e.target.value);
    };

    const handleUpdateEmployee = (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    };

    return (
        <div className="app-container">
            <div className='app'>
            <h1 className="app-title">Employee Management App  </h1>  
            <DarkMode/>
            </div>
           
            <div className="app-wrapper">
                <div className="app-content-box">
                    <div className="app-top-bar">
                        <button
                            className="app-add-button"
                            onClick={() => setShowModal(true)}
                        >
                            Add
                        </button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search Employees..."
                            className="app-search-input"
                        />
                    </div>
                    <EmployeeTable
                        employees={employeesData.employees}
                        pagination={employeesData.pagination}
                        fetchEmployees={fetchEmployees}
                        handleUpdateEmployee={handleUpdateEmployee}
                    />
                    <AddEmployee
                        fetchEmployees={fetchEmployees}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        employeeObj={employeeObj}
                    />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
            <div className='lastpart'>

            </div>
        </div>
    );
};

export default EmployeeManagementApp;
