import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns"; // Optional: for formatting the time ago
import Top_Header from "../../components/components/Common_Components/Top_Header";

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

// ShimmerComment component (Skeleton Loader)
const ShimmerComment = () => {
  return (
    <div className="flex items-start space-x-4 mb-6 border-b pb-4 animate-pulse">
      {/* Shimmer for User Image */}
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      
      {/* Shimmer for Comment Details */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-full h-3 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

const CommentsPage = () => {
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  
  useEffect(() => {
    // Simulate loading for 1 second
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // Logic to handle comment submission
    console.log("Comment submitted:", comment);
    setComment(""); // Clear the input field
  };

  return (
    <div>
    <Top_Header title="Comments" />
    <div className="relative min-h-screen p-[20px] w-full mx-auto pb-20">
    
      <h2 className="text-[16] font-semibold mb-4">Comments</h2>
      {loading
        ? // Show shimmer effect while loading
          Array(10)
            .fill(0)
            .map((_, index) => <ShimmerComment key={index} />)
        : // Show actual comments after loading
          dummyComments.map((comment) => (
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
                  <h3 className="text-[14px] font-medium">{comment.name}</h3>
                  <span className="text-[12px] text-gray-500">
                    {formatDistanceToNow(comment.time)} ago
                  </span>
                </div>
                <p className="text-gray-400">{comment.comment}</p>
              </div>
            </div>
          ))}
      
      {/* Fixed bottom input field and button */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-md">
        <div className="flex space-x-2 flex-wrap">
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-[#125B57] text-sm text-white p-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CommentsPage;
