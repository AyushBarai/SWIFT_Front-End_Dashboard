import React from 'react';

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageSizes = [10, 50, 100];

  // Calculate the range of items displayed
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Determine the pages to show
  const getPagesToShow = () => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2];
    }

    if (currentPage === totalPages) {
      return [totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const pagesToShow = getPagesToShow();

  return (
    <div className="flex justify-between items-center mt-10">
      <div className="text-gray-700">
        {startItem}-{endItem} of {totalItems} items
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded shadow-md bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex space-x-1">
          {pagesToShow.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-2 py-1 border rounded shadow-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 border rounded shadow-md bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="ml-4">
        <select
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          value={pageSize}
          className="px-3 py-2 border rounded shadow-md bg-white hover:bg-gray-100"
        >
          {pageSizes.map(size => (
            <option key={size} value={size}>
              Pages {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
