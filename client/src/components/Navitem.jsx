import React from 'react';

const NavItem = ({ title, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex  items-center p-4 border border-transparent border-b-4 hover:border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white hover:bg-blue-50 text-blue-900"
    >
      {icon && <div className="mr-3 text-blue-500">{icon}</div>}
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
  );
};

export default NavItem;