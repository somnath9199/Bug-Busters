import React from "react";
import { LayoutDashboard } from "lucide-react";
import NavItem from "./NavItem";
import backgroundImage from '../assets/bg.jpg'
import { useNavigate } from "react-router-dom";
const Sidebar = ({ onNavItemClick, onClose }) => {
  const navigate = useNavigate();
  return (

    
<div
  style={{ backgroundImage: `url(${backgroundImage})` }}
  className="object-cover text-white w-72 p-6 md:p-4 h-full relative flex flex-col justify-between"
>


  
      <button
        className="absolute top-4 right-4 text-white md:hidden"
        onClick={onClose}
      >
        ✕
      </button>

      <div className="mb-10 text-center md:text-left border-b-4">
        <h1
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <span className="text-xl font-bold text-white mb-2"><a href="/">ShopCA</a> </span>
        </h1>
      </div>

      {/* Navigation Items Section */}
      <div className="flex-grow space-y-4 ">
      <NavItem
          title="Dashboard"
          icon={<LayoutDashboard />}
          onClick={() => onNavItemClick("Dashboard")}
        />
        <NavItem
          title="BalanceSheet"
          icon={<LayoutDashboard />}
          onClick={() => onNavItemClick("BalanceSheet")} 
        />
         <NavItem
          title="Investment Assistant"
          icon={<LayoutDashboard />}
          onClick={() => onNavItemClick("Investment Assistant")} 
        />
         <NavItem
          title="My Sales"
          icon={<LayoutDashboard />}
          onClick={() => onNavItemClick("My Sales")}
        />
          <NavItem
          title="Finance Assistant"
          icon={<LayoutDashboard />}
          onClick={() => onNavItemClick("Finance Assistant")} 
        />
        <NavItem
        title="Tax Calculator"
        icon={<LayoutDashboard />}
        onClick={() => onNavItemClick("Tax Calculator")} 
      />
      </div>
    </div>
  );
};

export default Sidebar;