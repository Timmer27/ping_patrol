// LayoutWrapper.js
import React, { useState } from "react";
import { Button, Dropdown, Layout, Space } from "antd";
import Sidebar from "../components/Sidebar";
import { Outlet, useParams } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

export default function LayoutWrapper() {
  const [activeEntity, setActiveEntity] = useState("Patrol");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [collapsed, setCollapsed] = useState(false);

  const dropdownItems = [
    { key: "1", label: "Save Diagram" },
    { key: "2", label: "Export as PNG" },
    { key: "3", label: "Share" },
  ];

  return (
    <Layout className="h-screen min-h-[52rem]">
      {/* Sidebar will stay fixed across all pages */}
      <Sidebar
        activeEntity={activeEntity}
        setActiveEntity={setActiveEntity}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout>
        <Header className="bg-white px-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            ERP: {activeEntity.charAt(0).toUpperCase() + activeEntity.slice(1)}
          </h1>
          <Dropdown
            menu={{ items: dropdownItems }}
            trigger={["click"]}
            disabled
          >
            <Button>
              <Space>
                Actions - not implemented
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Header>

        <Content className="p-6 bg-gray-100">
          {/* Outlet renders the nested route's element */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
