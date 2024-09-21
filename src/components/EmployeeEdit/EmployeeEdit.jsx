import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EmployeeEdit = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/employees/${id}`)
      .then(response => response.json())
      .then(data => setEmployee(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedCourse = checked 
        ? [...employee.course, value] 
        : employee.course.filter(course => course !== value);
      setEmployee({ ...employee, course: updatedCourse });
    } else if (type === 'file') {
      setEmployee({ ...employee, image: e.target.files[0] });
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const validate = () => {
    const errors = {};
    if (!employee.name) errors.name = 'Name is required';
    if (!employee.email || !/\S+@\S+\.\S+/.test(employee.email)) errors.email = 'Valid email is required';
    if (!employee.mobile || !/^\d+$/.test(employee.mobile)) errors.mobile = 'Valid mobile number is required';
    if (!employee.designation) errors.designation = 'Designation is required';
    if (!employee.gender) errors.gender = 'Gender is required';
    if (employee.course.length === 0) errors.course = 'At least one course should be selected';
    if (!employee.image) errors.image = 'Image is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('name', employee.name);
      formData.append('email', employee.email);
      formData.append('mobile', employee.mobile);
      formData.append('designation', employee.designation);
      formData.append('gender', employee.gender);
      formData.append('course', employee.course.join(', '));
      formData.append('image', employee.image);

      fetch(`/api/employees/${employee.id}`, {
        method: 'PUT',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Employee updated successfully:', data);
        setSnackbarOpen(true);
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ width: '50%', mt: 4 }}> {/* Adjust maxWidth here */}
      <Typography variant="h4" gutterBottom>
        Edit Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Name" 
          variant="outlined" 
          name="name" 
          value={employee.name} 
          onChange={handleChange} 
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />
        <TextField 
          label="Email" 
          variant="outlined" 
          name="email" 
          type="email" 
          value={employee.email} 
          onChange={handleChange} 
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />
        <TextField 
          label="Mobile No" 
          variant="outlined" 
          name="mobile" 
          type="text" 
          value={employee.mobile} 
          onChange={handleChange} 
          error={!!errors.mobile}
          helperText={errors.mobile}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Designation</InputLabel>
          <Select
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            error={!!errors.designation}
          >
            <MenuItem value=""><em>Select</em></MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
          </Select>
          {errors.designation && <span className="error">{errors.designation}</span>}
        </FormControl>

        <Typography variant="subtitle1">Gender</Typography>
        <RadioGroup 
          name="gender" 
          value={employee.gender} 
          onChange={handleChange} 
          row
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
        </RadioGroup>
        {errors.gender && <span className="error">{errors.gender}</span>}

        <FormGroup>
          <Typography variant="subtitle1">Course</Typography>
          <FormControlLabel 
            control={<Checkbox checked={employee.course.includes('MCA')} value="MCA" onChange={handleChange} />} 
            label="MCA" 
          />
          <FormControlLabel 
            control={<Checkbox checked={employee.course.includes('BCA')} value="BCA" onChange={handleChange} />} 
            label="BCA" 
          />
          <FormControlLabel 
            control={<Checkbox checked={employee.course.includes('BSC')} value="BSC" onChange={handleChange} />} 
            label="BSC" 
          />
          {errors.course && <span className="error">{errors.course}</span>}
        </FormGroup>

        <Box margin="normal">
          <Typography variant="subtitle1">Image Upload:</Typography>
          <input 
            type="file" 
            name="image" 
            accept="image/jpeg, image/png" 
            onChange={handleChange} 
          />
          {imagePreview && <img src={imagePreview} alt="Preview" width="100" height="100" />}
          {errors.image && <span className="error">{errors.image}</span>}
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Employee updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployeeEdit;
