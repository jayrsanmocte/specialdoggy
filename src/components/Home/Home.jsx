import React, { useEffect, useRef } from 'react';
import Testimonials from '../Testimonials/Testimonials';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();
    const getInRef = useRef(null);

    const scrollToGetIn = () => {
     navigate('/about#getin')
      getInRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    
    const scrollToGetabout = () => {
      navigate('/about')
       getInRef.current.scrollIntoView({ behavior: 'smooth' });
     };
  

  return (
    <>
    
    <div className="container mt-2"id='home'>
  <section>
    <div className="row mt-5">
      <div className="first col-md-6">
        <p className="digital">
          Digital Content For <span style={{ color: 'rgba(252,176,66,255)' }}>Dog Lover`s</span>
        </p>
        <p>
        As a dog lover, there are various digital resources available to cater to your interests and facilitate the adoption process. Additionally, these platforms often provide valuable information and resources on adopting dogs, such as adoption guides, listings of rescue organizations or shelters, and tips for a successful adoption experience. These resources can help potential dog owners gather the necessary information and support to make an informed decision about adoption and provide a loving home to a deserving dog in need.
        </p>
        <div className="py-5">
          <button className="btn btn-warning" onClick={scrollToGetIn}>
            Get In Touch
          </button>
          <button id="expandButton" className="btn btn-outline-warning ms-4" onClick={scrollToGetabout}>
            Read More
          </button>
        </div>
      </div>
      <div className="dogsPictureBox col-md-6 align-items-center">
        <img id="dogsPicture" src="Images/dogWebsite.png" alt="Dogs" srcSet="" />
      </div>
    </div>
  </section>
</div>

<div>
  <img src="/Images/school-divider.png" alt="" id="imagelogo" />
</div>

<div className="container">
  <section>
    <div className="Interesting py-3">
      <p>
        Fascinating Facts <span style={{ color: 'rgba(252,176,66,255)' }}>About Dogs</span>
      </p>
    </div>
    <div className="row">
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="target">
          <div className="interestingIconsBox pt-5">
            <img src="Images/DogIcons/big.png" className="fas hvr-icon-buzz-out interestingIcons" alt="Big" />
          </div>
        </div>
        <span className="trivia py-4">
          <label style={{ color: 'rgba(252,176,66,255)' }}>Biggest&nbsp;</label> Dogs
        </span>
        <p className="text-center">
          The English Mastiff, originating from England, is recognized as one of the largest dog breeds globally. It can
          weigh up to 200 pounds and stand at an impressive height.
        </p>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="target">
          <div className="interestingIconsBox pt-5">
            <img src="Images/DogIcons/faster.png" className="fas hvr-icon-buzz-out interestingIcons" alt="Fast" />
          </div>
        </div>
        <span className="trivia py-4">
          <span style={{ color: 'rgba(252,176,66,255)' }}>Fastest&nbsp;</span>Dogs
        </span>
        <p className="text-center">
          The Greyhound, with its sleek physique, is widely recognized as one of the fastest dog breeds globally. It can
          reach speeds of up to 45 miles per hour.
        </p>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="target">
          <div className="interestingIconsBox pt-5">
            <img src="Images/DogIcons/many.png" className="fas hvr-icon-buzz-out interestingIcons" alt="Sweet" />
          </div>
        </div>
        <span className="trivia py-4">
          <span style={{ color: 'rgba(252,176,66,255)' }}>Sweetest&nbsp;</span>Dogs
        </span>
        <p className="text-center">
          Bichon Frise: Bichon Frises are charming and affectionate companions. They love being the center of attention
          and are known for their cheerful and loving nature.
        </p>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="target">
          <div className="interestingIconsBox pt-5">
            <img src="Images/DogIcons/moral.png" className="fas hvr-icon-buzz-out interestingIcons" alt="Moral" />
          </div>
        </div>
        <span className="trivia py-4">
          <span style={{ color: 'rgba(252,176,66,255)' }}>Moral&nbsp;</span>Dogs
        </span>
        <p className="text-center">
          The Golden Retriever, known for its friendly and gentle nature, is often considered one of the most morally
          exceptional breeds, displaying loyalty and compassion.
        </p>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="target">
          <div className="interestingIconsBox pt-5">
            <img src="Images/DogIcons/small.png" className="fas hvr-icon-buzz-out interestingIcons" alt="Small" />
          </div>
        </div>
        <span className="trivia py-4">
          <span style={{ color: 'rgba(252,176,66,255)' }}>Smallest&nbsp;</span>Dogs
        </span>
        <p className="text-center">
          The Chihuahua, native to Mexico, is one of the smallest dog breeds worldwide, often weighing just a few pounds
          and standing a mere few inches tall.
        </p>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="target">
          <div className="interestingIconsBox pt-5">
            <img src="Images/DogIcons/strong.png" className="fas hvr-icon-buzz-out interestingIcons" alt="Strong" />
          </div>
        </div>
        <span className="trivia py-4">
          <span style={{ color: 'rgba(252,176,66,255)' }}>Strongest&nbsp;</span>Dogs
        </span>
        <p className="text-center">
          The American Pit Bull Terrier, known for its strength and determination, has impressive muscular power and
          endurance.
        </p>
      </div>
    </div>
  </section>
</div>


      <Testimonials />
    </>
  );
}

export default Home;
