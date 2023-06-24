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
        icon: '',
        imageUrl: 'https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.6435-9/166038441_1118796105293262_4776616969989009322_n.jpg?_nc_cat=101&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEzWXWylY0KcehGnZSY5NxKLKYQ6zhP3u0sphDrOE_e7VGECBStajQ4EEDsk5fQpNxH0rrtkvj43fQKfdI5gV4h&_nc_ohc=k9JUSEbZzFUAX_ZiUhf&_nc_ht=scontent.fmnl17-1.fna&oh=00_AfC8Nhaso9zpumj9bD79s-Hbiq4aN-O5tJcaf_Zw3qUqfw&oe=64BE558C',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom Image',
        title: 'Success!',
        customClass: {
          title: 'text-green',
        },
        text: 'You have successfully logged in.',
      }).then(() => {
        navigate('/home'); // Replace '/home' with the actual path to your home page
      });
    } catch (error) {
      Swal.fire({
        icon: '',
        title: 'Invalid Username/Password',
        customClass: {
          title: 'text-yellow',
        },
        imageUrl: '/Images/sad.png',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom Image',
        footer: `<div class="text-gray">
                  <div>Don't have an account yet?</div>
                  <div style="padding-left: 30px;"><a href="/register"><h5>Register Here</h5></a></div>
                </div>`,
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
