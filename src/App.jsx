import './index.css';
import AdminSidebar from './components/sidebarAdmin';
import EmployeeSidebar from './components/sidebarEmp';
import Navbar from './components/navbar';
import React, { useContext } from 'react';
import { OverallContext } from './components/context/Overall';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/home';
import LoginComponent from './pages/login';
import UserUpdate from './components/blocks/userupdate'
import ViewReviewModal from './components/blocks/viewReview';
import SeeTask from './components/blocks/seeTask';
import CreateReview from './components/blocks/createreview';
import CreateTaskModal from './components/blocks/createTask';
import TaskBackLog from './pages/TaskBackLog';
import EditTemplates from './pages/EditTemplates';
import Docs from './pages/Docs';
import EmployeeList from './pages/EmployeeList';
import Footer from './components/footer';
import SprintBoard from './pages/Sprints';
function App() {
  const { user,selected } = useContext(OverallContext);
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen h-screen bg-gray-50">
        {/* Fixed height navbar */}
        <Navbar />
        
        <div className="flex flex-1 relative bg-gray-50 overflow-hidden">
          {/* Sidebar */}
          {user.role === 'admin' ? <AdminSidebar /> : <EmployeeSidebar />}
          
          {/* Main content area */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6 lg:p-8">
            <UserUpdate/><ViewReviewModal/><SeeTask/><CreateReview/><CreateTaskModal/>  {/* Overlay components create review for execs and employees only*/}
             {selected === 'overview' && <Dashboard />}
                {selected === 'employeeList' &&  <EmployeeList />}
                {selected === 'tasks' &&  <TaskBackLog />}
                {selected === 'templates' && <EditTemplates/>}
                {selected === 'docs' && <Docs/>}
                {selected === 'sprints' && <SprintBoard/>}
              <Routes>

               
                <Route path="/login" element={<LoginComponent />} />
              </Routes>
            </div>
          </main>
           
        </div>
       
      </div>
    </Router>
  );
}

export default App;