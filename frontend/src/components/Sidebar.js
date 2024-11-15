// Sidebar.js
import React from "react";
import { Layout, Menu, Button, Slider, Space, Divider } from "antd";
import { HomeOutlined, FileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({
  activeEntity,
  setActiveEntity,
  zoomLevel,
  setZoomLevel,
  collapsed,
  setCollapsed,
}) => {
  const projectMenuItems = [
    { key: "patrol", icon: <FileOutlined />, label: "Patrol" },
    { key: "crawling", icon: <HomeOutlined />, label: "Crawling" },
    // { key: "settings", icon: <SettingOutlined />, label: "Settings" },
    // { key: "settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  const entityMenuItems = [
    { key: "users", label: "Users" },
    { key: "posts", label: "Posts" },
    { key: "comments", label: "Comments" },
  ];

  let navigate = useNavigate();

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="p-4">
        <Space>
          {!collapsed && (
            <span className="font-semibold text-white">Dashboard Tmp</span>
          )}
        </Space>
      </div>

      <div className="px-4 py-2">
        <div className="text-gray-500 text-sm">Crawlings</div>
        <Menu
          mode="inline"
          theme="dark"
          items={projectMenuItems}
          onClick={({ key }) => {
            setActiveEntity(key);
            console.log('key', key)
            navigate(key);
          }}
        />
      </div>

      <Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <div className="px-4 py-2">
        <div className="text-gray-500 text-sm">Not Implemented</div>
      </div>

      {/* <Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <div className="px-4 py-2">
        <div>
          <div className="text-gray-500 text-sm mb-2">Zoom</div>
          <Slider
            min={50}
            max={150}
            value={zoomLevel}
            onChange={setZoomLevel}
            className="mb-2"
          />
          <div className="text-right">{zoomLevel}%</div>
        </div>
      </div> */}
    </Sider>
  );
};

export default Sidebar;
