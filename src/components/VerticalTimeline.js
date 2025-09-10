import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import timelineData from "./TimeLineData";

const VerticalTimeline = () => {
  const [expandedItems, setExpandedItems] = useState(
    Array(timelineData.length).fill(false) // standaard: alles ingeklapt
  );

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
  }, []);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index]; // toggle alleen de aangeklikte
      return newState;
    });
  };

  return (
    <section class="bg-timeline">
      <img src="/images/CWrobot.png" alt="" className="CWrobot"/>
      <div className="container intro-history">
        <div className="row">
          <div className="col-md-12">
            <div className="vtl-title intro-history my-5" data-aos="fade-up">
              <h2>The <span>History</span> of <span>EU VS</span></h2>
              <p>
                A comprehensive overview of the growth and evolution of our community
                throughout the years. This timeline highlights the milestones, challenges,
                and achievements that have shaped the European PB scene. Scroll down and
                explore the journey to discover the most important moments that defined
                our history.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="pipePlant">
        <img src="/images/pipe.png" alt="" className="pipe"/>
        <img src="/images/piranhaPlant.png" alt="" className="piranhaPlant"/>
      </div>
      {/* <div class="hill">
        <img src="/images/small_hill.png" alt="" className="smallHill"/>
      </div> */}
      <div className="container vtl-timeline">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`vtl-entry ${index % 2 === 0 ? "vtl-left" : "vtl-right"}`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-offset="500" // start pas als 250px zichtbaar is
          >
            <div className="vtl-timeline-date">
              <h2>{item.date}</h2>
            </div>
            <div className="vtl-content">
               {item.image_pxArt && <img src={item.image_pxArt} alt="img" className="vtl-image_pxArt"/>}
              <h3>{item.title}</h3>
              <p>
                {expandedItems[index]
                  ? item.text
                  : item.text.substring(0, 500) + "..."}
              </p>
              <button
                className="vtl-readmore"
                onClick={() => toggleExpand(index)}
              >
                {expandedItems[index] ? "Read less" : "Read more"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="summary-vtl" data-aos="fade-up">
              <p>
                A comprehensive overview of the growth and evolution of our community
                throughout the years. This timeline highlights the milestones, challenges,
                and achievements that have shaped the European PB scene. Scroll down and
                explore the journey to discover the most important moments that defined
                our history.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="svg-wrapper">
        <img src="/images/underGround1.png" alt="" />
      </div>
    </section>
  );
};

export default VerticalTimeline;
