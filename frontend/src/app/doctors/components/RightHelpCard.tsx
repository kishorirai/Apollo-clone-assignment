import React from "react";
import "../styles/RightHelpCard.css";

const RightHelpCard: React.FC = () => {
  return (
    <aside className="right-help-card">
      <img src="/consult_doctor.webp" alt="Consult Doctor" className="consult-image" />
      <p className="help-text">Need help consult the right doctor?</p>
      <a href="tel:+918040245807" className="phone-link">
        Call +91-8040245807 to book instantly
      </a>
    </aside>
  );
};

export default RightHelpCard;
