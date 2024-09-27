// import React, { useState, useEffect } from "react";
// import { formatDistanceToNow } from "date-fns"; // Optional: for formatting the time ago
// import Top_Header from "../../components/components/Common_Components/Top_Header";
// import { SendComments, fetchCommentsData } from "../../services/ApiServices";





// const CommentsPage = () => {
  
//   const [comment, setComment] = useState("");
//   const [total_fetched_comments,set_Total_Fetched_comments] = useState()
//   const fetchComments = async() =>{
//     const res = await fetchCommentsData();
//     console.log(res)
//     set_Total_Fetched_comments(res)
//   }
//   useEffect(() => {

   

    

//     fetchComments();
   
//   }, []);

//   const handleCommentChange = (e) => {
//     setComment(e.target.value);
//   };

//   const handleCommentSubmit = async() => {
//     // Logic to handle comment submission
//     console.log("Comment submitted:", comment);
//     setComment(""); // Clear the input field
//     const res = await SendComments(comment)
//     console.log(res)
//     fetchComments();


//   };

//   return (
//     <div>
//     <Top_Header title="Comments" />
//     <div className="relative min-h-screen p-[20px] w-full mx-auto pb-20">
    
//       <h2 className="text-[16] font-semibold mb-4">Comments</h2>
// {
//         total_fetched_comments?.map((comment) => (
//             <div
//               key={comment.id}
//               className="flex items-start space-x-4 mb-6 border-b pb-4"
//             >
//               {/* User Image */}
//               <img
//                 src="https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
//                 alt="User"
//                 className="w-12 h-12 rounded-full"
//               />

//               {/* Comment Details */}
//               <div className="flex-1">
//                 <div className="flex justify-between items-center mb-1">
//                   <h3 className="text-[14px] font-medium">{comment.username}</h3>
//                   <span className="text-[12px] text-gray-500">
                 
//                   </span>
//                 </div>
//                 <p className="text-gray-400">{comment.comments}</p>
//               </div>
//             </div>
//           ))}
      
//       {/* Fixed bottom input field and button */}
//       <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-md">
//         <div className="flex space-x-2 flex-wrap">
//           <input
//             type="text"
//             value={comment}
//             onChange={handleCommentChange}
//             placeholder="Add a comment..."
//             className="flex-1 p-2 border rounded"
//           />
//           <button
//             onClick={handleCommentSubmit}
//             className="bg-[#125B57] text-sm text-white p-2 rounded"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CommentsPage;



import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns"; // Optional: for formatting the time ago
import Top_Header from "../../components/components/Common_Components/Top_Header";
import { SendComments, fetchCommentsData } from "../../services/ApiServices";

const CommentsPage = () => {
  const [comment, setComment] = useState("");
  const [total_fetched_comments, set_Total_Fetched_comments] = useState([]);
  const bottomRef = useRef(null); // Reference for scrolling to the bottom

  const fetchComments = async () => {
    const res = await fetchCommentsData();
    console.log(res);
    
    set_Total_Fetched_comments(res);
   


  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the comments container when comments change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [total_fetched_comments]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    console.log("Comment submitted:", comment);
    const res = await SendComments(comment);
    console.log(res);
    setComment(""); // Clear the input field
    await fetchComments(); // Fetch comments again to update the list

    // Scroll to the bottom of the comments container
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Top_Header title="Comments" />
      <div className="relative  p-[20px] w-full mx-auto pb-10 ">
       
        <div className="comment-container">
          {total_fetched_comments?.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start space-x-4 mb-6 border-b pb-4"
            >
              {/* User Image */}
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="User"
                className="w-12 h-12 rounded-full"
              />

              {/* Comment Details */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-[14px] font-medium">{comment.username}</h3>
                  <span className="text-[12px] text-gray-500">
                    {/* Optional: Format the comment time */}
                    {/* {formatDistanceToNow(new Date(comment.time))} ago */}
                  </span>
                </div>
                <p className="text-gray-400">{comment.comments}</p>
              </div>
            </div>
          ))}
          {/* Reference for scrolling to the bottom */}
          <div ref={bottomRef} />
        </div>

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
