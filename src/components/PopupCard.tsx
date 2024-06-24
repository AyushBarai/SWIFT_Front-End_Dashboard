// src/components/PopupCard.tsx

import React from 'react';

interface PopupCardProps {
    comment: {
        postId: number;
        name: string;
        email: string;
        body: string;
        // Add more fields if needed
    };
    onClose: () => void;
}

const PopupCard: React.FC<PopupCardProps> = ({ comment, onClose }) => (
    <div className="fixed inset-0 bg-slate-500 bg-opacity-80 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/2">
            {/* 
      Adjusted width classes:
      - w-full for small screens (full width)
      - sm:w-1/2 for larger screens (half width)
      */}
            <div className="flex justify-end items-end" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
            <h2 className="text-2xl mb-4">Comment Details</h2>
            <p><strong>Post ID:</strong> {comment.postId}</p>
            <p><strong>Name:</strong> {comment.name}</p>
            <p><strong>Email:</strong> {comment.email}</p>
            <p><strong>Comments:</strong> {comment.body}</p>
        </div>
    </div>
);

export default PopupCard;
