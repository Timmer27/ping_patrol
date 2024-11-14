// ERDDesigner.js
import React, { useState } from "react";
import { Layout, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Sidebar from "../components/Sidebar";
import EditableTable from "../components/EditableTable";
import EditableTableTmp from "../components/EditableTableTmp";

const { Header, Content } = Layout;

export default function MainPage() {
  const [activeEntity, setActiveEntity] = useState("Patrol");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [collapsed, setCollapsed] = useState(false);

  const dropdownItems = [
    { key: "1", label: "Save Diagram" },
    { key: "2", label: "Export as PNG" },
    { key: "3", label: "Share" },
  ];

  return (
    <Layout className="h-screen">
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
            TITLE:{" "}
            {activeEntity.charAt(0).toUpperCase() + activeEntity.slice(1)}
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
          <div
            className="h-[calc(100vh-8rem)] w-full overflow-auto bg-white p-4 rounded-lg border"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top left",
            }}
          >
            {activeEntity === "Patrol" ? (
              <EditableTableTmp />
            ) : (
              <EditableTable />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
