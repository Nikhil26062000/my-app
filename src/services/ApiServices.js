import axiosInstance from "../utils/axiosInstance";

export const adminPrivelegs = async () => {
  try {
    const response = await axiosInstance.get("/admin/acc/userlist");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const adminPrivelegs_handleSubmit = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/admin/acc/privilegemap",
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in adminPrivelegs_handleSubmit:", error);
  }
};

export const post_like = async (ele) => {
  try {
    const response = await axiosInstance.post("/admin/acc/appdata/postlike", {
      userid: localStorage.getItem("userid"),
      username: localStorage.getItem("username"),
      attachment_id: ele.attachment_id,
      is_like: true,
      post_id: ele.pid,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetch_like_data = async (ele) => {
  try {
    const response = await axiosInstance.post(
      "/admin/acc/appdata/postlikelist",
      {
        attachment_id: ele.attachment_id,
        post_id: ele.pid,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const SendComments = async (comment) => {
  try {
    const response = await axiosInstance.post(
      "/admin/acc/appdata/postcomments",
      {
        userid: localStorage.getItem("userid"),
        username: localStorage.getItem("username"),
        attachment_id: localStorage.getItem("attch_id"),
        comments: comment,
        post_id: localStorage.getItem("post_id"),
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCommentsData = async () => {
  try {
    const response = await axiosInstance.post(
      "/admin/acc/appdata/postcommentslist",
      {
        attachment_id: localStorage.getItem("attch_id"),
        post_id: localStorage.getItem("post_id"),
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const unverified_post = async () => {
  try {
    const response = await axiosInstance.get(
      "/admin/acc/appdata/unusersignaturelist"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handle_approve_reject_post = async (ele, type) => {
  try {
    const response = await axiosInstance.post(
      "/admin/acc/appdata/approverejectpost",
      {
        is_verified: type,
        pid: ele.pid,
        username: localStorage.getItem("username"),
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const set_Privileges = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/admin/acc/privilegemap",
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// import { api_url } from "../constants";

// export const adminPrivelegs = async () => {
//   try {
//     const response = await fetch(`${api_url}/admin/acc/userlist`);
//     const data = await response.json();
//     // console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const adminPrivelegs_handleSubmit = async (formData) => {
//   try {
//     console.log(formData);

//     // Assuming you want to send a POST request and formData is an object
//     const response = await fetch(`${api_url}/admin/acc/privilegemap`, {
//       method: "POST", // Set HTTP method (e.g., POST)
//       headers: {
//         "Content-Type": "application/json", // If sending JSON data
//       },
//       body: JSON.stringify(formData), // Convert the formData object to a JSON string
//     });

//     // Check if the response was successful
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     console.log(response);
//     const data = await response.json(); // Parse the response as JSON
//     console.log(data);
//     console.log(JSON.parse(JSON.stringify(data)));

//     return data;
//   } catch (error) {
//     console.error("Error in adminPrivelegs_handleSubmit:", error);
//   }
// };
// export const post_like = async (ele) => {
//   try {
//     console.log(ele);
//     const response = await fetch(`${api_url}/admin/acc/appdata/postlike`, {
//       method: "POST", // Specify the HTTP method
//       headers: {
//         "Content-Type": "application/json", // Set the content type to JSON
//       },
//       body: JSON.stringify({
//         // Convert the payload to JSON
//         userid: localStorage.getItem("userid"),
//         username: localStorage.getItem("username"),
//         attachment_id: ele.attachment_id,
//         is_like: true,
//         post_id: ele.pid,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetch_like_data = async (ele) => {
//   try {
//     const response = await fetch(`${api_url}/admin/acc/appdata/postlikelist`, {
//       method: "POST", // Specify the HTTP method
//       headers: {
//         "Content-Type": "application/json", // Set the content type to JSON
//         // Optional: Authorization token
//       },
//       body: JSON.stringify({
//         attachment_id: ele.attachment_id,
//         post_id: ele.pid,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const SendComments = async (comment) => {
//   try {
//     const response = await fetch(`${api_url}/admin/acc/appdata/postcomments`, {
//       method: "POST", // Specify the HTTP method
//       headers: {
//         "Content-Type": "application/json", // Set the content type to JSON
//         // Optional: Authorization token
//       },
//       body: JSON.stringify({
//         userid: localStorage.getItem("userid"),
//         username: localStorage.getItem("username"),
//         attachment_id: localStorage.getItem("attch_id"),
//         comments: comment,
//         post_id: localStorage.getItem("post_id"),
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchCommentsData = async () => {
//   try {
//     const response = await fetch(
//       `${api_url}/admin/acc/appdata/postcommentslist`,
//       {
//         method: "POST", // Specify the HTTP method
//         headers: {
//           "Content-Type": "application/json", // Set the content type to JSON
//           // Optional: Authorization token
//         },
//         body: JSON.stringify({
//           attachment_id: localStorage.getItem("attch_id"),
//           post_id: localStorage.getItem("post_id"),
//         }),
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const unverified_post = async () => {
//   try {
//     const response = await fetch(
//       `${api_url}/admin/acc/appdata/unusersignaturelist`
//     );
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const handle_approve_reject_post = async (ele,type) => {
//   try {
//     const response = await fetch(
//       `${api_url}/admin/acc/appdata/approverejectpost`,
//       {
//         method: "POST", // Specify the HTTP method
//         headers: {
//           "Content-Type": "application/json", // Set the content type to JSON
//           // Optional: Authorization token
//         },
//         body: JSON.stringify({
//           is_verified: type,
//           pid: ele.pid,
//           username: localStorage.getItem("username"),
//         }),
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const set_Privileges = async (formData) => {
//   try {
//     const response = await fetch(`${api_url}/admin/acc/privilegemap`, {
//       method: 'POST', // Specify POST method
//       headers: {
//         'Content-Type': 'application/json', // Set content type to JSON
//       },
//       body: JSON.stringify(formData), // Convert formData to JSON string
//     });

//     const data = await response.json(); // Parse JSON response
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
