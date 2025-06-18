import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/templates_sidebar";
import { FaClipboardList, FaExternalLinkAlt } from "react-icons/fa";
import searchIcon from '../assets/search.png';
import {OverallContext} from '../components/context/Overall';
import { useContext} from "react";
import PDFViewer from "../components/reusable/PdfViewer";
import SectionBlock from "../components/reusable/SectionBlock";
const EditTemplates = ({ modalTitle = "Scope Code Documentation Template" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

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

  const name = "resume.pdf";
  const list_items = [
    { icon: <FaClipboardList />, label: 'Template List', active: true },
    { label: 'Templates', name},
    { label: 'My Tasks',name },
    { label: 'Docs',name },
    { label: 'Employee List',name },
    { label: 'Sprints',name },
    { label: 'Task Back Log',name },
  ];
  
  const {selectedTemplate} = useContext(OverallContext);
  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen flex bg-gray-100 ml-[250px] -mt-8 -mx-8">
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
              <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-black">{modalTitle}</h2>
                <button 
                  className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-red-800 transition-colors"
                >
                  Submit
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <SectionBlock title="Scope Code Documentation Template" fields={scopeFields} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default EditTemplates;