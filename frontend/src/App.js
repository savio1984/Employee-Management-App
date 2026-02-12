import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import employeeService from './services/employeeService';

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
      setError('');
    } catch (err) {
      setError('Failed to load employees. Make sure the backend server is running.');
      console.error(err);
    }
  };

  const handleFilter = async (department) => {
    setFilter(department);
    if (department === '') {
      loadEmployees();
    } else {
      try {
        const data = await employeeService.getEmployeesByDepartment(department);
        setEmployees(data);
        setError('');
      } catch (err) {
        setError('Failed to filter employees');
        console.error(err);
      }
    }
  };

  const handleCreate = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.deleteEmployee(id);
        loadEmployees();
        setError('');
      } catch (err) {
        setError('Failed to delete employee');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (employee) => {
    try {
      if (selectedEmployee) {
        await employeeService.updateEmployee(selectedEmployee.id, employee);
      } else {
        await employeeService.createEmployee(employee);
      }
      setShowForm(false);
      setSelectedEmployee(null);
      loadEmployees();
      setError('');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedEmployee(null);
  };

  const uniqueDepartments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management System</h1>
      </header>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="container">
        <div className="toolbar">
          <button onClick={handleCreate} className="btn-add">
            Add New Employee
          </button>
          <div className="filter-section">
            <label htmlFor="department-filter">Filter by Department:</label>
            <select 
              id="department-filter"
              value={filter} 
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showForm && (
          <EmployeeForm
            employee={selectedEmployee}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        <EmployeeList
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
