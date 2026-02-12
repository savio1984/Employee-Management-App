function validateEmployee(req, res, next) {
  const { name, email, department, role, hireDate } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }
  
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  
  if (!department || typeof department !== 'string' || department.trim().length === 0) {
    return res.status(400).json({ error: 'Department is required and must be a non-empty string' });
  }
  
  if (!role || typeof role !== 'string' || role.trim().length === 0) {
    return res.status(400).json({ error: 'Role is required and must be a non-empty string' });
  }
  
  if (!hireDate || !isValidDate(hireDate)) {
    return res.status(400).json({ error: 'Valid hire date is required (YYYY-MM-DD format)' });
  }
  
  next();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidDate(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

module.exports = { validateEmployee };
