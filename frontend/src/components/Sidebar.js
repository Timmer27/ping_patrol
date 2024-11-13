import React from "react";
import { Menu } from "antd";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        items={[
          { key: "1", label: "Home" },
          { key: "2", label: "Profile" },
          { key: "3", label: "Settings" },
        ]}
      />
    </div>
  );
};

export default Sidebar;
