import { useState, useEffect } from "react";
import Top_Header from "../../components/components/Common_Components/Top_Header";
import Footer from "../../components/Footer";

const RoleSelection = () => {
  const [roles, setRoles] = useState([]);
  const [privileges, setPrivileges] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPrivileges, setSelectedPrivileges] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fixedColor = "#125B57";

  useEffect(() => {
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
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    };

    Promise.all([fetchRoles(), fetchPrivileges(), fetchUsers()]).then(() =>
      setLoading(false)
    );
  }, []);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handlePrivilegeChange = (e) => {
    setSelectedPrivileges({
      ...selectedPrivileges,
      [e.target.name]: e.target.checked,
    });
  };

  const handleUserChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value, 10)
    );
    setSelectedUsers(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPrivilegesArray = Object.keys(selectedPrivileges).filter(
      (key) => selectedPrivileges[key]
    );

    const formData = {
      role: selectedRole,
      privileges: selectedPrivilegesArray,
      users: selectedUsers,
    };

    console.log("Form Data:", formData);
  };

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
          <form onSubmit={handleSubmit}>
            {/* Roles Section */}
            <div className="mb-6">
              {loading ? (
                <Shimmer width="w-32" height="h-4" marginBottom="mb-2" />
              ) : (
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Role
                </label>
              )}
              {loading ? (
                <Shimmer />
              ) : (
                <div className="flex space-x-6">
                  {roles.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center space-x-2 text-xs"
                    >
                      <input
                        type="radio"
                        value={role.name}
                        name="role"
                        onChange={handleRoleChange}
                        className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="capitalize">{role.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Privileges Section */}
            <div className="mb-6">
              {loading ? (
                <Shimmer width="w-40" height="h-4" marginBottom="mb-2" />
              ) : (
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Privileges
                </label>
              )}
              {loading ? (
                <Shimmer />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {privileges.map((privilege) => (
                    <label
                      key={privilege.id}
                      className="flex items-center space-x-2 text-xs"
                    >
                      <input
                        type="checkbox"
                        name={privilege.name}
                        onChange={handlePrivilegeChange}
                        className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="capitalize">{privilege.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Users Section */}
            <div className="mb-6">
              {loading ? (
                <Shimmer width="w-40" height="h-4" marginBottom="mb-2" />
              ) : (
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Users
                </label>
              )}
              {loading ? (
                <Shimmer />
              ) : (
                <div>
                  <select
                    multiple
                    value={selectedUsers}
                    onChange={handleUserChange}
                    className="form-select block w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Submit Button */}
            {loading ? (
              <Shimmer height="h-12" width="w-full" marginBottom="mb-0" />
            ) : (
              <button
                type="submit"
                className="w-full bg-[#125B57] text-white py-3 px-6 rounded-lg focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out"
                disabled={loading}
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>

      <Footer color={fixedColor} />
    </div>
  );
};

export default RoleSelection;
