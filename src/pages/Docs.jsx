import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/templates_sidebar";
import {FaExternalLinkAlt, FaFolder } from "react-icons/fa";
import searchIcon from '../assets/search.png';
import {OverallContext} from '../components/context/Overall';
import { useContext} from "react";
import PDFViewer from "../components/reusable/PdfViewer";
import { FaFolderClosed } from "react-icons/fa6";
import SectionBlock from "../components/reusable/SectionBlock";
import FolderList from "../components/blocks/FolderList";

const EditTemplates = ({ modalTitle = "Scope Code Documentation Template" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolderListOpen, setIsFolderListOpen] = useState(false);
  
  const modalRef = useRef(null);
  const folderListRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle FolderList close if it's open
      if (isFolderListOpen && folderListRef.current && !folderListRef.current.contains(event.target)) {
        setIsFolderListOpen(false);
      }
      // Handle main modal close only if FolderList is not open
      else if (isModalOpen && !isFolderListOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isFolderListOpen]);

  const scopeFields = [
    { heading: "Feature Name", height: "48px", type: "text" },
    { heading: "Objective", height: "112px", type: "textarea" },
    { heading: "Success Criteria", height: "112px", type: "textarea" },
    { heading: "Functional Requirements", height: "112px", type: "textarea" },
    { heading: "Technical Requirements", height: "112px", type: "textarea" },
    { heading: "Data Flow", height: "112px", type: "textarea" },
    { heading: "Edge Cases", height: "112px", type: "textarea" },
    { heading: "Deliverables", height: "112px", type: "textarea" },
    { heading: "Enter Sprint Serial", height: "48px", type: "number" },
  ];

  const postCodeFields = [
    { heading: "Test Cases Executed", height: "112px", type: "textarea" },
    { heading: "QA Feedback", height: "112px", type: "textarea" },
    { heading: "Bug Fix Summary", height: "112px", type: "textarea" },
    { heading: "Code Review Notes", height: "112px", type: "textarea" },
    { heading: "Final Outcome", height: "112px", type: "textarea" },
  ];

  const name = "resume.pdf";
  const list_items = [
    { icon: <FaFolderClosed />, label: 'Folders', active: true },
    { icon:<FaFolder style={{color: 'black'}}/>,label: 'Templates', name},
    { icon:<FaFolder style={{color: 'black'}}/>,label: 'My Tasks',name },
    { icon:<FaFolder style={{color: 'black'}}/>,label: 'Docs',name },
    { icon:<FaFolder style={{color: 'black'}}/>,label: 'Employee List',name },
    { icon:<FaFolder style={{color: 'black'}}/>, label: 'Sprints',name },
    { icon:<FaFolder style={{color: 'black'}}/>,label: 'Task Back Log',name },
  ];
  
  const {selectedTemplate} = useContext(OverallContext);
  const openModal = () => setIsModalOpen(true);
  const handleSubmit = () => {
    setIsFolderListOpen(true);
  }

  return (
    <div className="min-h-screen flex bg-gray-100 ml-[255px] -mt-8  p-8 overflow-hidden">
      <Sidebar items={list_items} />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 flex justify-between items-center mb-6">
          <div className="relative w-1/4">
            <img 
              src={searchIcon} 
              alt="Search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
            <input 
              type="text" 
              className="bg-gray-200 rounded-xl pl-10 pr-4 py-2 w-full text-xs" 
              placeholder="Search for templates by name"
            />
          </div>
          <button 
            onClick={openModal}
            className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            Edit Template
          </button>
        </div>
        
        {/* PDF Viewer Section */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
          <PDFViewer fileName={selectedTemplate} />
        </div>
        
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10">
            <div 
              ref={modalRef}
              className="bg-white rounded-2xl w-4/5 max-w-6xl h-[80vh] shadow-lg relative flex flex-col"
            >
              {/* Fixed header */}
              <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <h2 className="text-xl font-semibold text-black">{modalTitle}</h2>
                <button 
                  className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-red-800 transition-colors"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              
              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <SectionBlock 
                    title="Scope Code Documentation Template"
                    fields={scopeFields} 
                  />
                  <div className="my-10 border-t border-gray-200"></div>
                  <SectionBlock 
                    title="Post Code Template" 
                    fields={postCodeFields} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isFolderListOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-80">
            <div ref={folderListRef}>
              <FolderList closeModal={() => setIsFolderListOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default EditTemplates;