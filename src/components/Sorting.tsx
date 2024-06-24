import React from 'react';

interface SortingProps {
  sortConfig: { key: string, direction: string } | null;
  onSortChange: (key: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ sortConfig, onSortChange }) => {
  return (
    <div className="flex justify-left items-center mb-4">
      <button onClick={() => onSortChange('postId')} className="flex items-center mx-2 p-2 m-2 border border-gray-100 rounded-lg bg-white shadow-lg">
        Sort Post ID
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
          <path strokeLinecap="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </button>

      <button onClick={() => onSortChange('name')} className="flex items-center mx-2 p-2 m-2 border border-gray-100 rounded-lg bg-white shadow-lg">
        Sort Name
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
          <path strokeLinecap="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </button>

      <button onClick={() => onSortChange('email')} className="flex items-center mx-2 p-2 m-2 border border-gray-100 rounded-lg bg-white shadow-lg">
        Sort Email
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
          <path strokeLinecap="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </button>

    </div>
  );
};

export default Sorting;
