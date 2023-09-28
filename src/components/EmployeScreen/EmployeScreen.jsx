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
  const [jobList, setJobList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [filters, setFilters] = useState({});

  const highestEducation = [
    {
      id: 1,
      name: "Less than GED",
    },
    { id: 2, name: "GED" },
    { id: 3, name: "Some college" },
    { id: 4, name: "Associate`s" },
    { id: 5, name: "Bachelor`s" },
    { id: 6, name: "Master`s" },
    { id: 7, name: "Doctoral" },
  ];
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };
  const handleSearch = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ["search"]: value,
    }));
  };

  const getProfileData = async (value, type) => {
    const queryString = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join("&");
    const url = `profiles?${queryString}`;
    const res = await getApiWithAuth(url);
    console.log("======>", url);
    console.log("======>", url);
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

  const jobListApi = async () => {
    const response = await getApiWithAuth("jobs");
    setJobList(response?.data);
    if (!response.success) {
      notification.error({
        message: "Error",
        description: response.message?.data?.error,
        placement: "topLeft",
      });
      return;
    }
  };

  const skillListApi = async () => {
    const response = await getApiWithAuth("skills");
    setSkillList(response?.data);
    if (!response.success) {
      notification.error({
        message: "Error",
        description: response.message?.data?.error,
        placement: "topLeft",
      });
      return;
    }
  };
  useEffect(() => {
    skillListApi();
    jobListApi();
  }, []);
  useEffect(() => {
    getProfileData();
  }, [filters]);
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
                  mode="multiple"
                  placeholder="Select skills"
                  onChange={(value) => handleSelectChange(value, "skills")}
                  style={{ width: 400, marginTop: 10 }}
                >
                  {skillList?.map((skill) => (
                    <Select.Option key={skill.id} value={skill.id}>
                      {skill.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="dropdown">
                <div className="labelStyling">Interested Jobs</div>
                <Select
                  mode="multiple"
                  placeholder="Select jobs"
                  onChange={(value) =>
                    handleSelectChange(value, "interested_jobs")
                  }
                  style={{ width: 400, marginTop: 10 }}
                >
                  {jobList?.map((job) => (
                    <Select.Option key={job.id} value={job.id}>
                      {job.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="dropdown">
                <div className="labelStyling">Highest Education Level</div>
                <Select
                  placeholder="Select education"
                  onChange={(value) =>
                    handleSelectChange(value, "prior_highest_education")
                  }
                  style={{ width: 400, marginTop: 10 }}
                >
                  {highestEducation?.map((edu) => (
                    <Select.Option key={edu.id} value={edu.id}>
                      {edu.name}
                    </Select.Option>
                  ))}
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
            <Descriptions.Item label="Highest Education">Ali</Descriptions.Item>
            <Descriptions.Item label="Interested Jobs">
              ali@gmail.com
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">00000</Descriptions.Item>
          </Descriptions>
        </Modal>
      </div>
    </>
  );
};
export default EmployeScreen;
