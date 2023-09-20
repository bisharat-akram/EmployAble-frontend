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
} from "antd";
import { getApiWithAuth } from "../utilis/api";
import UserEmployment from "../UserEmployment";
import UserEducation from "../UserEducation";
import { patchApiWithAuth } from "../utilis/api";
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
      field_name: response?.data?.field_name,
      skills: response?.data?.skills,
      interested_jobs: response?.data?.interested_jobs,
      prior_highest_education: response?.data?.prior_highest_education,
      employment_history: response?.data?.employment_history,
    });
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

  return (
    <>
      {" "}
      <div style={{ width: "100%" }}>
        <h1 className="headingStyle">User Profile</h1>
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
            <Col span={12}>
              <Form.Item
                name="field_name"
                label={<span className="labelStyling">Field Name</span>}
              >
                <Input.TextArea className="editInputStyling" rows={4} />
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
      <h1 className="headingStyle">Employment Data</h1>
      {userData?.employment_history?.length === 0
        ? ""
        : userData?.employment_history?.map((employmentItem, index) => (
            <UserEmployment
              key={index}
              employment={employment}
              setEmployment={setEmployment}
              employmentItem={employmentItem}
              userDataAPI={userDataAPI}
              newEmp={false}
            />
          ))}
      <UserEmployment
        key={1}
        employment={employment}
        setEmployment={setEmployment}
        userDataAPI={userDataAPI}
        newEmp={true}
      />
      <h1 className="headingStyle">Education Data</h1>
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
            />
          ))}
      <UserEducation
        key={2}
        education={education}
        setEducation={setEducation}
        userDataAPI={userDataAPI}
        newEdu={true}
      />
    </>
  );
};

export default UserProfile;
