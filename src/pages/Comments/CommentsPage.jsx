import React from "react";
import { formatDistanceToNow } from "date-fns"; // Optional: for formatting the time ago

// Dummy comments data
const dummyComments = [
  {
    id: 1,
    name: "John Doe",
    time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    comment: "This is a great post! Thanks for sharing.",
    image: "https://via.placeholder.com/50", // Dummy image URL
  },
  {
    id: 2,
    name: "Jane Smith",
    time: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    comment: "I completely agree with this!",
    image: "https://via.placeholder.com/50",
  },
  // Add more dummy comments as needed
  {
    id: 3,
    name: "Alice Johnson",
    time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    comment: "Interesting perspective!",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Mark Wilson",
    time: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    comment: "I have a different opinion on this matter.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Emily Davis",
    time: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
    comment: "Thank you for the insights!",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 6,
    name: "Michael Brown",
    time: new Date(Date.now() - 240 * 60 * 1000), // 4 hours ago
    comment: "Well-written article!",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 7,
    name: "Sarah Miller",
    time: new Date(Date.now() - 480 * 60 * 1000), // 8 hours ago
    comment: "This is exactly what I was looking for!",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 8,
    name: "David Lee",
    time: new Date(Date.now() - 1440 * 60 * 1000), // 1 day ago
    comment: "Great job, keep it up!",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 9,
    name: "Sophia Martinez",
    time: new Date(Date.now() - 2880 * 60 * 1000), // 2 days ago
    comment: "I have some questions about this topic.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 10,
    name: "Daniel Thomas",
    time: new Date(Date.now() - 4320 * 60 * 1000), // 3 days ago
    comment: "Can you provide more details?",
    image: "https://via.placeholder.com/50",
  },
];

const CommentsPage = () => {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {dummyComments.map((comment) => (
        <div
          key={comment.id}
          className="flex items-start space-x-4 mb-6 border-b pb-4"
        >
          {/* User Image */}
          <img
            src={comment.image}
            alt="User"
            className="w-12 h-12 rounded-full"
          />

          {/* Comment Details */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-medium">{comment.name}</h3>
              {/* Displaying "time ago" format using date-fns */}
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(comment.time)} ago
              </span>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsPage;
