"use client";

import "../styles/Pagination.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        className="pagination-btn"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`page-number ${page === i + 1 ? "active" : ""}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
}
