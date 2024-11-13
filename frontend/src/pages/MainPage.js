import React from "react";
import Sidebar from "../components/Sidebar";

const MainPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">Main Content</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default MainPage;
