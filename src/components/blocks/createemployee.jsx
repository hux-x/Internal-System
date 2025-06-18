import { useContext, useState } from "react";
import employeeIcon from "../../assets/employee.png";
import userGroup from "../../assets/userGroup.png";
import star from "../../assets/star.png";
import speaker from "../../assets/speaker.png";
import shield from "../../assets/shield.png";
import idIcon from "../../assets/idIcon.png";
import chevron from "../../assets/chevron-down.png";
import arrowRight from "../../assets/chevron-right.png";
import plus from "../../assets/plus.png";
import { OverallContext } from "../context/Overall";

const InputField = ({ label, placeholder, icon, value, onChange, type = "text", name, required = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-base font-semibold text-black flex items-center gap-2">
      <img src={icon} className="w-5 h-5" alt="" />
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="bg-gray-50 px-4 py-3 rounded-xl text-xs font-semibold text-gray-500 w-full border border-gray-200 focus:border-red-500 focus:outline-none"
      value={value}
      onChange={onChange}
      name={name}
      required={required}
    />
  </div>
);

const CreateEmployeeModal = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState({
    id: Date.now(), // Generate a unique ID
    role: "",
    name: "",
    department: "",
    probationPeriod: "",
    email: "",
    password: "",
    status: "Active" // Default status
  });
  
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const {isAddEmployeeModalOpen,setIsAddEmployeeModalOpen} = useContext(OverallContext);

  
  const roles = [
    "Employee",
    "Manager",
    "Administrator",
    "Supervisor",
    "Team Lead"
  ];

  const departments = [
    "Technology",
    "Human Resources",
    "Finance",
    "Marketing",
    "Operations",
    "Sales",
    "Customer Support"
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
    setShowRoleDropdown(false);
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: undefined }));
    }
  };

  const handleDepartmentSelect = (department) => {
    setFormData(prev => ({
      ...prev,
      department
    }));
    setShowDepartmentDropdown(false);
    if (errors.department) {
      setErrors(prev => ({ ...prev, department: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddEmployee({...formData,status: "Active"});
      console.log(formData);
      setIsAddEmployeeModalOpen(false)
    }
  };

  return (
    isAddEmployeeModalOpen && 
        <div className="p-6 bg-white rounded-xl shadow-lg w-[680px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src={employeeIcon} className="w-6 h-6" alt="Employee" />
          <h2 className="text-xl font-semibold text-black">Create Employee</h2>
        </div>
        <button onClick={()=>{setIsAddEmployeeModalOpen(false)}}className="hover:bg-gray-100 p-1 rounded">
          <img src={arrowRight} className="w-6 h-6" alt="Close" />
        </button>
      </div>

      <hr className="border border-gray-200 mb-6" />

      <form onSubmit={handleSubmit} noValidate>
        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          {/* Role Dropdown */}
          <div className="relative">
            <label className="text-base font-semibold text-black flex items-center gap-2 mb-1">
              <img src={userGroup} className="w-5 h-5" alt="Role" />
              Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Eg. Employee"
                className={`bg-gray-50 px-4 py-3 rounded-xl text-xs font-semibold text-gray-500 w-full cursor-pointer border ${
                  errors.role ? "border-red-500" : "border-gray-200"
                }`}
                value={formData.role}
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                readOnly
              />
              <img 
                src={chevron} 
                className="w-5 h-5 absolute right-3 top-3 cursor-pointer" 
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                alt="Toggle dropdown"
              />
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
              
              {showRoleDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {roles.map((role) => (
                    <div
                      key={role}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleRoleSelect(role)}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Employee Name */}
          <div>
            <InputField 
              label="Employee Name" 
              placeholder="Any name" 
              icon={star} 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          {/* Department Dropdown */}
          <div className="relative">
            <label className="text-base font-semibold text-black flex items-center gap-2 mb-1">
              <img src={speaker} className="w-5 h-5" alt="Department" />
              Department <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Eg. Technology"
                className={`bg-gray-50 px-4 py-3 rounded-xl text-xs font-semibold text-gray-500 w-full cursor-pointer border ${
                  errors.department ? "border-red-500" : "border-gray-200"
                }`}
                value={formData.department}
                onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                readOnly
              />
              <img 
                src={chevron} 
                className="w-5 h-5 absolute right-3 top-3 cursor-pointer" 
                onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                alt="Toggle dropdown"
              />
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department}</p>
              )}
              
              {showDepartmentDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {departments.map((department) => (
                    <div
                      key={department}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleDepartmentSelect(department)}
                    >
                      {department}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Probation Period */}
          <InputField 
            label="Probation Period" 
            placeholder="Enter In numeric Weeks. Eg 1, 2, 3" 
            icon={shield} 
            name="probationPeriod"
            value={formData.probationPeriod}
            onChange={handleChange}
            type="number"
            min="0"
          />
        </div>

        {/* Email and Password */}
        <div className="flex flex-col gap-4">
          <div>
            <InputField 
              label="Email" 
              placeholder="Eg. example@gmail.com" 
              icon={idIcon} 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <InputField 
              label="Password" 
              placeholder="Enter password (min 6 characters)" 
              icon={idIcon} 
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button 
            
            type="submit"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-700 text-white font-semibold text-xs hover:bg-red-800 transition-colors"
          >
            <img src={plus} className="w-5 h-5" alt="Add" />
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeModal;