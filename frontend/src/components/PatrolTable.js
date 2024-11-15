import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table, Badge } from "antd";
import axios from "axios";
// import { useHistory } from "react-router-dom"; // Import useHistory for navigation
import { useNavigate, useParams } from "react-router-dom";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingInlineEnd: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const PatrolTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  // const history = useHistory();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/car/inspection_list")
      .then((response) => {
        setDataSource(response.data);
        setCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching inspection data:", error);
      });
  }, []);

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const columns = [
    {
      title: "car_english_name",
      dataIndex: "car_english_name",
    },
    {
      title: "description",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "patrolled_target_count",
      dataIndex: "patrolled_target_count",
    },
    {
      title: "total_patrolled_target_count",
      dataIndex: "total_patrolled_target_count",
    },
    {
      title: "hit_pct",
      dataIndex: "hit_pct",
      render: (_, record) => `${(record.hit_pct * 100).toString()}%`
    },
    {
      title: "status",
      dataIndex: "status",
      render: (_, record) => {
        console.log("re", record);
        if (record.hit_pct !== 1) {
          return <Badge color="orange" text="Ongoing" />;
        } else {
          return <Badge status="success" text="Finished" />;
        }
      },
    },
  ].map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        onRow={(record) => ({
          onClick: () => {
            navigate(`/patrol/${record.inspection_site_id}`);
          },
        })}
      />
    </div>
  );
};

export default PatrolTable;
