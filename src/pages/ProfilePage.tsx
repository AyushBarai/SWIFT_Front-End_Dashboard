// src/components/ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';
import LoadingGif from '../assets/Loading.gif';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      const users = await fetchUsers();
      setUser(users[0]);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <img src={LoadingGif} alt="Loading..." className="h-20 w-20" />
      </div>
    );
  }

  if (!user) {
    return <div>Error: Failed to fetch user data.</div>;
  }

  return (
    <div className="p-8 m-8 px-4 sm:px-8 md:px-24 lg:px-32 xl:px-32">
      <div className="flex items-center justify-center sm:justify-start mb-4">
        <a href="/dashboard" className="flex items-center text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span>Back to Dashboard</span>
        </a>
      </div>
      <h1 className="text-2xl font-bold mb-2 text-center sm:text-left">Welcome, {user.name}</h1>
      <div className="p-4 sm:p-6 rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-center sm:justify-start mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-24 h-24 cursor-pointer mb-4 sm:mb-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <div className="text-center sm:text-left">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">User ID</p>
            <div className="p-2 bg-slate-200 rounded text-base text-gray-800">
              {user.id}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <div className="p-2 bg-slate-200 rounded text-base text-gray-800">
              {user.name}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email ID</p>
            <div className="p-2 bg-slate-200 rounded text-base text-gray-800">
              {user.email}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <div className="p-2 bg-slate-200 rounded text-base text-gray-800">
              {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <div className="p-2 bg-slate-200 rounded text-base text-gray-800">
              {user.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
