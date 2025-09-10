import React from 'react';

const NewsSection = () => {
  return (
    <section className="news-section py-5 text-white position-relative">
        <img
            src="/images/CWearth.png"
            alt=""
            className="CWearth"
        />

        <img
            src="/images/CWmoon.png"
            alt=""
            className="CWmoon"
        />

      <div className="container">
        <h2 className="section-news mb-4">
          Latest <span>News</span>
        </h2>

        <div className="row g-4">
          {/* Linkerkolom */}
          <div className="col-12 col-lg-8">
            <div className="news-card position-relative overflow-hidden">
              <img src="/images/News1.png" alt="Nieuws" className="img-fluid w-100" />
              <div className="news-text-overlay">
                <p className="mb-0 fw-bold">
                  Grote kolom – Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>

          {/* Rechterkolom met 2 onder elkaar */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-4">
            <div className="news-card position-relative overflow-hidden">
              <img src="/images/News1.png" alt="Nieuws" className="img-fluid w-100" />
              <div className="news-text-overlay">
                <p className="mb-0 fw-bold">Nieuwsbericht 1</p>
              </div>
            </div>
            <div className="news-card position-relative overflow-hidden">
              <img src="/images/News1.png" alt="Nieuws" className="img-fluid w-100" />
              <div className="news-text-overlay">
                <p className="mb-0 fw-bold">Nieuwsbericht 2</p>
              </div>
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

export default NewsSection;
