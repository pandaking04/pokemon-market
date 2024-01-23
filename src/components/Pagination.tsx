import React from 'react';
import '../css/Pagination.css'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='page-btn'>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} >
        {'<<'}
      </button>

      <span>{currentPage}</span>

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
