const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { validateEmployee } = require('../middleware/validation');

// GET all employees
router.get('/', (req, res, next) => {
  Employee.getAll((err, employees) => {
    if (err) {
      return next(err);
    }
    res.json(employees);
  });
});

// GET employees by department
router.get('/department/:department', (req, res, next) => {
  const department = req.params.department;
  Employee.getByDepartment(department, (err, employees) => {
    if (err) {
      return next(err);
    }
    res.json(employees);
  });
});

// GET employee by ID
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Employee.getById(id, (err, employee) => {
    if (err) {
      return next(err);
    }
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  });
});

// CREATE new employee
router.post('/', validateEmployee, (req, res, next) => {
  const employee = {
    name: req.body.name,
    email: req.body.email,
    department: req.body.department,
    role: req.body.role,
    hireDate: req.body.hireDate
  };
  
  Employee.create(employee, (err, id) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return next(err);
    }
    res.status(201).json({ id, ...employee });
  });
});

// UPDATE employee
router.put('/:id', validateEmployee, (req, res, next) => {
  const id = req.params.id;
  const employee = {
    name: req.body.name,
    email: req.body.email,
    department: req.body.department,
    role: req.body.role,
    hireDate: req.body.hireDate
  };
  
  Employee.update(id, employee, (err, changes) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return next(err);
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ id: parseInt(id), ...employee });
  });
});

// DELETE employee
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Employee.delete(id, (err, changes) => {
    if (err) {
      return next(err);
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  });
});

module.exports = router;
