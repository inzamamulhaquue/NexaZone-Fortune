import React from "react";
import "../styles/Fact.css"; // Assuming you have a CSS file for styling
import burj1 from "../images/burj1.jpg"; // Importing an image for the background

const FactsSection = () => {
  return (
    <section
      className="facts-section"
      style={{ backgroundImage: `url(${burj1})` }}
    >
      <div className="facts-container">
        {/* Left Side */}
        <div className="facts-left">
          <h2>Facts Frenzy:</h2>
          <p>Intriguing Facts That Will Amaze You!</p>
        </div>

        {/* Right Side */}
        <div className="facts-right">
          <div className="fact-box">
            <p>
              There are no limitations on what you can pursue as an entrepreneur.
              <span className="red">Dubai</span> always welcomes people with business ideas. It provides
              several opportunities with endless benefits.
            </p>
          </div>
          <div className="fact-box">
            <p>
              <span className="red">Dubai</span> consists of 7 Emirates, each having its own jurisdiction.
              These jurisdictions offer benefits and vital information for your
              company formation in <span className="red">Dubai</span>.
            </p>
          </div>
          <div className="fact-box">
            <p>
              Be aware of the various incentives that <span className="red">Dubai</span> <span className="red">Mainland</span> and
              <span className="red">Freezone</span> offer for license holders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FactsSection;
