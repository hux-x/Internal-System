import React, { useContext } from 'react'
import { FaBell } from 'react-icons/fa'
import logo from '../assets/logo.png'
import usericon from '../assets/user.png'
import { CgEnter } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { OverallContext } from './context/Overall';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, openSidebar, setOpenSidebar,setIsModalOpen } = useContext(OverallContext);
  const openModal = () => {setIsModalOpen(true); console.log("Modal should open");};

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex-shrink-0">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setOpenSidebar(!openSidebar)}>
          <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <FaBell size={20} />
          </button>
          {user.role ? (
            <div className="flex items-center space-x-2 cursor-pointer" onClick={openModal}>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <img src={usericon} alt="User Icon" className="w-full h-full rounded-full" />
              </div>
            </div>
          ) : (
            <div className="text-sm cursor-pointer" onClick={() => navigate('/login')}>
              <CgEnter size={20} className="inline-block mr-2" />
              <span className="text-gray-600">Login/Register</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar