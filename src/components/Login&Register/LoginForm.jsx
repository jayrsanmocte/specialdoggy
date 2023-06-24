import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const LoginForm = ({ onRegisterClick }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You have successfully logged in.',
      }).then(() => {
        navigate('/home'); // Replace '/home' with the actual path to your home page
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="container mt-5 p-5" style={{ width: '40%' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-4">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <div className="mt-4">
          <Button className="me-4" variant="warning" type="submit">
            Login
          </Button>

          <Form.Text className="text-muted mt-5">
            Don't have an account yet?{' '}
            <Link className="text-primary" style={{ cursor: 'pointer' }} to="/register">
              Register here
            </Link>
            .
          </Form.Text>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
