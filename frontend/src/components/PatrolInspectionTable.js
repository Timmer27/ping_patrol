import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table, Badge, Dropdown, Space } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

const PatrolInspectionTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  const { id } = useParams();

  const dropdownItems = [
    { key: "1", label: "Target Valid Id Avaliable" },
    { key: "2", label: "Patrol Done" },
    { key: "3", label: "Ongoing" },
    { key: "4", label: "Total" },
  ];

  const [selectedDropdown, setSelectedDropdown] = useState(dropdownItems[0]);

  useEffect(() => {
    // Fetch data from the endpoint when the component mounts
    axios
      .get(`http://localhost:8000/api/v1/car/inspection_list/${id}`)
      .then((response) => {
        // Update the data source with the fetched data
        setDataSource(response.data);
        setCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching inspection data:", error);
      });
  }, []);

  const columns = [
    {
      title: "description",
      dataIndex: "description",
    },
    {
      title: "target_id",
      dataIndex: "target_id",
      editable: true,
    },
    {
      title: "target_valid_id",
      dataIndex: "target_valid_id",
    },
    {
      title: "status",
      dataIndex: "status",
      render: () => <Badge status="success" text="Finished" />,
      // render: () => <Badge status="fail" text="Ongoing" />,
    },
    {
      title: "updated_at",
      dataIndex: "updated_at",
    },
  ];

  return (
    <div>
      <Dropdown
        menu={{ items: dropdownItems }}
        trigger={["click"]}
        // onClick={(e) => {
        //   console.log(e);
        // }}
        disabled
        className="flex self-end mb-3"
      >
        <Button>
          <Space>
            {selectedDropdown.label}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Table columns={columns} dataSource={dataSource} bordered />
    </div>
  );
};

export default PatrolInspectionTable;
