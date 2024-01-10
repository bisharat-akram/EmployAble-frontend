import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  notification,
  Row,
  Col,
  Spin,
  Radio,
} from "antd";
import { getApiWithAuth } from "../utilis/api";
import UserEmployment from "../UserEmployment";
import UserEducation from "../UserEducation";
import { patchApiWithAuth } from "../utilis/api";
import { useNavigate } from "react-router";
import { deleteToken } from "../utilis/localStorage";
import "./UserProfile.css";

import { LoadingOutlined } from "@ant-design/icons";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: "white",
    }}
    spin
  />
);

const UserProfile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [jobList, setJobList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [employment, setEmployment] = useState({});
  const [education, setEducation] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [HighestEduData, setHighestEduData] = useState(false);
  const [addNewEdu, setAddnewEdu] = useState(false);
  const [addNewEmp, setAddnewEmp] = useState(false);
  const [showcriminalValue, setShowCriminalValue] = useState(false);
  const [showEmployment, setShowEmployment] = useState(false);
  const navigate = useNavigate();

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

  const criminalRecord = [
    {
      id: 1,
      name: "Misdemeanor",
    },
    { id: 2, name: "Felony" },
  ];

  const jobListApi = async () => {
    setisLoading(true);
    const response = await getApiWithAuth("jobs");
    setJobList(response?.data);
    setisLoading(false);
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
    setisLoading(true);
    const response = await getApiWithAuth("skills");
    setSkillList(response?.data);
    setisLoading(false);
    if (!response.success) {
      notification.error({
        message: "Error",
        description: response.message?.data?.error,
        placement: "topLeft",
      });
      return;
    }
  };
  const handleFormValuesChange = (changedValues) => {
    const editedFieldName = Object.keys(changedValues)[0];
    if (editedFieldName === "prior_highest_education") {
      if (changedValues[editedFieldName] > 2) {
        setHighestEduData(true);
      } else {
        setHighestEduData(false);
      }
    }
    if (
      editedFieldName === "first_name" ||
      editedFieldName === "last_name" ||
      editedFieldName === "email"
    ) {
      setUpdateUser({
        ...updateUser,
        user: {
          ...updateUser.user,
          [editedFieldName]: changedValues[editedFieldName],
        },
      });
    } else {
      setUpdateUser({
        ...updateUser,
        [editedFieldName]: changedValues[editedFieldName],
      });
    }
    setIsEditing(true);
  };

  const userDataAPI = async () => {
    setisLoading(true);
    const response = await getApiWithAuth("profile");
    setIsEditing(false);

    setUserData(response?.data);
    form.setFieldsValue({
      first_name: response.data?.user?.first_name,
      last_name: response.data?.user?.last_name,
      email: response.data?.user?.email,
      phone_number: response.data?.phone_number,
      description: response.data?.description,
      skills: response?.data?.skills,
      interested_jobs: response?.data?.interested_jobs,
      prior_highest_education: response?.data?.prior_highest_education,
      employment_history: response?.data?.employment_history,
      criminal_conviction: response?.data?.criminal_conviction,
    });
    if (response?.data?.prior_highest_education > 2) {
      setHighestEduData(true);
    }

    setisLoading(false);
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
    userDataAPI();
    skillListApi();
    jobListApi();
  }, []);

  const handleEditClick = async () => {
    setisLoading(true);
    const response = await patchApiWithAuth("profile", updateUser);
    setisLoading(false);
    if (!response.success) {
      notification.error({
        message: "Error",
        description: response.message?.data?.error,
        placement: "topLeft",
      });
      return;
    }
    notification.success({
      message: "Success",
      description: "Updated Successfully",
      placement: "topLeft",
    });
    userDataAPI();
  };

  const handleLogoutSuccess = () => {
    deleteToken();
    navigate("/signin");
  };

  return (
    <>
      {" "}
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 className="headingStyle">User Profile</h1>
          </div>

          <div>
            <Button type="primary" onClick={handleLogoutSuccess}>
              Logout
            </Button>
          </div>
        </div>
        <Form
          className="userProfileContainer"
          form={form}
          name="user-profile-form"
          onFinish={handleEditClick}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onValuesChange={handleFormValuesChange}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="first_name"
                label={<span className="labelStyling">First Name</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter your first name",
                  },
                ]}
              >
                <Input className="editInputStyling" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name"
                label={<span className="labelStyling">Last Name</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter your last name",
                  },
                ]}
              >
                <Input className="editInputStyling" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="email"
                label={<span className="labelStyling">Email</span>}
                rules={[
                  {
                    type: "email",
                    message: "Invalid email address",
                  },
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input className="editInputStyling" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label={<span className="labelStyling">Phone Number</span>}
                rules={[
                  {
                    pattern: /^\+?1?\d{9,15}$/,
                    message: "Invalid phone number",
                  },
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
              >
                <Input className="editInputStyling" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="description"
                label={<span className="labelStyling">Description</span>}
                rules={[]}
              >
                <Input.TextArea className="editInputStyling" rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="skills"
                label={<span className="labelStyling">Skills</span>}
                rules={[
                  {
                    required: true,
                    message: "Please select your skills",
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Select skills">
                  {skillList?.map((skill) => (
                    <Select.Option key={skill.id} value={skill.id}>
                      {skill.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="interested_jobs"
                label={<span className="labelStyling">Interested Jobs</span>}
                rules={[
                  {
                    required: true,
                    message: "Please select jobs",
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Select jobs">
                  {jobList?.map((job) => (
                    <Select.Option key={job.id} value={job.id}>
                      {job.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="prior_highest_education"
                label={<span className="labelStyling">Highest Education</span>}
                rules={[
                  {
                    required: true,
                    message: "Please select your highest education",
                  },
                ]}
              >
                <Select placeholder="Select highest education">
                  {highestEducation?.map((edu) => (
                    <Select.Option key={edu.id} value={edu.id}>
                      {edu.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {userData?.education_history?.length > 0 ? (
            <div className="labelStyling" style={{ marginBottom: "10px" }}>
              Education History
            </div>
          ) : (
            ""
          )}
          {userData?.education_history?.length === 0
            ? ""
            : userData?.education_history?.map((educationItem, index) => (
                <UserEducation
                  key={index}
                  education={education}
                  setEducation={setEducation}
                  educationItem={educationItem}
                  userDataAPI={userDataAPI}
                  newEdu={false}
                  updateUserProfile={handleEditClick}
                />
              ))}
          {addNewEdu ? (
            <>
              {" "}
              {userData?.education_history?.length === 0 ? (
                <div className="labelStyling" style={{ marginBottom: "10px" }}>
                  Education History
                </div>
              ) : (
                ""
              )}
              <UserEducation
                key={2}
                education={education}
                setEducation={setEducation}
                userDataAPI={userDataAPI}
                setAddnewEdu={setAddnewEdu}
                newEdu={true}
                updateUserProfile={handleEditClick}
              />
            </>
          ) : (
            ""
          )}
          {HighestEduData ? (
            <Row gutter={[16, 16]}>
              <Col
                span={24}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginBottom: "15px",
                }}
              >
                <Button type="primary" onClick={() => setAddnewEdu(true)}>
                  Add education +
                </Button>
              </Col>
            </Row>
          ) : (
            ""
          )}
          {!showcriminalValue && userData?.criminal_conviction == null ? (
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div>
                  <div className="labelStyling">
                    Do you have any criminal convictions?
                  </div>
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Radio.Group
                      onChange={(e) => {
                        if (e.target.value == "true") {
                          setShowCriminalValue(true);
                        }
                      }}
                    >
                      <Row>
                        <Col span={12}>
                          <Radio value="true">Yes</Radio>
                        </Col>
                        <Col span={12}>
                          <Radio value="false">No</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  name="criminal_conviction"
                  label={
                    <span className="labelStyling">
                      What is the highest level of convictions?
                    </span>
                  }
                >
                  <Select placeholder="Select ">
                    {criminalRecord?.map((cri) => (
                      <Select.Option key={cri.id} value={cri.id}>
                        {cri.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          {userData?.employment_history?.length > 0 ? (
            <div className="labelStyling" style={{ marginBottom: "10px" }}>
              Employment History
            </div>
          ) : (
            ""
          )}
          {userData?.employment_history?.length === 0
            ? ""
            : userData?.employment_history?.map((employmentItem, index) => (
                <>
                  <UserEmployment
                    key={index}
                    employment={employment}
                    setEmployment={setEmployment}
                    employmentItem={employmentItem}
                    userDataAPI={userDataAPI}
                    newEmp={false}
                    updateUserProfile={handleEditClick}
                  />
                </>
              ))}
          {addNewEmp ? (
            <>
              {userData?.employment_history?.length === 0 ? (
                <div className="labelStyling" style={{ marginBottom: "10px" }}>
                  Employment History
                </div>
              ) : (
                ""
              )}
              <UserEmployment
                key={1}
                employment={employment}
                setEmployment={setEmployment}
                userDataAPI={userDataAPI}
                newEmp={true}
                updateUserProfile={handleEditClick}
              />
            </>
          ) : (
            ""
          )}
          {!showEmployment && userData?.employment_history?.length === 0 ? (
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div>
                  <div className="labelStyling">
                    Do you have any prior employment experience?
                  </div>
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Radio.Group
                      onChange={(e) => {
                        if (e.target.value == "true") {
                          setShowEmployment(true);
                        }
                      }}
                    >
                      <Row>
                        <Col span={12}>
                          <Radio value="true">Yes</Radio>
                        </Col>
                        <Col span={12}>
                          <Radio value="false">No</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row gutter={[16, 16]}>
              <Col
                span={24}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginBottom: "15px",
                }}
              >
                <Button type="primary" onClick={() => setAddnewEmp(true)}>
                  Add employment +
                </Button>
              </Col>
            </Row>
          )}
          <Form.Item
            wrapperCol={{ span: 24 }}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isEditing}
              isLoading
            >
              {isLoading ? <Spin indicator={antIcon} /> : <>Save</>}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UserProfile;
