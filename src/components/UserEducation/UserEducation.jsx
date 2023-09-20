import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Row, Col } from "antd";

const UserEducation = (userData) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
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
  useEffect(() => {
    form.setFieldsValue({
      university_name: userData.university_name,
      major: userData.major,
      start_date: userData.start_date, // Use moment.js to format date
      end_date: userData.end_date, // Use moment.js to format date
    });
  }, [userData]);

  return (
    <>
      <Form
        className="userProfileContainer"
        form={form}
        name="user-profile-form"
        onFinish={handleSave}
        labelCol={{ span: 24 }} // Set label column to full width (labels on top)
        wrapperCol={{ span: 24 }} // Set wrapper column to full width
        // initialValues={{
        //   firstName: userData?.user?.first_name,
        //   lastName: userData?.user?.last_name,
        //   email: userData?.user?.email,
        // }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="university_name"
              label={<span className="labelStyling">University Name</span>}
              rules={[
                {
                  required: true,
                  message: "Please enter your university name",
                },
              ]}
            >
              <Input
                //   disabled={!isEditing}
                className="editInputStyling"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="major"
              label={<span className="labelStyling">Major</span>}
              rules={[
                {
                  required: true,
                  message: "Please enter your major",
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
              name="start_date"
              label={<span className="labelStyling">Start Date</span>}
              rules={[
                {
                  type: "object",
                  required: true,
                  message: "Please select your start date",
                },
              ]}
            >
              <DatePicker className="editInputStyling" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="end_date"
              label={<span className="labelStyling">End Date</span>}
              rules={[
                {
                  type: "object",
                  required: true,
                  message: "Please select your end date",
                },
              ]}
            >
              <DatePicker className="editInputStyling" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default UserEducation;
