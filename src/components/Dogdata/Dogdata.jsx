// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function Dogdata() {
//   const [breedImages, setBreedImages] = useState([]);
//   const [breedData, setBreedData] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [spanName, setspanName] = useState([]);

//   useEffect(() => {
//     let urlParams = new URLSearchParams(window.location.search);
//     let breedname = urlParams.get('breedname');
//     let breedid = urlParams.get('breedid');

//     dogfetchdata(breedname, breedid);
//   }, []);

//   function divideString(str) {
//     const middleIndex = Math.floor(str.length / 2); // Calculate the middle index of the string
//     const firstHalf = str.slice(0, middleIndex); // Extract the first half of the string
//     const secondHalf = str.slice(middleIndex); // Extract the second half of the string
  
//     return [firstHalf, secondHalf]; // Return an array with the divided parts
//   }

//   function dogfetchdata(breedname, breedid) {
//     axios
//       .get(`https://dog.ceo/api/breed/${breedname}/images`)
//       .then((response) => setBreedImages(response.data.message))
//       .catch((error) => console.log(error));

//     axios
//       .get(`https://dogapi.dog/api/v2/breeds/${breedid}`)
//       .then((response) => {
//         const breed = response.data.data;
//         if (breed) {
//           const {
//             name,
//             description,
//             life: { min: minLife, max: maxLife },
//             male_weight: { min: minMaleWeight, max: maxMaleWeight },
//             female_weight: { min: minFemaleWeight, max: maxFemaleWeight },
//           } = breed.attributes;

//           setBreedData({
//             name,
//             description,
//             life: `${minLife} - ${maxLife}`,
//             maleWeight: `${minMaleWeight} - ${maxMaleWeight}`,
//             femaleWeight: `${minFemaleWeight} - ${maxFemaleWeight}`,
//           });
//           console.log(response.data.data)
//           setspanName(divideString(response.data.data.attributes.name))
//         } else {
//           console.log('Breed data not found');
//         }
//         setIsLoading(false);
//       })
//       .catch((error) => console.log(error));
//   }

//   return ( 
    
//     // <div style={{ overflow: 'hidden' }}>
//       <div className="background-container">
//         {isLoading ? (
//           <div className="d-flex justify-content-center mt-5">
//             <div className="spinner-grow text-primary" role="status">
//               <p></p>
//             </div>
//           </div>
          
//         ) : (
//           <div className="container doggy-container" id="dogowarper">
//             <div className="row">
//               <div className="col-md-6">
//               {/* <h3 className='dogo'>{breedData.name}</h3> */}
//               <h3 className='dogo'><span className='spanName1'>{spanName[0]}</span><span className='spanName2'>{spanName[1]}</span></h3>
//                 <div id="carouselExampleIndicators" className="carousel slide" data-mdb-ride="carousel">
//                   <div className="carousel-indicators">
//                     {breedImages.slice(0, 5).map((_, index) => (
//                       <button
//                         type="button"
//                         data-mdb-target="#carouselExampleIndicators"
//                         data-mdb-slide-to={index}
//                         className={index === currentImageIndex ? 'active' : ''}
//                         aria-label={`Slide ${index + 1}`}
//                         key={index}
//                       ></button>
//                     ))}
//                   </div>
//                   <div className="carousel-inner">
//                     {breedImages.map((image, index) => (
//                       <div
//                         className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`}
//                         key={index}
//                       >
//                         <div className="carouselBox">
//                           <img src={image} className="carousel-image" alt={breedData.name} />
//                         </div>
                        
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="col-md-6">
//                 <div className="amen">
//                 <div className="row thumbnail-galleryDogdata">
//                   {breedImages.slice(0, 12).map((image, index) => (
//                     <div className="col-4 mb-2" key={index}>
//                       <img
//                         src={image}
//                         className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
//                         alt={breedData.name}
//                         onClick={() => setCurrentImageIndex(index)}
//                         style={{ width: '100%', height: '100px', objectFit: 'cover' }}
//                       />
//                     </div>
//                   ))}
//                 </div>
               
//                 <div className="pBox">
//                   <div className="ppBox">
//                     <p>Description: {breedData.description}</p>
//                     <p className="pdog">Life: {breedData.life}</p>
//                     <p className="pdog">Male Weight: {breedData.maleWeight}</p>
//                     <p className="pdog">Female Weight: {breedData.femaleWeight}</p>
//                   </div>
//                 </div>
//                 <Link to="/searchDog">
//                   <div className="inamoTalaga">
//                     <div className="inamoBox mt-5">
//                       <button className="btn btn-warning inamo">Search Other Dogs</button>
//                     </div>
//                   </div>
//                 </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     // </div>
//   );
// }

// export default Dogdata;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

function Dogdata() {
  const [breedImages, setBreedImages] = useState([]);
  const [breedData, setBreedData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [spanName, setSpanName] = useState([]);

  const [user, loading, error] = useAuthState(firebase.auth());
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const breedname = urlParams.get('breedname');
    const breedid = urlParams.get('breedid');

    dogFetchData(breedname, breedid);
  }, []);

  function dogFetchData(breedname, breedid) {
    axios
      .get(`https://dog.ceo/api/breed/${breedname}/images`)
      .then((response) => setBreedImages(response.data.message))
      .catch((error) => console.log(error));

    axios
      .get(`https://api.thedogapi.com/v1/breeds/${breedid}`)
      .then((response) => {
        const breed = response.data;
        if (breed) {
          setBreedData({
            name: breed.name,
            bredFor: breed.bred_for,
            breedGroup: breed.breed_group,
            lifeSpan: breed.life_span,
            temperament: breed.temperament,
            origin: breed.origin,
          });
        } else {
          console.log('Breed data not found');
        }
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }

  function divideString(str) {
    const middleIndex = Math.floor(str.length / 2);
    const firstHalf = str.slice(0, middleIndex);
    const secondHalf = str.slice(middleIndex);

    return [firstHalf, secondHalf];
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  if (!user) {
    // Redirect to login page or display a message
    navigate('/login');
    return null;
  }
  return (
    <div className="background-container">
      {isLoading ? (
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="container doggy-container" id="dogowarper">
          <div className="row">
            <div className="col-md-6">
              <h3 className="dogo">
                <span className="spanName1">{divideString(breedData?.name || '')[0]}</span>
                <span className="spanName2">{divideString(breedData?.name || '')[1]}</span>
              </h3>
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-mdb-ride="carousel"
              >
                <div className="carousel-indicators">
                  {breedImages.slice(0, 5).map((_, index) => (
                    <button
                      type="button"
                      data-mdb-target="#carouselExampleIndicators"
                      data-mdb-slide-to={index}
                      className={index === currentImageIndex ? 'active' : ''}
                      aria-label={`Slide ${index + 1}`}
                      key={index}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {breedImages.map((image, index) => (
                    <div
                      className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`}
                      key={index}
                    >
                      <div className="carouselBox">
                        <img
                          src={image}
                          className="carousel-image"
                          alt={breedData?.name}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="amen">
                <div className="row thumbnail-galleryDogdata">
                  {breedImages.slice(0, 12).map((image, index) => (
                    <div className="col-4 mb-2" key={index}>
                      <img
                        src={image}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        alt={breedData?.name}
                        onClick={() => setCurrentImageIndex(index)}
                        style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
                <div className="pBox">
                  <div className="ppBox">
                    {breedData && (
                      <>
                        {/* <p>name: {breedData.name}</p> */}
                        <p>Breed For: {breedData.bredFor}</p>
                        {/* <p>breedGroup: {breedData.breedGroup}</p> */}
                        <p>LifeSpan: {breedData.lifeSpan}</p>
                        <p>Behavior: {breedData.temperament}</p>
                        <p>Country: {breedData.origin}...</p>
                      </>
                    )}
                  </div>
                </div>
                <Link to="/searchDog">
                  <div className="inamoTalaga">
                    <div className="inamoBox mt-5">
                      <button className="btn btn-warning inamo">Search Other Dogs</button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dogdata;
