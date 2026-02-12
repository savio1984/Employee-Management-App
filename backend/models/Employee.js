const db = require('../database');

class Employee {
  static getAll(callback) {
    const sql = 'SELECT * FROM employees ORDER BY id DESC';
    db.all(sql, [], callback);
  }

  static getById(id, callback) {
    const sql = 'SELECT * FROM employees WHERE id = ?';
    db.get(sql, [id], callback);
  }

  static getByDepartment(department, callback) {
    const sql = 'SELECT * FROM employees WHERE department = ? ORDER BY id DESC';
    db.all(sql, [department], callback);
  }

  static create(employee, callback) {
    const sql = 'INSERT INTO employees (name, email, department, role, hireDate) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [employee.name, employee.email, employee.department, employee.role, employee.hireDate], function(err) {
      callback(err, this ? this.lastID : null);
    });
  }

  static update(id, employee, callback) {
    const sql = 'UPDATE employees SET name = ?, email = ?, department = ?, role = ?, hireDate = ? WHERE id = ?';
    db.run(sql, [employee.name, employee.email, employee.department, employee.role, employee.hireDate, id], function(err) {
      callback(err, this ? this.changes : 0);
    });
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.run(sql, [id], function(err) {
      callback(err, this ? this.changes : 0);
    });
  }
}

module.exports = Employee;
