import React from 'react'
import { createContext, useState } from "react";

export const OverallContext = createContext();
export const OverallContextProvider = ({ children }) => {
    const [user,setUser] = useState({
        name: "",
        email: "",
        role: "employee",
        id: ""
    });
    const [selected, setSelected] = useState("overview"); 
    const [openSidebar, setOpenSidebar] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // for user update profile
    const [reviewModal,setReviewModal] = useState(false); // for viewing reviews 
    const [reviewTask,setreviewTask] = useState(false); // for creating new task review
    const [currentReviewData, setCurrentReviewData] = useState(null); // for viewing specific review details
    const [openCTaskModal, setOpenCTaskModal] = useState(false); // Modal for creating new task
    const [viewTask, setViewTask] = useState(false); // for viewing task details
    const [taskData, setTaskData] = useState([]); // for storing task data
    const [employeeData, setEmployeeData] = useState([]); // for storing employee data
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [taskLogData, setTaskLogData] = useState([]); // for storing task log data
    const [selectedTemplate, setSelectedTemplate] = useState('/templates/resume.pdf'); // for storing selected template data
    const [sprints,setSprints] = useState([]);
    const [myTasks,setMyTasks] = useState({});
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [postRequestBody,setPostRequestBody] = useState({})   //will be used for sending post requests
    

  
  return (
    <OverallContext.Provider value={{postRequestBody,setPostRequestBody,showReviewModal, setShowReviewModal,myTasks,setMyTasks,sprints,setSprints,isAddEmployeeModalOpen, setIsAddEmployeeModalOpen,taskLogData,setTaskLogData,employeeData,setEmployeeData,viewTask, setViewTask,user,setUser,selected, setSelected,openSidebar, setOpenSidebar,isModalOpen, setIsModalOpen,reviewModal,setReviewModal,currentReviewData, setCurrentReviewData,openCTaskModal, setOpenCTaskModal,taskData, setTaskData,reviewTask,setreviewTask,selectedTemplate,setSelectedTemplate}}>
      {children}
    </OverallContext.Provider>
  );
};
export default OverallContextProvider;
