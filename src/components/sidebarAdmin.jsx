import React,{useContext} from 'react';
import {FaRegChartBar, FaBook, FaChevronDown, FaLock, FaShoppingBag} from 'react-icons/fa';
import { IoMdHelpBuoy } from "react-icons/io";
import { HiCollection } from "react-icons/hi";
import { AiFillPieChart } from "react-icons/ai";
import { RiInboxArchiveFill } from "react-icons/ri";
import { OverallContext } from './context/Overall';
import { getSidebarItemClass,getsubSidebarItemClass } from './utils/fuctions';
const Sidebar = () => {
  const items = ["users", "profile", "settings", "Pricing", "Calendar", "Kanban"];
  const itemssale=['Product List',"billings","invoices"]
  const {selected, setSelected,openSidebar} = useContext(OverallContext);

  return (<>
    {openSidebar && (
     <aside className={`absolute top-0 left-250 h-full bg-white shadow-lg border-r z-20 p-5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
      ${openSidebar ? 'translate-x-0' : '-translate-x-full'}  w-56 sm:w-72 md:w-80`}>
      <div className="space-y-6">
        <nav className="space-y-2 text-sm text-gray-700">
          <div onClick={() => setSelected("overview")} className={getSidebarItemClass("overview",selected)}>
            <AiFillPieChart size={18} /> Overview
          </div>
          
          <details className="group">
            <summary className="cursor-pointer flex items-center font-semibold hover:text-red-500 py-1 px-2 gap-2 rounded group-open:bg-gray-100 ">
            <FaRegChartBar size={18} /> Pages <FaChevronDown className="ml-auto text-xs" />
            </summary>

            <div className="ml-5 mt-2 space-y-1">
              {items.map(item => (
                <div
                  key={item}
                  onClick={() => setSelected(item)}
                  className={getsubSidebarItemClass(item,selected)}>
                  {item}
                </div>
              ))}
            </div>
          </details>

          <details className="group">
            <summary className="cursor-pointer flex items-center font-semibold hover:text-red-500 py-1 px-2 rounded gap-2 group-open:bg-gray-100 ">
              <FaShoppingBag size={18} /> Sales <FaChevronDown className="ml-auto text-xs" />
            </summary>
            <div className="ml-5 mt-2 space-y-1">
              {itemssale.map(item => (
                <div
                  key={item}
                  onClick={() => setSelected(item)}
                  className={getsubSidebarItemClass(item,selected)}>
                  {item}
                </div>
              ))}
            </div>
          </details>

          <div onClick={() => setSelected("messages")} className={getSidebarItemClass("messages",selected)}>
            <RiInboxArchiveFill size={18} /> Messages
          </div>

          <div onClick={() => setSelected("authenication")} className={getSidebarItemClass("authenication",selected)}>
            <FaLock size={18} /> Authenication
          </div>
          <hr />

          <div onClick={() => setSelected("docs")} className={getSidebarItemClass("docs",selected)}>
            <FaBook  size={18}/> Docs
          </div>
          <div onClick={() => setSelected("components")} className={getSidebarItemClass("components",selected)}>
            <HiCollection size={18}/> Componenets
          </div>
        
          <div onClick={() => setSelected("tasks")} className={getSidebarItemClass("tasks",selected)}>
                      <HiCollection  size={18}/> Task Back Log
          </div>
          <div onClick={() => setSelected("performancereviews")} className={getSidebarItemClass("performancereviews",selected)}>
                      <HiCollection  size={18}/> Performance Reviews
          </div>
        </nav>
      </div>
    </aside>)}
    </>
  );
};

export default Sidebar;
