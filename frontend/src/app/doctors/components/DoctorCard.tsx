"use client";
import React from "react";
import "../styles/DoctorListGrid.css";

interface DoctorCardProps {
  doctor: {
    _id: string;
    name: string;
    specialty: string;
    experience: number;
    title?: string; // qualification
    facilityName?: string; // hospital/clinic name
    languages: string[];
    consultationModes: string[];
    fees: number;
    availableTimings: string[];
    photo: string;
    thumbsUpPercentage?: number;
    patientCount?: number;
    badges?: string[];
    availabilityText?: string;
    cashbackAmount?: number;
    location?: string;
    canVisit?: boolean; // new property to indicate if "Visit Doctor" button should be shown
    realTimeAvailability?: string; // new property for real-time info like "Available in 3 minutes"
  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const isFeatured = doctor.badges?.some(badge => badge.toLowerCase() === "doctor of the hour");

  // Utility function to replace "247" with "24|7"
  const replace247 = (text: string) => text.replace(/247/g, "24|7");

  return (
    <div className="doctor-card">
      <div className="doctor-left">
        <img
          src={doctor.photo || "https://via.placeholder.com/100"}
          alt={doctor.name}
          className="doctor-image"
          width={100}
          height={100}
        />
      </div>
      <div className="doctor-center">
        <div className="doctor-name">{doctor.name}</div>
        <div className="doctor-specialty">{doctor.specialty}</div>
        <div className="doctor-experience-qualification">
          {replace247(`${doctor.experience} YEARS${doctor.title ? " • " + doctor.title.toUpperCase() : ""}`)}
        </div>
        {doctor.location && (
          <div className="doctor-location">
            {replace247(doctor.location)}
          </div>
        )}
        {doctor.facilityName && (
          <div className="doctor-clinic-info">
            {replace247(doctor.facilityName.replace(/, [^,]+$/, ''))}
          </div>
        )}
        {(doctor.thumbsUpPercentage !== undefined && doctor.patientCount !== undefined) && (
          <div className="doctor-review">
            <span className="badge green-badge">
              <span role="img" aria-label="thumbs up">👍</span> {doctor.thumbsUpPercentage}% ({doctor.patientCount}+ Patients)
            </span>
          </div>
        )}
      </div>
      <div className="doctor-right">
        <div className="doctor-price-badges">
          <div className="doctor-fees">₹{doctor.fees}</div>
          {doctor.cashbackAmount !== undefined && (
            <span className="badge orange-badge">₹{doctor.cashbackAmount} Cashback</span>
          )}
          {doctor.badges && doctor.badges.map((badge, index) => {
            const isFeaturedBadge = badge.toLowerCase() === "doctor of the hour";
            return (
              <span
                key={index}
                className={`badge ${isFeaturedBadge ? "featured-badge" : "gold-badge"}`}
              >
                {replace247(badge.toUpperCase())}
              </span>
            );
          })}
        </div>
        <div className="button-group">
          <button className="consult-btn">{replace247(doctor.availabilityText || "Consult Online")}</button>
          {doctor.canVisit && (
            <button className="visit-btn">Visit Doctor</button>
          )}
        </div>
        {doctor.realTimeAvailability && (
          <div className="doctor-availability">{replace247(doctor.realTimeAvailability)}</div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
