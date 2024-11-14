// Sidebar.js
import React from "react";
import { Layout, Menu, Button, Slider, Space, Divider } from "antd";
import {
  DatabaseOutlined,
  HomeOutlined,
  // LayersOutlined,
  FileOutlined,
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

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
    { key: "Patrol", icon: <FileOutlined />, label: "Patrol" },
    { key: "Crawling", icon: <HomeOutlined />, label: "Crawling" },
    // { key: "settings", icon: <SettingOutlined />, label: "Settings" },
    // { key: "settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  const entityMenuItems = [
    { key: "users", label: "Users" },
    { key: "posts", label: "Posts" },
    { key: "comments", label: "Comments" },
  ];

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
          onClick={({ key }) => setActiveEntity(key)}
        />
      </div>

      <Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <div className="px-4 py-2">
        <div className="text-gray-500 text-sm">Not Implemented</div>
        {/* <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[activeEntity]}
          // onClick={({ key }) => setActiveEntity(key)}
          items={entityMenuItems}
        /> */}
      </div>

      <Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <div className="px-4 py-2">
        {/* <div className="text-gray-500 text-sm">Controls</div>
        <div className="py-4">
          <Space>
            <Button icon={<PlusOutlined />} />
            <Button icon={<DeleteOutlined />} />
          </Space>
        </div> */}
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
      </div>
    </Sider>
  );
};

export default Sidebar;
