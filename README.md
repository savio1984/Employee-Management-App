# Employee Management App

A comprehensive Employee Management System with CRUD operations, built with Node.js, Express, SQLite, and React.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete employee records
- **Employee Fields**: ID, Name, Email, Department, Role, Hire Date
- **Search & Filter**: Filter employees by department
- **RESTful API**: Clean, RESTful API design
- **Error Handling**: Proper error handling and validation
- **Modern UI**: Responsive React frontend with clean design

## Tech Stack

### Backend
- **Node.js** with Express
- **SQLite** database
- **CORS** for cross-origin requests
- **Body-parser** for request parsing

### Frontend
- **React** for UI components
- **Modern JavaScript** (ES6+)
- **CSS3** for styling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Install backend dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Employee Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| GET | `/api/employees/department/:department` | Get employees by department |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Employee Object Structure

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@company.com",
  "department": "Engineering",
  "role": "Software Engineer",
  "hireDate": "2024-01-15"
}
```

## Usage Examples

### Create Employee
```bash
curl -X POST http://localhost:3001/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@company.com",
    "department": "Engineering",
    "role": "Software Engineer",
    "hireDate": "2024-01-15"
  }'
```

### Get All Employees
```bash
curl http://localhost:3001/api/employees
```

### Filter by Department
```bash
curl http://localhost:3001/api/employees/department/Engineering
```

### Update Employee
```bash
curl -X PUT http://localhost:3001/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@company.com",
    "department": "Engineering",
    "role": "Senior Software Engineer",
    "hireDate": "2024-01-15"
  }'
```

### Delete Employee
```bash
curl -X DELETE http://localhost:3001/api/employees/1
```

## Project Structure

```
Employee-Management-App/
├── backend/
│   ├── database.js          # SQLite database configuration
│   ├── server.js            # Express server setup
│   ├── models/
│   │   └── Employee.js      # Employee model
│   ├── routes/
│   │   └── employees.js     # Employee routes
│   └── middleware/
│       ├── errorHandler.js  # Error handling middleware
│       └── validation.js    # Request validation
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeList.js
│   │   │   ├── EmployeeList.css
│   │   │   ├── EmployeeForm.js
│   │   │   └── EmployeeForm.css
│   │   ├── services/
│   │   │   └── employeeService.js
│   │   ├── App.js
│   │   └── App.css
│   └── public/
├── package.json
└── README.md
```

## Features in Detail

### Input Validation
- Name, email, department, role, and hire date are required fields
- Email must be in valid format
- Email must be unique in the system
- Hire date must be in YYYY-MM-DD format

### Error Handling
- Comprehensive error messages for all operations
- HTTP status codes (200, 201, 400, 404, 409, 500)
- Client-side error display

### UI Features
- Responsive design
- Add/Edit employee form
- Department filter dropdown
- Confirmation dialog for deletions
- Clean, modern interface

## Development

### Running in Development Mode

**Backend:**
```bash
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## License

ISC
