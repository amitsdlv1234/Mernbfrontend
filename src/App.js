import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './components/Login Page/LoginPage';
import AdminDashboard from './components/Admin Dashboard/AdminDashboard';
import CreateEmployee from './components/EmployeeData/CreateEmployee';
import EmployeeEdit from './components/EmployeeEdit/EmployeeEdit';
import EmployeeList from './components/EmployeeList/EmployeeList';

function App() {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setAdminName(storedUserName);
    }
  }, []);

  return (
    <Router>
      {adminName && <Navbar adminName={adminName} setAdminName={setAdminName} />}
      <Routes>
        <Route path="/" element={<LoginPage setAdminName={setAdminName} />} />
        <Route path="/AdminDashboard" element={adminName ? <AdminDashboard adminName={adminName} /> : <Navigate to="/" />} />
        <Route path="/CreateEmployee" element={adminName ? <CreateEmployee /> : <Navigate to="/" />} />
        <Route path="/EmployeeEdit/:id" element={adminName ? <EmployeeEdit /> : <Navigate to="/" />} />
        <Route path="/EmployeeList" element={adminName ? <EmployeeList /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
