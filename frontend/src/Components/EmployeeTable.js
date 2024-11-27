import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteEmployeeById } from '../api';
import { notify } from '../utils';
import './EmployerTable.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function EmployeeTable({
    employees = [], // Default to an empty array to handle missing employees prop
    pagination = { currentPage: 1, totalPages: 1 }, // Default pagination values
    fetchEmployees,
    handleUpdateEmployee,
}) {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions'];
    const { currentPage, totalPages } = pagination;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };

    const handlePagination = (page) => {
        fetchEmployees('', page, 5); // Adjust as needed based on backend API requirements
    };

    const handleDeleteEmployee = async (id) => {
        try {
            const { success, message } = await DeleteEmployeeById(id);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchEmployees();
        } catch (err) {
            console.error(err);
            notify('Failed to delete Employee', 'error');
        }
    };

    const TableRow = ({ employee }) => (
        <tr>
            <td>
                <Link to={`/employee/${employee._id}`} className="employee-link">
                    {employee.name}
                </Link>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>
                <span
                    className="icon edit-icon"
                    title="Edit"
                    onClick={() => handleUpdateEmployee(employee)}
                >
                    <EditIcon />
                </span>
                <span
                    className="icon delete-icon"
                    title="Delete"
                    onClick={() => handleDeleteEmployee(employee._id)}
                >
                    <DeleteIcon />
                </span>
            </td>
        </tr>
    );

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            <table className="employee-table">
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan={headers.length} className="no-data">
                                No Data Found
                            </td>
                        </tr>
                    ) : (
                        employees.map((emp) => <TableRow employee={emp} key={emp._id} />)
                    )}
                </tbody>
            </table>

            <div className="pagination-container">
                <span className="page-info">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="pagination-buttons">
                    <button
                        className="pagination-button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePagination(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="pagination-button"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default EmployeeTable;
