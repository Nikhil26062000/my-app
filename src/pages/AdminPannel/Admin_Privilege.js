// import { useState, useEffect } from 'react';
// import Top_Header from '../../components/components/Common_Components/Top_Header';
// import Footer from '../../components/Footer';
// import { api_url } from '../../constants';
// import { adminPrivelegs } from '../../services/ApiServices';

// const RoleSelection = () => {
//   const [roles, setRoles] = useState([]);
//   const [privileges, setPrivileges] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [selectedPrivileges, setSelectedPrivileges] = useState({});
//   const [selectedUser, setSelectedUser] = useState(null); // Change to single user object
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState("");
//   const [selectedUserPrivilege,setSelectedUserPrivilege] = useState([]);
//   const fixedColor = '#125B57';

//   // Fetch roles, privileges, and users from the public folder and API
//   useEffect(() => {
//     const fetchRoles = async () => {
//       const res = await fetch(`${process.env.PUBLIC_URL}/roles.json`);
//       const data = await res.json();
//       setRoles(data.roles);
//     };

//     const fetchPrivileges = async () => {
//       const res = await fetch(`${process.env.PUBLIC_URL}/privileges.json`);
//       const data = await res.json();
//       setPrivileges(data.privileges);
//     };

//     const fetchUsers = async () => {
//       const res = await adminPrivelegs()
//       // console.log(res)
//       // const data = await res.json();
//       setUsers(res);
//     };

//     Promise.all([fetchRoles(), fetchPrivileges(), fetchUsers()]).then(() => setLoading(false));
//   }, []);

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const handlePrivilegeChange = (e) => {
//     setSelectedPrivileges({
//       ...selectedPrivileges,
//       [e.target.name]: e.target.checked,
//     });
//   };

//   // Handle user selection to ensure only one user can be selected
//   const handleUserChange = (e) => {
//     console.log(e)

//     const selectedOption = e.target.options[e.target.selectedIndex];

//     // Create the user object with an additional key 'userid'
//     let userid = parseInt(selectedOption.value, 10)
//     const selectedUser = userid
//      // Convert value to number
//       // name: selectedOption.text // Additional field(s) can be added as needed

//     // Update the state with this user object
//     setSelectedUser(selectedUser);
//     setUsername(selectedOption.text)
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const selectedPrivilegesArray = Object.keys(selectedPrivileges).filter(
//       (key) => selectedPrivileges[key]
//     );

//     const formData = {
//       role: selectedRole,
//       privileges: selectedPrivilegesArray,
//       userid: selectedUser, // Use selected user object,
//       username:username
//     };

//     console.log('Form Data:', formData);
//   };

//   // Shimmer Effect
//   const Shimmer = ({ height = 'h-6', width = 'w-full', marginBottom = 'mb-4' }) => (
//     <div className={`animate-pulse ${marginBottom}`}>
//       <div className={`${height} ${width} bg-gray-300 rounded`}></div>
//     </div>
//   );

//   return (
//     <div className="w-full">
//       <Top_Header title="Roles & Privileges" />
//       <div className="w-full px-[20px]">
//         <div className="w-[100%] mx-auto mt-10 p-8 bg-gray-100 rounded-lg shadow-lg">
//           {loading ? (
//             <div>
//               {/* Shimmer Effect for the entire form */}
//               <Shimmer width="w-40" height="h-4" marginBottom="mb-4" />
//               <Shimmer width="w-full" height="h-6" marginBottom="mb-4" />
//               <Shimmer width="w-32" height="h-4" marginBottom="mb-4" />
//               <Shimmer width="w-full" height="h-6" marginBottom="mb-4" />
//               <Shimmer width="w-40" height="h-4" marginBottom="mb-4" />
//               <Shimmer width="w-full" height="h-6" marginBottom="mb-4" />
//               <Shimmer height="h-12" width="w-full" marginBottom="mb-0" />
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               {/* Users Section */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Select User
//                 </label>
//                 <div>
//                   <select
//                     value={username} // Bind to selectedUser's userid
//                     onChange={handleUserChange}
//                     className="form-select block w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                   >
//                     <option value="" disabled>
//                       Select a user
//                     </option> {/* Placeholder option */}
//                     {users.map((user) => (
//                       <option key={user.pid} value={user.pid}>
//                         {user.username}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Roles Section */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Select Role
//                 </label>
//                 <div className="flex space-x-6">
//                   {roles.map((role) => (
//                     <label key={role.role_id} className="flex items-center space-x-2 text-xs">
//                       <input
//                         type="radio"
//                         value={role.role_name}
//                         name="role"
//                         onChange={handleRoleChange}
//                         className="text-blue-600 focus:ring-blue-500 focus:ring-2"
//                       />
//                       <span className="capitalize">{role.role_name}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Privileges Section */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Select Privileges
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   {privileges.map((privilege) => (
//                     <label key={privilege.id} className="flex items-center space-x-2 text-xs">
//                       <input
//                         type="checkbox"
//                         name={privilege.name}
//                         onChange={handlePrivilegeChange}
//                         className="text-blue-600 focus:ring-blue-500 focus:ring-2"
//                       />
//                       <span className="capitalize">{privilege.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-[#125B57] text-white py-3 px-6 rounded-lg focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out"
//               >
//                 Submit
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//       <Footer color={fixedColor} />
//     </div>
//   );
// };

// export default RoleSelection;

import { useState, useEffect } from "react";
import Top_Header from "../../components/components/Common_Components/Top_Header";
import Footer from "../../components/Footer";
import { adminPrivelegs, set_Privileges } from "../../services/ApiServices";

const RoleSelection = () => {
  const [roles, setRoles] = useState([]);
  const [copyRoles, setCopyRoles] = useState([]);
  const [copyRoles2, setCopyRoles2] = useState([]);
  const [privileges, setPrivileges] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPrivileges, setSelectedPrivileges] = useState({});
  const [selectedUser, setSelectedUser] = useState(""); // Use user ID here
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const fixedColor = "#125B57";
  const [filterUser, setFilterUser] = useState([]);
  const [already_present_role, set, Already_Present_role] = useState("");
  // let [temp,setTemp] = useState(true)

  let obj = {};

  // Fetch roles, privileges, and users from the public folder and API
  const fetchRoles = async () => {
    const res = await fetch(`${process.env.PUBLIC_URL}/roles.json`);
    const data = await res.json();
    setRoles(data.roles);
  };

  const fetchPrivileges = async () => {
    const res = await fetch(`${process.env.PUBLIC_URL}/privileges.json`);
    const data = await res.json();
    setPrivileges(data.privileges);
  };

  const fetchUsers = async () => {
    const res = await adminPrivelegs();
    setUsers(res);
  };
  useEffect(() => {
  

    Promise.all([fetchRoles(), fetchPrivileges(), fetchUsers()]).then(() =>
      setLoading(false)
    );
  }, []);

  const handleRoleChange = (id) => {
    const updatedRoles = roles.map((role) => {
      if (role.role_id === id) {
        // Set only the selected role to `isChecked: true`
        return { ...role, isChecked: true };
      } else {
        // Set all other roles to `isChecked: false`
        return { ...role, isChecked: false };
      }
    });

    setRoles(updatedRoles);

    console.log("Roles after click radio ", updatedRoles);
  };

  const handlePrivilegeChange = (id) => {
    // console.log(e)
    console.log(id);
    const updatedCheckboxes = privileges.map((checkbox) => {
      if (checkbox.id == id) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      }
      return checkbox;
    });

    console.log("updatedCheckboxes------>", updatedCheckboxes);
    // console.log(privileges);
    setPrivileges(updatedCheckboxes);
    // console.log(privileges);

    // setSelectedPrivileges({
    //   ...selectedPrivileges,
    //   [e.target.name]: e.target.checked,
    // });
  };

  // Handle user selection to ensure only one user can be selected
  const handleUserChange = (e) => {
    roles.map((r) => {
      r.isChecked = false;
    });
    console.log("Role value", roles);

    console.log(e);
    // setTemp(!temp)
    // const selectedOption = e.target.options[e.target.selectedIndex];
    const pid = e.target.value;
    // users.map((ele) => {
    //   ele.privilege = JSON.parse(ele.privilege);
    // });
    const filteredUser = users.find((user) => user.pid == pid);
    console.log(parseInt(filteredUser.role));

    roles.map((role) => {
      if (role.role_id == parseInt(filteredUser.role) && role.role_id != 0) {
        role.isChecked = true;
      }
    });
    setFilterUser(filteredUser);
    setSelectedUser(pid);
    console.log("Updated Roles", roles);
    // setUsername(selectedOption.text);
    // console.log(filterUser);

    obj = {
      edit: filteredUser.privileges.includes("edit"),
      update: filteredUser.privileges.includes("update"),
      approve: filteredUser.privileges.includes("approve"),
      view: filteredUser.privileges.includes("view"),
      delete: filteredUser.privileges.includes("delete"),
    };

    console.log(obj);
    // console.log("Main prev : ", privileges);
    privileges.map((p) => (p.isChecked = obj[p.name]));
    // console.log("updatedPriv :", privileges);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const selectedPrivilegesArray = Object.keys(selectedPrivileges).filter(
    //   (key) => selectedPrivileges[key]
    // );
    let finalRole = {};
    roles.map((r) => {
      if (r.isChecked == true) {
        finalRole = r;
      }
    });

    console.log("Backend data prev :", privileges);
    const selectedPrivileges = privileges
      .filter((privilege) => privilege.isChecked)
      .map((privilege) => privilege.name);

    console.log(selectedPrivileges);

    const formData = {
      role: finalRole,

      privileges: selectedPrivileges,
      pid: selectedUser,
    };

    console.log("Form Data:", formData);

    const res = await set_Privileges(formData);
    console.log(res);
    fetchUsers()
  };

  // Shimmer Effect
  const Shimmer = ({
    height = "h-6",
    width = "w-full",
    marginBottom = "mb-4",
  }) => (
    <div className={`animate-pulse ${marginBottom}`}>
      <div className={`${height} ${width} bg-gray-300 rounded`}></div>
    </div>
  );

  return (
    <div className="w-full">
      <Top_Header title="Roles & Privileges" />
      <div className="w-full px-[20px]">
        <div className="w-[100%] mx-auto mt-10 p-8 bg-gray-100 rounded-lg shadow-lg">
          {loading ? (
            <div>
              <Shimmer width="w-40" height="h-4" marginBottom="mb-4" />
              <Shimmer width="w-full" height="h-6" marginBottom="mb-4" />
              <Shimmer width="w-32" height="h-4" marginBottom="mb-4" />
              <Shimmer width="w-full" height="h-6" marginBottom="mb-4" />
              <Shimmer width="w-40" height="h-4" marginBottom="mb-4" />
              <Shimmer width="w-full" height="h-6" marginBottom="mb-4" />
              <Shimmer height="h-12" width="w-full" marginBottom="mb-0" />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Users Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select User
                </label>
                <div>
                  <select
                    required
                    value={selectedUser} // Bind to selectedUser's ID
                    onChange={handleUserChange}
                    className="form-select block w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="" disabled>
                      Select a user
                    </option>
                    {users.map((user) => (
                      <option key={user.pid} value={user.pid}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Roles Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Role
                </label>
                <div className="flex space-x-6">
                  {roles.map((role) => (
                    <label
                      key={role.role_id}
                      className="flex items-center space-x-2 text-xs"
                    >
                      <input
                        required
                        type="radio"
                        value={role.role_name}
                        name="role"
                        checked={role.isChecked}
                        onChange={() => handleRoleChange(role.role_id)}
                        className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="capitalize">{role.role_name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privileges Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Privileges
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {privileges.map((privilege) => (
                    <label
                      key={privilege.id}
                      className="flex items-center space-x-2 text-xs"
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-${privilege.id}`}
                        checked={privilege.isChecked}
                        name={privilege.name}
                        onChange={() => handlePrivilegeChange(privilege.id)}
                        className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="capitalize">{privilege.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#125B57] text-white py-3 px-6 rounded-lg focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer color={fixedColor} />
    </div>
  );
};

export default RoleSelection;
