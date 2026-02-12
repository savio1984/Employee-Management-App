const API_BASE_URL = 'http://localhost:3001/api';

const employeeService = {
  async getAllEmployees() {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return await response.json();
  },

  async getEmployeesByDepartment(department) {
    const response = await fetch(`${API_BASE_URL}/employees/department/${encodeURIComponent(department)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return await response.json();
  },

  async getEmployeeById(id) {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employee');
    }
    return await response.json();
  },

  async createEmployee(employee) {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create employee');
    }
    return await response.json();
  },

  async updateEmployee(id, employee) {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update employee');
    }
    return await response.json();
  },

  async deleteEmployee(id) {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
    return await response.json();
  },
};

export default employeeService;
