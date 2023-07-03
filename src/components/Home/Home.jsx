import React, { useEffect, useRef } from 'react';
import Testimonials from '../Testimonials/Testimonials';
import { useNavigate } from 'react-router-dom';
// import ChessGame from '../../ChessGame';
// import PokerGame from '../../PokerGame';




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
  
     const combinedData = [
      { text: "Biggest Dogs", description: "The English Mastiff, originating from England, is recognized as one of the largest dog breeds globally. It can weigh up to 200 pounds and stand at an impressive height.", icon: "big" },
      { text: "Fastest Dogs", description: "The Greyhound, with its sleek physique, is widely recognized as one of the fastest dog breeds globally. It can reach speeds of up to 45 miles per hour.", icon: "faster" },
      { text: "Sweetest Dogs", description: "Bichon Frise: Bichon Frises are charming and affectionate companions. They love being the center of attention and are known for their cheerful and loving nature." , icon: "many" },
      { text: "Moral Dogs", description: "The Golden Retriever, known for its friendly and gentle nature, is often considered one of the most morally exceptional breeds, displaying loyalty and compassion.", icon: "moral" },
      { text: "Smallest Dogs", description: "The Chihuahua, native to Mexico, is one of the smallest dog breeds worldwide, often weighing just a few pounds and standing a mere few inches tall.", icon: "small" },
      { text: "Strongest Dogs", description: "The American Pit Bull Terrier, known for its strength and determination, has impressive muscular power and endurance.", icon: "strong" },
      { text: "Smartest Dogs", description: "The Border Collie is widely regarded as one of the smartest dog breeds. They excel in various canine activities and are highly trainable.",icon: "smartest" },
      { text: "Oldest Dogs", description: "The Basenji, originating from Central Africa, is known as one of the oldest dog breeds. They have a rich history and were prized for their hunting abilities.", icon: "oldest" },
      { text: "Most Popular Dogs", description: "The Labrador Retriever consistently ranks as one of the most popular dog breeds worldwide. They are known for their friendly and outgoing nature, making them excellent family pets.", icon: "popular" },
      { text: "Energetic Dogs", description: "The Australian Shepherd is a highly energetic and agile dog breed. They thrive in active households and require plenty of exercise and mental stimulation.",icon: "energy" },
      { text: "Gentle Dogs", description: "The Cavalier King Charles Spaniel is known for its gentle and affectionate nature. They make excellent companions and are often described as 'love sponges' due to their affectionate tendencies.",icon: "gentle" },
      { text: "Playful Dogs", description: "The Boxer is a playful and energetic dog breed. They are known for their clown-like behavior and love to engage in interactive play with their owners." ,icon: "playful" },
      { text: "Protective Dogs", description: "The German Shepherd is widely recognized as a protective and loyal breed. They are often used as working dogs in various roles, including law enforcement and search and rescue.",icon: "protect" },
      { text: "Loyal Dogs", description: "The Akita, originating from Japan, is known for its loyalty and devotion to its family. They are protective and make excellent guard dogs.", icon: "loyal" },
      { text: "Adorable Dogs", description: "The Pomeranian, with its fluffy coat and fox-like appearance, is often regarded as one of the most adorable dog breeds. They are small in size but big in personality." ,icon: "adorable" },
      { text: "Unique Dogs", description: "The Xoloitzcuintli, also known as the Mexican Hairless Dog, is a unique breed known for its hairless appearance. They are loyal and make great companions." ,icon: "unique" },
      { text: "Independent Dogs", description: "The Shiba Inu, native to Japan, is known for its independent and somewhat stubborn nature. They require consistent training and socialization from an early age." ,icon: "inde" },
      { text: "Friendly Dogs", description: "The Beagle is a friendly and sociable breed, known for its cheerful and outgoing personality. They get along well with children and other pets.", icon: "friend" },
      { text: "Hypoallergenic Dogs", description: "The Poodle is a popular hypoallergenic dog breed, prized for its curly, low-shedding coat. They are often recommended for individuals with allergies." ,icon: "hypo" },
      { text: "Quiet Dogs", description: "The Basenji, mentioned earlier as one of the oldest dog breeds, is also known for its unique vocalization. They produce yodel-like sounds instead of barking.", icon: "quiet" },
    ];
  
    const randomData = combinedData.sort(() => 0.5 - Math.random()).slice(0, 6);
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
        <div className="pb-5">
        
          <button className="btn btn-warning me-4 homeBtnGet" onClick={scrollToGetIn}>
            Get In Touch
          </button>
         
          <button id="expandButton" className="btn btn-outline-warning homeBtnRead" onClick={scrollToGetabout}>
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
          {randomData.map((data, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <div className="target">
                <div className="interestingIconsBox pt-5">
                  <img src={`Images/DogIcons/${data.icon}.png`} className="fas hvr-icon-buzz-out interestingIcons" alt={data.text} />
                </div>
              </div>
              <span className="trivia py-4">
                <label style={{ color: 'rgba(252,176,66,255)' }}>{data.text}</label>
              </span>
              <p className="text-center">{data.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    {/* <ChessGame /> */}
    {/* <PokerGame /> */}
      <Testimonials />
    </>
  );
}

export default Home;
