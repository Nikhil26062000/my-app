import React from "react";

export const ApproveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
    >
      Approve
    </button>
  );
};



export const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
    >
      Delete
    </button>
  );
};

export const RejectButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
    >
      Reject
    </button>
  );
};
