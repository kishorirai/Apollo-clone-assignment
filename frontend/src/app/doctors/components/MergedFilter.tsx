"use client";

import React, { useState, useEffect } from "react";
import "../styles/FilterBar.css";

interface MergedFilterProps {
  onFilterChange?: (filters: any) => void;
}

const MergedFilter: React.FC<MergedFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    nearMe: false,
    modeOfConsult: "", // string for radio button mode
    experience: {
      "0-5": false,
      "6-10": false,
      "11-16": false,
      "16+": false,
      "17-20": false, // additional experience option
    },
    fees: {
      "100-500": false,
      "500-1000": false,
      "1000+": false,
    },
    language: {
      English: false,
      Hindi: false,
      Telugu: false,
      Spanish: false, // additional language options
      French: false,
      German: false,
      Chinese: false,
      Japanese: false,
      Arabic: false,
      Russian: false,
      Portuguese: false,
      Italian: false,
      Korean: false,
      Dutch: false,
      Swedish: false,
    },
    facility: {
      "Apollo Hospital": false,
      "Other Clinics": false,
    },
  });

  const [showMoreExperience, setShowMoreExperience] = useState(false);
  const [showMoreLanguage, setShowMoreLanguage] = useState(false);

  // Notify parent of filter changes after filters state updates
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  // Handle checkbox toggle for nested filters
  const toggleNestedCheckbox = (category: keyof typeof filters, key: string) => {
    setFilters((prev) => {
      const updatedCategory = { ...(prev[category] as any), [key]: !(prev[category] as any)[key] };
      return { ...prev, [category]: updatedCategory };
    });
  };

  // Handle radio button change for modeOfConsult
  const handleModeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, modeOfConsult: value }));
  };

  // Handle nearMe toggle
  const toggleNearMe = () => {
    setFilters((prev) => ({ ...prev, nearMe: !prev.nearMe }));
  };

  // Handle Clear All button click
  const clearAllFilters = () => {
    setFilters({
      nearMe: false,
      modeOfConsult: "",
      experience: {
        "0-5": false,
        "6-10": false,
        "11-16": false,
        "16+": false,
        "17-20": false,
      },
      fees: {
        "100-500": false,
        "500-1000": false,
        "1000+": false,
      },
      language: {
        English: false,
        Hindi: false,
        Telugu: false,
        Spanish: false,
        French: false,
        German: false,
        Chinese: false,
        Japanese: false,
        Arabic: false,
        Russian: false,
        Portuguese: false,
        Italian: false,
        Korean: false,
        Dutch: false,
        Swedish: false,
      },
      facility: {
        "Apollo Hospital": false,
        "Other Clinics": false,
      },
    });
  };

  return (
    <aside className="filter-bar">
      <div className="filter-header">
        <h2 className="filter-title">Filters</h2>
        <button className="clear-all-btn" onClick={clearAllFilters}>
          Clear All
        </button>
      </div>

      <button
        className="near-me-btn"
        onClick={toggleNearMe}
        style={{ marginBottom: "16px", padding: "8px 12px", width: "100%", cursor: "pointer" }}
      >
        {filters.nearMe ? "Showing Doctors Near Me" : "Show Doctors Near Me"}
      </button>

      {/* Mode of Consult - Radio Buttons */}
      <div className="filter-group">
        <h3>Mode of Consult</h3>
        <label>
          <input
            type="radio"
            name="modeOfConsult"
            value="Hospital Visit"
            checked={filters.modeOfConsult === "Hospital Visit"}
            onChange={() => handleModeChange("Hospital Visit")}
          />
          Hospital Visit
        </label>
        <label>
          <input
            type="radio"
            name="modeOfConsult"
            value="Online Consult"
            checked={filters.modeOfConsult === "Online Consult"}
            onChange={() => handleModeChange("Online Consult")}
          />
          Online Consult
        </label>
      </div>

      {/* Experience (In Years) - Checkboxes */}
      <div className="filter-group">
        <h3>Experience (In Years)</h3>
        {(Object.keys(filters.experience) as (keyof typeof filters.experience)[]).slice(0, showMoreExperience ? undefined : 4).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              value={key}
              checked={filters.experience[key]}
              onChange={() => toggleNestedCheckbox("experience", key)}
            />
            {key}
          </label>
        ))}
        <button
          className="more-button"
          type="button"
          onClick={() => setShowMoreExperience(!showMoreExperience)}
        >
          {showMoreExperience ? "Show Less" : "+1 More"}
        </button>
      </div>

      {/* Fees (In Rupees) - Checkboxes */}
      <div className="filter-group">
        <h3>Fees (In Rupees)</h3>
        {(Object.keys(filters.fees) as (keyof typeof filters.fees)[]).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              value={key}
              checked={filters.fees[key]}
              onChange={() => toggleNestedCheckbox("fees", key)}
            />
            {key}
          </label>
        ))}
      </div>

      {/* Language - Checkboxes */}
      <div className="filter-group">
        <h3>Language</h3>
        {(Object.keys(filters.language) as (keyof typeof filters.language)[]).slice(0, showMoreLanguage ? undefined : 3).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              value={key}
              checked={filters.language[key]}
              onChange={() => toggleNestedCheckbox("language", key)}
            />
            {key}
          </label>
        ))}
        <button
          className="more-button"
          type="button"
          onClick={() => setShowMoreLanguage(!showMoreLanguage)}
        >
          {showMoreLanguage ? "Show Less" : "+10 More"}
        </button>
      </div>

      {/* Facility - Checkboxes */}
      <div className="filter-group">
        <h3>Facility</h3>
        {(Object.keys(filters.facility) as (keyof typeof filters.facility)[]).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              value={key}
              checked={filters.facility[key]}
              onChange={() => toggleNestedCheckbox("facility", key)}
            />
            {key}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default MergedFilter;
