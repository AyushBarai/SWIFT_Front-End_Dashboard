import React, { useEffect, useState } from 'react';
import { fetchComments } from '../services/api';
import PopupCard from '../components/PopupCard';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import Sorting from '../components/Sorting';

const CommentsDashboard: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [filteredComments, setFilteredComments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>();
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);
  const [selectedComment, setSelectedComment] = useState<any | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Fetch comments on component mount
  useEffect(() => {
    const getComments = async () => {
      const comments = await fetchComments();
      setComments(comments);
      setFilteredComments(comments);
    };
    getComments();
  }, []);

  // Retrieve saved state from local storage on component mount
  useEffect(() => {
    const savedPageSize = localStorage.getItem('pageSize');
    if (savedPageSize) {
      setPageSize(Number(savedPageSize));
    }

    const savedCurrentPage = localStorage.getItem('currentPage');
    if (savedCurrentPage) {
      setCurrentPage(Number(savedCurrentPage) || 1);
    } else {
      setCurrentPage(1);
    }

    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }

    const savedSortConfig = localStorage.getItem('sortConfig');
    if (savedSortConfig) {
      setSortConfig(JSON.parse(savedSortConfig));
    }
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    console.log('Saving pageSize to localStorage:', pageSize);
    localStorage.setItem('pageSize', pageSize.toString());
  }, [pageSize]);

  useEffect(() => {
    if (currentPage !== undefined) {
      console.log('Saving currentPage to localStorage:', currentPage);
      localStorage.setItem('currentPage', currentPage.toString());
    }
  }, [currentPage]);

  useEffect(() => {
    console.log('Saving searchTerm to localStorage:', searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (sortConfig) {
      console.log('Saving sortConfig to localStorage:', sortConfig);
      localStorage.setItem('sortConfig', JSON.stringify(sortConfig));
    }
  }, [sortConfig]);

  // Filter and sort comments whenever dependencies change
  useEffect(() => {
    let filtered = comments;
    if (searchTerm) {
      filtered = comments.filter(comment =>
        comment.name.includes(searchTerm) || comment.email.includes(searchTerm) || comment.body.includes(searchTerm)
      );
    }
    if (sortConfig && sortConfig.direction !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setFilteredComments(filtered);
  }, [comments, searchTerm, sortConfig]);

  const handlePageChange = (page: number) => {
    console.log('Page changed:', page);
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    console.log('Page size changed:', size);
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSearchChange = (term: string) => {
    console.log('Search term changed:', term);
    setSearchTerm(term);
  };

  const handleSortChange = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'none';
    }
    console.log('Sort changed:', { key, direction });
    setSortConfig({ key, direction });
  };

  const handleRowClick = (comment: any) => {
    setSelectedComment(comment);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedComment(null);
  };

  const paginatedComments = filteredComments.slice((currentPage! - 1) * pageSize, currentPage! * pageSize);

  return (
    <div className="p-8 m-8 rounded-lg bg-white shadow-lg px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className='flex justify-between'>
        <div className="text-2xl font-bold text-left justify-center">Comments Dashboard</div>
        <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>
      <Sorting sortConfig={sortConfig} onSortChange={handleSortChange} />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border border-gray-200">
          <thead className="bg-slate-400">
            <tr>
              <th className="py-2 px-4 border-b">Post ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Comments</th>
            </tr>
          </thead>
          <tbody>
            {paginatedComments.map(comment => (
              <tr key={comment.id} className="hover:bg-slate-200 cursor-pointer" onClick={() => handleRowClick(comment)}>
                <td className="py-2 px-4 border-b">{comment.postId}</td>
                <td className="py-2 px-4 border-b">{comment.name}</td>
                <td className="py-2 px-4 border-b">{comment.email}</td>
                <td className="py-2 px-4 border-b">{comment.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={filteredComments.length}
        pageSize={pageSize}
        currentPage={currentPage!}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      {isPopupVisible && selectedComment && (
        <PopupCard comment={selectedComment} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default CommentsDashboard;
