import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const userId = firebase.auth().currentUser.uid;
      console.log(userId);
      const userRef = firebase.database().ref(`users/${userId}`);
      userRef.set({
        name,
        email,
      });

      // Display sweet alert
      await Swal.fire({
        icon: '',
        imageUrl: '/Images/happy.png',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom Image',
        title: 'Registration Complete',
        text: 'You have successfully registered.',
        showConfirmButton: false,
        timer: 2000,
      });

      // Navigate to home page
      navigate('/home'); // Use navigate function to navigate
    } catch (error) {
      Swal.fire({
        icon: '',
        title: 'Invalid Email / Password',
        customClass: {
          title: 'text-yellow',
        },
        imageUrl: '/Images/sad.png',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom Image',
        // text: error.message,
        footer: `<div class="text-gray">
        <div>Email taken / Password must have at least six characters</div>
        `,
      });
    }
  };

  return (
    <div className="container mt-5 p-5">
      <div className="row justify-content-center">
        <Col lg={6} md={8} sm={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="mt-4">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="mt-4">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <div className="mt-4">
              <Button variant="warning" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </div>
    </div>
  );
};

export default RegisterForm;
