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
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dogdata() {
  
 
  
  const [selectedDogName, setSelectedDogName] = useState('');
  const [breedImages, setBreedImages] = useState([]);
  const [breedData, setBreedData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [spanName, setSpanName] = useState([]);

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
  
  const dognames = [
    ['Chuknu', 'If you wish to rehome me, click the rehome button. Dog Owner"Alberto chacknu"'],
    ['Veewise', 'If you wish to rehome me, click the rehome button. Dog Owner"Sandy balbueno"'],
    ['Kutchupoy', 'If you wish to rehome me, click the rehome button. Dog Owner"Kurt smith"'],
    ['Chucu', 'If you wish to rehome me, click the rehome button. Dog Owner"Angel locsan"'],
    ['Nitlo', 'If you wish to rehome me, click the rehome button. Dog Owner"Marian rivira"'],
    ['Kurdapyo', 'If you wish to rehome me, click the rehome button. Dog Owner"Jimmy sanson"'],
    ['Piggy', 'If you wish to rehome me, click the rehome button. Dog Owner"Vic sokko"'],
    ['Samsonike', 'If you wish to rehome me, click the rehome button. Dog Owner"Ryza mae dikson"'],
    ['Hamburgir', 'If you wish to rehome me, click the rehome button. Dog Owner"Angels burgar"'],
    ['Uvuvuevue', 'If you wish to rehome me, click the rehome button. Dog Owner"Baby ruth santos"'],
    ['Unyetennueve', 'If you wish to rehome me, click the rehome button. Dog Owner"Queen rose"'],
    ['Salamangker', 'If you wish to rehome me, click the rehome button. Dog Owner"Wishly man"'],
    ['Spasol', 'If you wish to rehome me, click the rehome button. Dog Owner"Betty Nose"'],
    ['Chukiko', 'If you wish to rehome me, click the rehome button. Dog Owner"Peter parking"'],
    ['Kiriki', 'If you wish to rehome me, click the rehome button. Dog Owner"Kalvin Clin"'],
    ['Mansura', 'If you wish to rehome me, click the rehome button. Dog Owner"Rosana rose"'],
  ];



  const randomIndexes = [];
  while (randomIndexes.length <5) {
    const randomIndex = Math.floor(Math.random() * dognames.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }
  
  const randomBreeds = randomIndexes.map(index => ({
    name: dognames[index][0],
    description: dognames[index][1]
  }));
  
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
<div className="container">
  <div className="row justify-content-center">
    <div className="col-12 text-center">
      <h2 className="touchh2 my-5">
        Dog available for{' '}
        <span style={{ color: 'rgba(252, 176, 66, 1)' }}>
          adoption with rehoming fees
        </span>
      </h2>
    </div>
  </div>
  <div className="row justify-content-center">
  {randomBreeds.slice(0, 3).map((breed, index) =>
    breedImages.length > index + 13 ? (
      <div
        className={`col-lg-4 col-md-6 col-sm-12 mb-2 text-center ${index >= 3 ? 'mb-4' : ''}`}
        key={index}
      >
        <img
          src={breedImages[index + 13]}
          alt={breed.name}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
        <h3>{breed.name}</h3>
        <p>{breed.description}</p>
        <div className="mt-auto">
          <Link
            to={`/apprehome/${breed.name}`}
            className="btn btn-warning"
            style={{ width: '90%' }}
            onClick={() => setSelectedDogName(breed.name)}
          >
            Rehome Me
          </Link>
        </div>
      </div>
    ) : null
  )}
  {breedImages.length <= 13 && (
  <div className="text-center">
    <h2> -:- No Dogs <span style={{ color: 'rgba(252, 176, 66, 1)' }}>Available -:-</span></h2>
  </div>
  )}
</div>
</div>
    
    
    </div>
  );
}

export default Dogdata;
