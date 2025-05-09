"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import MergedFilter from "./components/MergedFilter";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import DoctorCard from "./components/DoctorCard";
import RightHelpCard from "./components/RightHelpCard";
import GeneralMedicineInfo from "./components/GeneralMedicineInfo";
import "./styles/DoctorsClient.css";
import "./styles/FilterBar.css";

interface Doctor {
  _id: string;
  name: string;
  title?: string;
  specialty: string;
  experience: number;
  fees: number;
  photo: string;
  patients: number;
  rating: number;
  availableTimings: string[];
  gender: string;
  languages: string[];
  facilityName: string;
  consultationModes: string[];
  availabilityText?: string;
  badges?: string[];
  canVisit?: boolean;
}

const sortingOptions = [
  "Relevance",
  "Availability",
  "Nearby",
  "Price - Low to High",
  "Price - High to Low",
  "Years of Experience",
  "Most Liked",
];

export default function DoctorsClient() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    nearMe: false,
    modeOfConsult: "",
    experience: {
      "0-5": false,
      "6-10": false,
      "11-16": false,
      "16+": false,
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
    },
    facility: {
      "Apollo Hospital": false,
      "Other Clinics": false,
    },
  });

  const [selectedSort, setSelectedSort] = useState("Relevance");

  useEffect(() => {
    fetchDoctors(page, false);
  }, [page]);

  const fetchDoctors = useCallback(
    (pageToFetch: number, append: boolean = false) => {
      setLoading(true);
      setError(null);
      axios
        .get("axios.get("/api/doctors")", { params: { page: pageToFetch } })
        .then((res) => {
          const doctorsWithDefaults = res.data.data.map((doc: any) => {
            const consultationModes = doc.consultationModes || [];
            return {
              ...doc,
              languages: doc.languages || [],
              facilityName: doc.facilityName || "",
              consultationModes: consultationModes,
              availabilityText: doc.availabilityText || "",
              badges: doc.badges || [],
              canVisit: consultationModes.includes("Hospital Visit"),
            };
          });
          setTotalPages(res.data.totalPages);
          if (append) {
            setDoctors((prevDoctors) => [...prevDoctors, ...doctorsWithDefaults]);
          } else {
            setDoctors(doctorsWithDefaults);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching doctors:", err);
          setError("Failed to load doctors data.");
          setLoading(false);
        });
    },
    []
  );

  const doctorMatchesFilters = (doctor: Doctor) => {
    if (filters.nearMe) {
      // Placeholder for nearMe filter logic
    }

    const modeMap: Record<string, string> = {
      "Hospital Visit": "Hospital Visit",
      "Online Consult": "Online",
    };
    if (filters.modeOfConsult) {
      const modeValue = modeMap[filters.modeOfConsult];
      const hasMode = modeValue && doctor.consultationModes.includes(modeValue);
      if (!hasMode) {
        return false;
      }
    }

    const experienceRanges = Object.entries(filters.experience)
      .filter(([_, checked]) => checked)
      .map(([range]) => range);
    if (experienceRanges.length > 0) {
      let match = false;
      for (const range of experienceRanges) {
        if (range === "0-5" && doctor.experience >= 0 && doctor.experience <= 5) match = true;
        else if (range === "6-10" && doctor.experience >= 6 && doctor.experience <= 10) match = true;
        else if (range === "11-16" && doctor.experience >= 11 && doctor.experience <= 16) match = true;
        else if (range === "16+" && doctor.experience >= 16) match = true;
      }
      if (!match) return false;
    }

    const feesRanges = Object.entries(filters.fees)
      .filter(([_, checked]) => checked)
      .map(([range]) => range);
    if (feesRanges.length > 0) {
      let match = false;
      for (const range of feesRanges) {
        if (range === "100-500" && doctor.fees >= 100 && doctor.fees <= 500) match = true;
        else if (range === "500-1000" && doctor.fees > 500 && doctor.fees <= 1000) match = true;
        else if (range === "1000+" && doctor.fees > 1000) match = true;
      }
      if (!match) return false;
    }

    const languagesSelected = Object.entries(filters.language)
      .filter(([_, checked]) => checked)
      .map(([lang]) => lang);
    if (languagesSelected.length > 0) {
      const hasLanguage = languagesSelected.some((lang) => doctor.languages.includes(lang));
      if (!hasLanguage) return false;
    }

    const facilitiesSelected = Object.entries(filters.facility)
      .filter(([_, checked]) => checked)
      .map(([facility]) => facility.toLowerCase());
    if (facilitiesSelected.length > 0) {
      const doctorFacilityLower = doctor.facilityName.toLowerCase();
      const matchesFacility = facilitiesSelected.some(facility => doctorFacilityLower.includes(facility));
      if (!matchesFacility) return false;
    }

    return true;
  };

  const filteredDoctors = doctors.filter(doctorMatchesFilters);

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (selectedSort) {
      case "Price - Low to High":
        return a.fees - b.fees;
      case "Price - High to Low":
        return b.fees - a.fees;
      case "Years of Experience":
        return b.experience - a.experience;
      case "Most Liked":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return <p style={{ padding: "1rem", textAlign: "center" }}>Loading doctors...</p>;
  }

  if (error) {
    return <p style={{ padding: "1rem", textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <div className="apollo-clone">
      <Header />
      <div className="scrollable-content">
        <div className="content-wrapper">
          <div className="doctor-list-container">
            <div className="sidebar" style={{ order: 1 }}>
              <MergedFilter onFilterChange={(newFilters) => setFilters(newFilters)} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", order: 2, marginLeft: "0" }}>
              <div className="section-header-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="section-header">
                  <nav className="breadcrumb" aria-label="Breadcrumb">
                    <ul className="breadcrumb-list">
                      <li className="breadcrumb-item">
                        <a href="#" className="breadcrumb-link">Home</a>
                        <span className="breadcrumb-separator">{'>'}</span>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="#" className="breadcrumb-link">Doctors</a>
                        <span className="breadcrumb-separator">{'>'}</span>
                      </li>
                      <li className="breadcrumb-item current" aria-current="page">
                        General Physicians
                      </li>
                    </ul>
                  </nav>
                  <h2 className="section-title">
                    Consult General Physician Online - Internal Medicine Specialists
                  </h2>
                  <p className="doctor-count">({sortedDoctors.length} doctors)</p>
                </div>
                <select
                  className="sorting-dropdown"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  aria-label="Select sorting option"
                >
                  {sortingOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="doctor-list-grid">
                {sortedDoctors.length > 0 ? (
                  sortedDoctors.map((doctor) => <DoctorCard doctor={doctor} key={doctor._id} />)
                ) : (
                  <p style={{ padding: "1rem" }}>No doctors found matching the selected filters.</p>
                )}
              </div>
            </div>
            <div className="right-help-card">
              <RightHelpCard />
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
            fetchDoctors(newPage, false);
          }}
        />
      </div>
      <GeneralMedicineInfo />
      <Footer />
    </div>
  );
}
