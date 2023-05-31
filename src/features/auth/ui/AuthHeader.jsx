import React from "react";

const AuthHeader = ({ bgimg, head, sub }) => {
  return (
    <div className="col-lg-7 shadow-lg">
      <div className="hero-wrap d-flex align-items-center rounded-3 rounded-end-0 h-100">
        <div className="hero-mask opacity-9 bg-primary"></div>
        <div
          className="hero-bg hero-bg-scroll"
          style={{
            "background-image": `url("${bgimg}")`,
          }}
        ></div>
        <div className="hero-content mx-auto w-100 h-100 d-flex flex-column">
          <div className="row g-0">
            <div className="col-11 col-lg-10 mx-auto">
              <div className="logo mt-5 mb-5 mb-lg-0">
                <h1 className="text-11 text-white mb-3">Nova</h1>
              </div>
            </div>
          </div>
          <div className="row g-0 my-auto">
            <div className="col-11 col-lg-10 mx-auto">
              <h2 className="text-11 text-white mb-3">{head}</h2>
              <p className="text-5 text-white lh-base mb-4">{sub}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
