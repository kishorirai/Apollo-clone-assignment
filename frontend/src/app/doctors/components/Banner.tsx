import React from "react";
import "../styles/Banner.css";

interface BannerProps {
  doctorCount?: number;
}

const Banner: React.FC<BannerProps> = ({ doctorCount = 761 }) => {
  return (
    <section className="banner">
      <div className="breadcrumbs">Home {'>'} Doctors {'>'} General Physicians</div>
      <div className="banner-content">
        <h1>Consult General Physicians Online – Internal Medicine Specialists</h1>
        <div className="doctor-count">{doctorCount} doctors</div>
      </div>
    </section>
  );
};

export default Banner;
