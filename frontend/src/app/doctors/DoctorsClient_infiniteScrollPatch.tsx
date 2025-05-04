"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

export default function DoctorsClient() {
  // ... existing state declarations ...

  const loadingRef = useRef(false);
  const pageRef = useRef(page);

  // Fetch doctors data for a given page
  const fetchDoctors = useCallback(
    (pageToFetch: number, append: boolean = false) => {
      setLoading(true);
      setError(null);
      loadingRef.current = true;
      axios
        .get("http://localhost:5000/api/doctors", { params: { page: pageToFetch } })
        .then((res) => {
          const doctorsWithDefaults = res.data.data.map((doc: any) => ({
            ...doc,
            languages: doc.languages || [],
            facilityName: doc.facilityName || "",
            consultationModes: doc.consultationModes || [],
            availabilityText: doc.availabilityText || "",
          }));
          setTotalPages(res.data.totalPages);
          if (append) {
            setDoctors((prevDoctors) => [...prevDoctors, ...doctorsWithDefaults]);
          } else {
            setDoctors(doctorsWithDefaults);
          }
          setLoading(false);
          loadingRef.current = false;
        })
        .catch((err) => {
          console.error("Error fetching doctors:", err);
          setError("Failed to load doctors data.");
          setLoading(false);
          loadingRef.current = false;
        });
    },
    []
  );

  // Initial and page change fetch
  useEffect(() => {
    fetchDoctors(page, false);
    pageRef.current = page;
  }, [page, fetchDoctors]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (loadingRef.current) return;
      if (pageRef.current >= totalPages) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        // Near bottom, load next page
        const nextPage = pageRef.current + 1;
        pageRef.current = nextPage;
        setPage(nextPage);
        fetchDoctors(nextPage, true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalPages, fetchDoctors]);

  // Modify Pagination onPageChange to reset doctors list
  // <Pagination page={page} totalPages={totalPages} onPageChange={(newPage) => {
  //   setPage(newPage);
  //   fetchDoctors(newPage, false);
  //   pageRef.current = newPage;
  // }} />

  // ... rest of component unchanged ...
}
