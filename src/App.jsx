import './index.css';
import AdminSidebar from './components/sidebarAdmin';
import EmployeeSidebar from './components/sidebarEmp';
import Navbar from './components/navbar';
import React, { useContext } from 'react';
import { OverallContext } from './components/context/Overall';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Sprints from './pages/Sprints';
import MyTasks from './pages/MyTasks';
import PerformanceReview from './pages/PerformanceReview';
import Tables from './pages/Tables';

function App() {
  const { user, selected } = useContext(OverallContext);
  const loggedIn = localStorage.getItem('session_token');
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen h-screen bg-gray-50">
        {/* Fixed height navbar */}
        {loggedIn && <Navbar />}
        
        <div className="flex flex-1 relative bg-gray-50 overflow-hidden">
          {/* Sidebar */}
          {loggedIn && (user.role === 'admin' ? <AdminSidebar /> : <EmployeeSidebar />)}
          
          {/* Main content area */}
          <main className="flex-1 overflow-auto">
            <div className="">
              {loggedIn && (
                <>
                  <UserUpdate />
                  <ViewReviewModal />
                  <SeeTask />
                  <CreateReview />
                  <CreateTaskModal />
                </>
              )}

              <Routes>
                <Route 
                  path="/login" 
                  element={loggedIn ? <Navigate to="/" /> : <LoginComponent />} 
                />
                <Route 
                  path="*" 
                  element={
                    loggedIn ? (
                      <>
                        {selected === 'overview' && <Dashboard />}
                        {selected === 'employeeList' && <EmployeeList />}
                        {selected === 'tasks' && <TaskBackLog />}
                        {selected === 'templates' && <EditTemplates />}
                        {selected === 'docs' && <Docs />}
                        {selected === 'sprints' && <Sprints />}
                        {selected === 'task_current' && <MyTasks />}
                        {selected === 'performancereviews' && <PerformanceReview />}
                        {selected === 'tables' && <Tables />}
                      </>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  } 
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;