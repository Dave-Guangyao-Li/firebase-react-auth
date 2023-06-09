import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
      <div className='w-100' style={{ maxWidth: "400px" }} >
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} exact />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Routes>
          </AuthProvider>
        </Router>

      </div>

    </Container >
  )
}

export default App;
