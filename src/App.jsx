import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home';
import LoginForm from './components/Login&Register/LoginForm';
import RegisterForm from './components/Login&Register/RegisterForm';
import Adopt from './components/Adopt/Adopt';
import DoggyMap from './components/DoggyMAp/DoggyMap';
import ApplicantsInfo from './components/Adopt/ApplicantsInfo';
import Applicantsrehome from './components/Adopt/Applicantsrehome';
import Dogdata from './components/Dogdata/Dogdata';
import SearchDog from './components/Dogdata/SearchDog';
import About from './components/About/About';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import NotFound from './NotFound';

const firebaseConfig = {
  apiKey: "AIzaSyCLdmkJg3ZES8fqQ7bt7vT7B3LtyKivUEk",
  authDomain: "specialdog-792b5.firebaseapp.com",
  projectId: "specialdog-792b5",
  storageBucket: "specialdog-792b5.appspot.com",
  messagingSenderId: "905614307691",
  appId: "1:905614307691:web:1171004af05677b571dc2e",
  databaseURL:"https://specialdog-792b5-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
firebase.initializeApp(firebaseConfig);
  
  const App = () => {
    const [selectedDogName, setSelectedDogName] = useState('');
     
    return (
      <>
        <Routes basename="/">
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/applicants" element={<Adopt />} />
            <Route path="/shelterMap" element={<DoggyMap />} />
            <Route path="/appinfo" element={<ApplicantsInfo selectedDogName={selectedDogName} />} />
            <Route path="/apprehome" element={<Applicantsrehome selectedDogName={selectedDogName} />} />
            <Route path="/appinfo/:id" element={<ApplicantsInfo />} />
            <Route path="/apprehome/:id" element={<Applicantsrehome />} />
            <Route path="/searchDog" element={<SearchDog />} />
            <Route path="/dogdata" element={<Dogdata />} />
            {/* <Route path="/contacts" element={<Footer />} /> */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  };

  export default App;
