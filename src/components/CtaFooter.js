import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CtaFooter = () => {
  const [userCode, setUserCode] = useState("");
  const navigate = useNavigate();

  return (
    <section className="search-other py-5">
      <div className="container text-center">
        <h3 className="cta-footer-title mb-3">Search another player</h3>
        <p className="mb-4 text-muted">
          Curious about how your friends or rivals are doing?
          Enter their 9-character Maker ID below to see their live stats.
        </p>

        <div
          className="d-flex justify-content-center gap-2 mb-4"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter 9-char ID..."
            maxLength={9}
            value={userCode}
            onChange={(e) => setUserCode(e.target.value.toUpperCase())}
          />
          <button
            className="btn btn-primary"
            disabled={userCode.length !== 9}
            onClick={() => navigate(`/user/${userCode}`)}
          >
            Search
          </button>
        </div>

        <div className="cta-footer-img">
          <img src={process.env.PUBLIC_URL + "/images/data/mltt_vs.png"} alt="mltt" />
        </div>
      </div>
      <div className="colorPipes">
        <div className="colorPipesLeft">
          <img src={process.env.PUBLIC_URL + "/images/colorPipesLeft.png"} alt="color pipes" />
        </div>
        <div className="colorPipesRight">
          <img src={process.env.PUBLIC_URL + "/images/colorPipesRight.png"} alt="color pipes" />
        </div>
      </div>
    </section>
  );
};

export default CtaFooter;
