import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Pagination } from '@mui/material';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5; // Set how many employees you want per page

  useEffect(() => {
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => setEmployees(data));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (field) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    
    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setEmployees(sortedEmployees);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(search.toLowerCase()) || 
    employee.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <TextField 
        variant="outlined" 
        placeholder="Enter Search Keyword" 
        value={search} 
        onChange={handleSearch} 
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={() => {/* Create Employee logic */}}>
        Create Employee
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'id'}
                  direction={sortField === 'id' ? sortOrder : 'asc'}
                  onClick={() => handleSort('id')}
                >
                  Unique Id
                </TableSortLabel>
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortOrder : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'email'}
                  direction={sortField === 'email' ? sortOrder : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'createDate'}
                  direction={sortField === 'createDate' ? sortOrder : 'asc'}
                  onClick={() => handleSort('createDate')}
                >
                  Create Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentEmployees.map(employee => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>
                  <img src={employee.image} alt={employee.name} width="50" height="50" />
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.course}</TableCell>
                <TableCell>{employee.createDate}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary">Edit</Button>
                  <Button variant="contained" color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination 
        count={Math.ceil(filteredEmployees.length / employeesPerPage)} 
        page={currentPage} 
        onChange={handlePageChange} 
        variant="outlined" 
        shape="rounded" 
      />
    </Container>
  );
};

export default EmployeeList;
