import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table, Badge } from "antd";
import axios from "axios";

const EditableTableTmp = () => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fetch data from the endpoint when the component mounts
    axios
      .get("http://localhost:8000/api/v1/car/inspection_list/14")
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
    dataSource.length > 0 && (
      <div>
        <Table
          // className={styles.customTable}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 30 }} // Set the number of rows per page
          bordered
          // pagination={{
          //   pageSize: count,
          // }}
          // scroll={{
          //   y: 55 * 5,
          // }}
        />
      </div>
    )
  );
};

export default EditableTableTmp;
