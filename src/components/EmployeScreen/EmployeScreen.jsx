import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router";
import { deleteToken } from "../utilis/localStorage";
import "./EmployeScreen.css";
import { getApiWithAuth } from "../utilis/api";
import { useEffect, useState } from "react";
import { Descriptions, notification, Modal, Select, Input, Table } from "antd";
// import "antd/dist/antd.css";

const { Option } = Select;
const { Search } = Input;

const EmployeScreen = () => {
  const navigate = useNavigate();
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const columns = [
    {
      title: "First Name",
      dataIndex: "user",
      key: "first_name",
      render: (user) => (user ? user.first_name : "-"),
    },
    {
      title: "Last Name",
      dataIndex: "user",
      key: "last_name",
      render: (user) => (user ? user.last_name : "-"),
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "email",
      render: (user) => (user ? user.email : "-"),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelectChange = (value, type) => {
    console.log(`Selected ${type}:`, value);
  };

  const handleSearch = (value) => {
    console.log("Search term:", value);
  };

  const getProfileData = async () => {
    const res = await getApiWithAuth("profiles");
    setEmployeeInfo(res?.data);
    console.log("========res", res.data);
    if (!res.success) {
      notification.error({
        message: "Error",
        description: res.message?.data?.error,
        placement: "topLeft",
      });
      return;
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  const handleLogoutSuccess = () => {
    console.log("User logged out successfully");
    deleteToken();
    navigate("/");
  };
  return (
    <>
      <div className="EmployeeScreenContainer">
        <div>
          <h1 className="headingStyle">Employee Info</h1>
        </div>
        <div className="EmployeMainContainer">
          <div className="EmployeFilterContainer">
            <div className="searchContainer">
              <Search
                placeholder="Search"
                onSearch={handleSearch}
                enterButton
                style={{ width: "50%", height: "50px" }}
              />
            </div>
            <Table
              columns={columns}
              dataSource={employeeInfo}
              bordered
              pagination={{ pageSize: 10 }}
              onRow={(record) => ({
                onClick: () => showModal(record),
              })}
            />
          </div>
          <div className="EmployeDetailContainer">
            <h2 className="filterbyStyle">Filter By</h2>
            <div className="dropdownsContainer">
              <div className="dropdown">
                <div className="labelStyling">Skills</div>
                <Select
                  placeholder="Select Type"
                  onChange={(value) => handleSelectChange(value, "Type")}
                  style={{ width: 300, marginTop: 10 }}
                >
                  <Option value="type1">Type 1</Option>
                  <Option value="type2">Type 2</Option>
                  {/* ...other options */}
                </Select>
              </div>
              <div className="dropdown">
                <div className="labelStyling">Interested Jobs</div>
                <Select
                  placeholder="Select Type"
                  onChange={(value) => handleSelectChange(value, "Type")}
                  style={{ width: 300, marginTop: 10 }}
                >
                  <Option value="type1">Type 1</Option>
                  <Option value="type2">Type 2</Option>
                  {/* ...other options */}
                </Select>
              </div>
              <div className="dropdown">
                <div className="labelStyling">Highest Education Level</div>
                <Select
                  placeholder="Select Type"
                  onChange={(value) => handleSelectChange(value, "Type")}
                  style={{ width: 300, marginTop: 10 }}
                >
                  <Option value="type1">Type 1</Option>
                  <Option value="type2">Type 2</Option>
                  {/* ...other options */}
                </Select>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Employee Info"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">Ali</Descriptions.Item>
            <Descriptions.Item label="Email">ali@gmail.com</Descriptions.Item>
            <Descriptions.Item label="Phone Number">00000</Descriptions.Item>
          </Descriptions>
        </Modal>
      </div>
    </>
  );
};
export default EmployeScreen;
