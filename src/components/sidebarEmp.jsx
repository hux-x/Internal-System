import React, { useContext } from 'react';
import { FaRegChartBar, FaBook, FaLock, FaExternalLinkAlt} from 'react-icons/fa';
import { HiCollection } from "react-icons/hi";
import { AiFillPieChart } from "react-icons/ai";
import { OverallContext } from './context/Overall';
import { getSidebarItemClass } from './utils/fuctions';
import { useNavigate } from 'react-router-dom';
import PerformanceReviews from './blocks/PerformanceReviewModal';
const Sidebar = () => {
  const {selected, setSelected,user,openSidebar,setIsPerformanceModalOpen} = useContext(OverallContext);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  return (<>
   {openSidebar && (<aside className={`absolute top-0 left-0 h-full bg-white shadow-lg border-r z-20 p-5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
      ${openSidebar ? 'translate-x-0' : '-translate-x-full'}  w-56 sm:w-72 md:w-75`}>
      <div className="space-y-6">
        <nav className="space-y-2 text-sm text-gray-700">
          <div onClick={() => {setSelected("overview"); navigate('/')}} className={getSidebarItemClass("overview",selected)}>
            <AiFillPieChart size={18} /> Dashboard
          </div>
          <div onClick={() => setSelected("templates")} className={getSidebarItemClass("templates",selected)}>
            <FaRegChartBar size={18} /> Templates
          </div>
          <div onClick={() => setSelected("task_current")} className={getSidebarItemClass("task_current",selected)}>
          <FaLock size={18} /> My Tasks 
          </div>
          <hr />

          <div onClick={() => setSelected("docs")} className={getSidebarItemClass("docs",selected)}>
            <FaBook /> Docs
          </div>
          {
            role ==='admin' && <div onClick={() => setSelected("employeeList")} className={getSidebarItemClass("employeeList",selected)}>
            <HiCollection  size={18}/> Employee List
          </div>
          }
          
          <div onClick={() => setSelected("sprints")} className={getSidebarItemClass("sprints",selected)}>
            <HiCollection  size={18}/> Sprints
          </div>

          {(user.role.includes("executive")||user.role.includes("admin"))&&(<div onClick={() => setSelected("employee")} className={getSidebarItemClass("employee",selected)}>
            <HiCollection  size={18}/> Employee Lists </div>)}
            {!user.role.includes("executive")&&(<div onClick={() => setSelected("tables")} className={getSidebarItemClass("tables",selected)}>
            <HiCollection  size={18}/> Tables
          </div>)}   {/*show For employee only not for executive*/}
          
          <div onClick={() => setSelected("tasks")} className={getSidebarItemClass("tasks",selected)}>
            <HiCollection  size={18}/> Task Backlog
          </div>
          <div  className={getSidebarItemClass("performancereviews",selected)}>
            <HiCollection  size={18}/> <p onClick={() => setSelected("performancereviews")}>Performance Reviews </p>
            <FaExternalLinkAlt size={14} onClick={()=>setIsPerformanceModalOpen(true)}/>
          </div>
       
        </nav>
      </div>
    </aside>)}
    <PerformanceReviews action={()=>setIsPerformanceModalOpen(false)}/>
    </>
  );
};

export default Sidebar;
