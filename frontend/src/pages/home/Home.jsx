import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import CatCard from "../../components/catCard/CatCard";
import { FeatureCities } from "../../components/featurecities/FeatureCities";
import { FeatureCourses } from "../../components/featurecourse/FeatureCourses";
import { Terminals } from "../../components/terminals/Terminals";
import { FeatureBlog } from "../../components/featureblog/FeatureBlog";
import { Howitworks } from "../../components/howitworks/Howitworks";

export const Home = () => {
   return (
      <div className="home">
         <Featured />
         <CatCard />

         {/* category cards */}
         {/* <Slide slidesToShow={5} arrowsScroll={5}>
            {cards.map((card) => (
               <CatCard key={card.id} card={card} />
            ))}
         </Slide> */}
         {/* <div className="text-center">
            <div className="cssanimation leFlyInLeft sequence h-96 flex flex-col justify-center">
               Welcome 💕💞!! <br />
               <h1>Home page</h1>
            </div>
         </div> */}
         <FeatureCities />
         <div className="explore">
            <div className="container">
               <h1>Explore the marketplace</h1>
               <div className="items">
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                        alt=""
                     />
                     <div className="line"></div>
                     <span>Indoor</span>
                  </div>
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                        alt=""
                     />
                     <div className="line"></div>

                     <span>Market trends</span>
                  </div>
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                        alt=""
                     />
                     <div className="line"></div>
                     <span>Study & Skill</span>
                  </div>
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                        alt=""
                     />
                     <div className="line"></div>
                     <span>Video</span>
                  </div>
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                        alt=""
                     />
                     <div className="line"></div>
                     <span>Support</span>
                  </div>
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                        alt=""
                     />
                     <div className="line"></div>
                     <span>Technical</span>
                  </div>
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                        alt=""
                     />
                     <div className="line"></div>
                     <span>Business</span>
                  </div>
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                        alt=""
                     />
                     <div className="line"></div>
                     <span>Lifestyle</span>
                  </div>
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                        alt=""
                     />
                     <div className="line"></div>
                     <span>Management</span>
                  </div>
                  <div className="item">
                     <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                        alt=""
                     />
                     <div className="line"></div>
                     <span>Prototypes</span>
                  </div>
               </div>
            </div>
         </div>
         <FeatureCourses />

         <Terminals />
         <Howitworks />
         <FeatureBlog />
      </div>
   );
};
