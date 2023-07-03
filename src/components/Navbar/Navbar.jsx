import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
  const navigate = useNavigate();
  const [logoSrc, setLogoSrc] = useState('/Images/logoDog.png');
  const [userData, setUserData] = useState(null);
  const [user] = useAuthState(firebase.auth());
  
  
  useEffect(() => {
    if (user) {
      const userRef = firebase.database().ref(`users/${user.uid}`);
      userRef.on('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          console.log(userData);
          setUserData(userData);
        }
      });
    }
  }, [user]);
  
  const handleShelterMapClick = () => {
    
    navigate('/shelterMap');
    window.location.reload();
  };

  
  const handleNavItemHover = () => {
    setLogoSrc('/Images/logoDog1.png');
  };
  
  const handleNavItemLeave = () => {
    setLogoSrc('/Images/logoDog.png');
  };

  async function handleLogout() {
    try {
      await firebase.auth().signOut();
      Swal.fire({
      icon: '',
      imageUrl: '/Images/sad2.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom Image',
      title: 'Successfully Log out',
      customClass: {
        title: 'text-red',
      }
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }
  
  const handleHomeClick = (e) => {
    const clickedLink = e.target.getAttribute('href');
  
    if (!user && clickedLink && isRestrictedPath !== '/searchDog' && clickedLink !== '/applicants') {
      e.preventDefault();
      navigate('/login');
    } else if (!user && clickedLink && isRestrictedPath !== '/about') {
      navigate('/about');
    }
  };
  
  const handleRedirect = () => {
    const path = window.location.pathname;
    const isRestrictedPath = path === '/searchDog' || path === '/applicants';
  
    if (!user && isRestrictedPath) {
      navigate('/login');
    }
  };
  
  const handleInitialPageLoad = () => {
    const path = window.location.pathname;
    const isRestrictedPath = path === '/applicants' || path === '/searchdog';
  
    if (!user && isRestrictedPath) {
      navigate('/login');
    }
  };
  
  useEffect(() => {
    handleRedirect();
    // Listen to location changes
    window.addEventListener('popstate', handleRedirect);
  
    return () => {
      // Clean up event listener
      window.removeEventListener('popstate', handleRedirect);
    };
  }, [user, navigate]);
  
  useEffect(() => {
    handleInitialPageLoad();
  }, [user, navigate]);
  
  // Add event listener to handle page refresh
  useEffect(() => {
    const handlePageRefresh = (event) => {
      // Check if the user is logged in, and if so, save the current path in local storage
      if (user) {
        localStorage.setItem('currentPath', window.location.pathname);
      }
    };
  
    window.addEventListener('beforeunload', handlePageRefresh);
  
    return () => {
      // Clean up event listener
      window.removeEventListener('beforeunload', handlePageRefresh);
    };
  }, [user]);
  
  useEffect(() => {
    const storedPath = localStorage.getItem('currentPath');
  
    if (storedPath && !user) {
      navigate(storedPath);
      localStorage.removeItem('currentPath');
    }
  }, [user, navigate]);
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand me-5" href="#">
            <img
              src={logoSrc}
              alt="Logo Dog"
              style={{ width: '5rem', height: '4rem' }}
            />
            <img
              className="specialDog"
              src="/Images/special-dog.png"
              alt="Logo Dog"
              style={{ width: '6rem', height: '2rem' }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link me-5"
                  aria-current="page"
                  to="/home"
                  onMouseEnter={handleNavItemHover}
                  onMouseLeave={handleNavItemLeave}
                 
                >
                  <i className="fas fa-paw me-3"></i>Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link me-5"
                  to="/about"
                  onMouseEnter={handleNavItemHover}
                  onMouseLeave={handleNavItemLeave}
                  
                >
                  <i className="fas fa-paw me-3 hvr-icon-buzz-out"></i>About
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link me-5"
                  to="/shelterMap"
                  onMouseEnter={handleNavItemHover}
                  onMouseLeave={handleNavItemLeave}
                  onClick={handleShelterMapClick}
                >
                  <i className="fas fa-paw me-3 hvr-icon-buzz-out"></i>Shelter Map
                </Link>
              </li>


              <li className="nav-item">
                <Link
                  className="nav-link me-5"
                  to="/applicants"
                  onMouseEnter={handleNavItemHover}
                  onMouseLeave={handleNavItemLeave}
                  onClick={handleHomeClick}
                >
                  <i className="fas fa-paw me-3 hvr-icon-buzz-out"></i>Adopt a Dog
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link me-5"
                  to="/searchDog"
                  onMouseEnter={handleNavItemHover}
                  onMouseLeave={handleNavItemLeave}
                  onClick={handleHomeClick}
                >
                  <i className="fas fa-paw me-3 hvr-icon-buzz-out"></i>Search a Dog
                </Link>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link me-5"
                  href="#footer"
                  onMouseEnter={handleNavItemHover}
                  onMouseLeave={handleNavItemLeave}
                  // onClick={handleHomeClick}
                >
                  <i className="fas fa-paw me-3 hvr-icon-buzz-out"></i>Contact
                </a>
              </li>
            </ul>
            {user ? (
              <>
                <a
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                  className="nav-link me-5"
                >
                              <span style={{
                background: `linear-gradient(to right, black 40%, rgba(252,176,66,255) 60%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {userData && userData.name}
              </span>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle ms-3"
                    height="50"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      My profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleLogout} href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </>
            ) : (
              <form className="d-flex me-5 align-items-center justify-content-between" role="search">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <Link className="nav-link me-3 hvr-icon-buzz-out" to="/login">
                    LogIn
                  </Link>
                  <Link className="nav-link me-3 hvr-icon-buzz-out" to="/register">
                    Register
                  </Link>
                </ul>
              </form>
            )}
          </div>
        </div>
      </nav>
      <div><img src='/Images/school-divider1.png' alt="" id='imagelogo'/></div>
    </>
  );
}

export default Navbar;