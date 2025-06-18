import React, { useContext, useState } from 'react';
import { User, Fingerprint, ArrowRight } from 'lucide-react';
import { OverallContext } from '../context/Overall';
import { MdPeopleAlt } from "react-icons/md";
import user from '../../assets/userIcon.png';

const UserUpdate = () => {
  const [password, setPassword] = useState('Password123');
  const { isModalOpen, setIsModalOpen } = useContext(OverallContext);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative p-8">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-black" />
                <h2 className="text-xl font-bold text-black">Update Profile</h2>
              </div>
              <ArrowRight className="h-6 text-black font-extrabold cursor-pointer" onClick={closeModal} />
            </div>

            {/* Responsive Layout: img right on desktop, top on mobile */}
            <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-between">
              
              {/* Left - Password */}
              <div className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2">
                <label className="flex items-center gap-2 text-sm text-gray-800 mb-2">
                  <MdPeopleAlt className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Eg. Password123"
                  className="w-4/5 max-w-sm px-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
              </div>
              <div className="hidden md:block h-[100px] w-px bg-gray-300"></div>
              {/* Right - Profile Picture */}
              <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                <div className="flex items-center gap-2 text-md text-gray-800 mb-2">
                  <Fingerprint className="w-4 h-4" />
                  Profile Picture
                </div>
                <img
                  src={user}
                  alt="User Profile"
                  className="w-[140px] h-[140px] object-cover rounded-full"
                />
              </div>
            </div>

            {/* Update Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={closeModal}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-6 py-2.5 rounded-xl font-medium transition"
              >
                Update profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserUpdate;
