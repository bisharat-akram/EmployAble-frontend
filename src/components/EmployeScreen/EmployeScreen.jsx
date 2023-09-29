import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router";
import { deleteToken } from "../utilis/localStorage";
import "./EmployeScreen.css";
import { getApiWithAuth } from "../utilis/api";
import { useEffect, useState } from "react";
import {
  Descriptions,
  notification,
  Modal,
  Select,
  Input,
  Table,
  Button,
  Spin,
} from "antd";

const { Option } = Select;
const { Search } = Input;

const EmployeScreen = () => {
  const navigate = useNavigate();
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingModal, setisLoadingModal] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [detail, setDetail] = useState([]);
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

  const showModal = async (id) => {
    setisLoadingModal(true);
    const res = await getApiWithAuth(`profiles/${id}`);
    setDetail(res?.data);
    if (!res.success) {
      setisLoadingModal(false);
      notification.error({
        message: "Error",
        description: res.message?.data?.error,
        placement: "topLeft",
      });
      return;
    }
    setisLoadingModal(false);
    setIsModalVisible(true);
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
    setisLoading(true);
    const queryString = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join("&");
    const url = `profiles?${queryString}`;
    const res = await getApiWithAuth(url);
    setEmployeeInfo(res?.data);
    if (!res.success) {
      setisLoading(false);
      notification.error({
        message: "Error",
        description: res.message?.data?.error,
        placement: "topLeft",
      });
      return;
    }
    setisLoading(false);
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <h1 className="headingStyle">Clients List</h1>
          </div>

          <div>
            <Button type="primary" onClick={handleLogoutSuccess}>
              Logout
            </Button>
          </div>
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
                onClick: () => showModal(record.id),
              })}
              loading={isLoading}
              style={{ cursor: "pointer" }}
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
                  style={{ width: 380, marginTop: 10 }}
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
                  style={{ width: 380, marginTop: 10 }}
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
                  style={{ width: 380, marginTop: 10 }}
                >
                  {highestEducation?.map((edu) => (
                    <Select.Option key={edu.id} value={edu.id}>
                      {edu.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="dropdown">
                <div className="labelStyling">Education</div>
                <Input
                  onChange={(value) => handleSelectChange(value, "education")}
                  placeholder="Enter education e.g (Univerisity xyx, Bachelor's etc)"
                  style={{ width: 380, marginTop: 10, height: "50px" }}
                  name="education"
                />
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Employer"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spin size="large" />{" "}
              {/* Render a spinner if isLoading is true */}
            </div>
          ) : (
            <>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="First Name">
                  {detail?.user?.first_name}
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  {detail?.user?.last_name}
                </Descriptions.Item>
                <Descriptions.Item label="User Name">
                  {detail?.user?.username}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number">
                  {detail?.phone_number}
                </Descriptions.Item>
                <Descriptions.Item label="Criminal Conviction">
                  {detail?.criminal_conviction}
                </Descriptions.Item>
                <Descriptions.Item label="Prior Highest Education">
                  {detail?.prior_highest_education}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {detail?.user?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                  {detail?.description}
                </Descriptions.Item>
              </Descriptions>
              <h3>Skills</h3>
              {detail?.skills?.map((data, i) => (
                <Descriptions bordered column={1}>
                  <Descriptions.Item label={i + 1}>
                    {data?.name}
                  </Descriptions.Item>
                </Descriptions>
              ))}
              <h3>Interested Jobs</h3>
              {detail?.interested_jobs?.map((data, i) => (
                <Descriptions bordered column={1}>
                  <Descriptions.Item label={i + 1}>
                    {data?.name}
                  </Descriptions.Item>
                </Descriptions>
              ))}
              <h3>Education History</h3>
              {detail?.education_history?.map((data, i) => (
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Major">
                    {data?.major}
                  </Descriptions.Item>
                  <Descriptions.Item label="University Name">
                    {data?.university_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Start Date">
                    {data?.start_date}
                  </Descriptions.Item>
                  <Descriptions.Item label="End Date">
                    {data?.end_date}
                  </Descriptions.Item>
                </Descriptions>
              ))}
              <h3>Employment History</h3>
              {detail?.employment_history?.map((data, i) => (
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Employer Name">
                    {data?.employer_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Position">
                    {data?.position}
                  </Descriptions.Item>
                  <Descriptions.Item label="Start Date">
                    {data?.start_date}
                  </Descriptions.Item>
                  <Descriptions.Item label="End Date">
                    {data?.end_date}
                  </Descriptions.Item>
                </Descriptions>
              ))}
            </>
          )}
        </Modal>
      </div>
    </>
  );
};
export default EmployeScreen;
