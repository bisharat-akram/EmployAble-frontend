import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, notification, Row, Col } from "antd";
import { getApiWithAuth } from "../utilis/api";
import UserEmployment from "../UserEmployment";
import UserEducation from "../UserEducation";
import "./UserProfile.css";

const UserProfile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [jobList, setJobList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [employmentData, setEmploymentData] = useState([{ id: 1 }]);
  const [educationData, setEducationData] = useState([{ id: 1 }]);
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
    console.log("==========>job", response.data);
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
    console.log("==========>skill", response.data);
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

  const userDataAPI = async () => {
    setisLoading(true);
    const response = await getApiWithAuth("profile");
    setUserData(response?.data);
    console.log("==========>", response.data);
    form.setFieldsValue({
      firstName: response.data?.user?.first_name,
      lastName: response.data?.user?.last_name,
      email: response.data?.user?.email,
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.resetFields(); // Reset form fields to their initial values
  };

  const handleSave = (values) => {
    // Handle saving the edited user data here (e.g., send a request to update the user)
    console.log("Edited User Data:", values);
    // setIsEditing(false);
  };

  const handleAddEmployment = () => {
    // Create a new employment object and add it to the employmentData array
    const newEmployment = { id: employmentData.length + 1 }; // Assign a unique ID
    setEmploymentData([...employmentData, newEmployment]);
  };
  const handleAddEducation = () => {
    // Create a new employment object and add it to the employmentData array
    const newEducation = { id: educationData.length + 1 }; // Assign a unique ID
    setEducationData([...educationData, newEducation]);
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
          onFinish={handleSave}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{
            firstName: userData?.user?.first_name,
            lastName: userData?.user?.last_name,
            email: userData?.user?.email,
            description: userData?.description,
            phone_number: userData?.phone_number,
            field_name: userData?.field_name,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="firstName"
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
                name="lastName"
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
                    pattern: /^\+?1?\d{9,15}$/, // Regex pattern for phone number validation
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
                rules={[
                  {
                    required: true,
                    message: "Please enter a description",
                  },
                ]}
              >
                <Input.TextArea
                  className="editInputStyling"
                  rows={4} // Adjust the number of rows as needed
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="field_name"
                label={<span className="labelStyling">Field Name</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter field name",
                  },
                ]}
              >
                <Input.TextArea
                  className="editInputStyling"
                  rows={4} // Adjust the number of rows as needed
                />
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
                  {highestEducation.map((edu) => (
                    <Select.Option key={edu.id} value={edu.name}>
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
                  {skillList.map((skill) => (
                    <Select.Option key={skill.id} value={skill.name}>
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
                  {jobList.map((job) => (
                    <Select.Option key={job.id} value={job.name}>
                      {job.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {isEditing ? (
            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Button type="default" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </Form.Item>
          ) : (
            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button type="primary" onClick={handleEditClick}>
                Edit
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
      <h1 className="headingStyle">Employment Data</h1>
      {employmentData.map((emp) => (
        <UserEmployment key={emp.id} userData={userData} />
      ))}
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <Button type="primary" htmlType="submit" onClick={handleAddEmployment}>
          Add Employment +
        </Button>
      </div>
      <h1 className="headingStyle">Educational Data</h1>
      {educationData.map((education) => (
        <UserEducation key={education.id} userData={userData} />
      ))}
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <Button
          type="primary"
          htmlType="submit"
          //   style={{ marginRight: "10px" }}
          onClick={handleAddEducation}
        >
          Add Education +
        </Button>
      </div>
    </>
  );
};

export default UserProfile;
