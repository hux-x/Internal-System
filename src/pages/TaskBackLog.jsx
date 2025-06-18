import { useState, useEffect, useContext } from 'react';
import left from '../assets/chevron-left.png';
import right from '../assets/chevron-right.png';
import searchIcon from '../assets/search.png';
import plus from '../assets/plus.png';
import { backLog } from '../components/utils/demo_data';
import CreateEmployeeModal from '../components/blocks/createemployee';
import { OverallContext } from '../components/context/Overall';
import TaskTable from '../components/reusable/ReusableTable'; //reusable
import Footer from '../components/footer';

export default function TaskBackLog() {
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const { 
  
    employeeData,
    setEmployeeData,
     setViewTask,
     setOpenCTaskModal,
  } = useContext(OverallContext);
  const columns = ["TASK NAME", "DEPARTMENT", "TASK ID", "STATUS"];
 

  useEffect(() => {
    if(employeeData?.length === 0) {
      setEmployeeData(backLog);
    }
  }, [employeeData, setEmployeeData]);

  // Filter data based on search
  const filteredData = backLog.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Open add employee modal
  const openAddTaskModal = () => {
    setOpenCTaskModal(true)
  };



  const handleEditTask = ()=>{
    setViewTask(true)
  }

  return (
    <div className="ml-[16rem] w-[calc(100%-16rem)] min-h-screen bg-[#F9FAFB] flex flex-col relative p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4 px-10 pt-0">
        <div className="relative w-full sm:w-[25.125rem] ml-4">
          <div className="relative">
            <img 
              src={searchIcon} 
              alt="Search" 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4" 
            />
            <input
              type="text"
              placeholder="Search Back Log By Name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-[2.8125rem] pl-10 pr-[0.9375rem] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[1rem] text-base font-normal text-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#E5E7EB]"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            className="flex items-center justify-center gap-2 w-[174px] h-[44px] px-[11px] bg-[#C81E1E] rounded-[12px] hover:bg-[#B81E1E] transition-colors"
            onClick={openAddTaskModal}
          >
            <img 
              src={plus} 
              alt="Add Task" 
              className="w-[23px] h-[23px]" 
            />
            <span className="text-[12px] font-semibold text-white">
              Add Task To BackLog
            </span>
          </button>
          <div className="flex items-center gap-2">
            <button 
              className="w-6 h-6 flex items-center justify-center disabled:opacity-50"
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <img src={left} alt="Previous" className="w-6 h-6" />
            </button>
            <button 
              className="w-6 h-6 flex items-center justify-center disabled:opacity-50"
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <img src={right} alt="Next" className="w-6 h-6" />
            </button>
            <span className="text-xs font-semibold text-[#6B7280]">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
      </div>

      {/* Table Component */}
      <TaskTable 
        data={filteredData} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        onPageChange={paginate} 
        editItem={handleEditTask}
        columns={columns}
      />

    <Footer/>
    
    </div>
  );
}