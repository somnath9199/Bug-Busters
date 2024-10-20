import React, { useState} from 'react';
import Sidebar from '../components/Sidebar';
import { AlignJustify } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Demo from './Demo';
import DashboardContent from './DashboardContent';
import BalanceSheet from './BalanceSheet';
import InvestmentAssistantChat from './InvestmentAssistantChat'
import MySales from './MySales';
import FinanceAssistant from './FinanceAssistant';
import TaxCalculation from './TaxCalculation';
const Dashboard = () => {


    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState('Dashboard'); 

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
      setIsSidebarOpen(false);
  };

  const handleNavItemClick = (view) => {
      setActiveComponent(view);
  };


    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <button
                className="md:hidden p-4 bg-blue-900 text-white"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? 'Close Sidebar' : <AlignJustify />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed inset-0 z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                            transition-transform duration-200 ease-in-out md:relative md:translate-x-0 
                            md:flex md:w-72`}
            >
                <Sidebar onNavItemClick={handleNavItemClick} onClose={closeSidebar} />
            </div>
            <div className="flex-1 p-6 md:p-8">
           
                <div>
                    
                    {activeComponent === 'Dashboard' && <DashboardContent/>} 
                    {activeComponent === 'BalanceSheet' && <BalanceSheet/>}     
                    {activeComponent === 'Investment Assistant' && <InvestmentAssistantChat/>}          
                    {activeComponent === 'My Sales' && <MySales/>}     
                    {activeComponent === 'Finance Assistant' && <FinanceAssistant/>}  
                    {activeComponent === 'Tax Calculator' && <TaxCalculation/>}      
                </div>
            </div>
        </div>
    );
};

export default Dashboard;