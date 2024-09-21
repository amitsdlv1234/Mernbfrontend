import React, { useState } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, Snackbar, Alert } from '@mui/material';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: 'HR',
    gender: '',
    course: [],
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.mobile || isNaN(formData.mobile)) newErrors.mobile = 'Valid mobile number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.image) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      // Submit formData to server here
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          course: [...prevData.course, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          course: prevData.course.filter((course) => course !== value),
        }));
      }
    } else if (type === 'file') {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ width: '50%', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Name" 
          variant="outlined" 
          name="name" 
          value={formData.name} 
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
          value={formData.email} 
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
          value={formData.mobile} 
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
            value={formData.designation}
            onChange={handleChange}
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <Typography variant="subtitle1">Gender</Typography>
          <RadioGroup name="gender" value={formData.gender} onChange={handleChange}>
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
          </RadioGroup>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </FormControl>

        <FormGroup margin="normal">
          <Typography variant="subtitle1">Course</Typography>
          <FormControlLabel 
            control={<Checkbox checked={formData.course.includes('MCA')} value="MCA" onChange={handleChange} />} 
            label="MCA" 
          />
          <FormControlLabel 
            control={<Checkbox checked={formData.course.includes('BCA')} value="BCA" onChange={handleChange} />} 
            label="BCA" 
          />
          <FormControlLabel 
            control={<Checkbox checked={formData.course.includes('BSC')} value="BSC" onChange={handleChange} />} 
            label="BSC" 
          />
        </FormGroup>

        <input 
          type="file" 
          name="image" 
          accept=".jpg,.png" 
          onChange={handleChange} 
        />
        {errors.image && <span className="error">{errors.image}</span>}

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Employee created successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateEmployee;
