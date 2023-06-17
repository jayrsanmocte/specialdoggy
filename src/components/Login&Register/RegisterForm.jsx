import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';


const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your registration logic here
  //   console.log('Name:', name);
  //   console.log('Email:', email);
  //   console.log('Password:', password);
  //   // Reset the form
  //   setName('');
  //   setEmail('');
  //   setPassword('');
  
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email,password)
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const userId = firebase.auth().currentUser.uid;
    console.log(userId)
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.set({ 
        name,
        email,
    });

} catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: '<a href="">Why do I have this issue?</a>'
        })
    }
};





  return (

    <div className="container mt-5 p-5" style={{width:'40%'}}>
        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" value={name} onChange={handleNameChange}/>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label  className='mt-4'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label  className='mt-4'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      </Form.Group>

      <Button  className='mt-4' variant="warning" type="submit">
        Register
      </Button>
    </Form>
</div>
    
  );
};

export default RegisterForm;
