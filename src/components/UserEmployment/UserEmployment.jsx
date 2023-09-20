import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Row, Col, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const UserEmployment = ({ userData, employment, setEmployment }) => {
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
      employer_nam: userData.employer_nam,
      position: userData.position,
      start_date: userData.start_date,
      end_date: userData.end_date,
    });
  }, [userData]);

  const handleFormValuesChange = (changedValues) => {
    const editedFieldName = Object.keys(changedValues)[0];
    setEmployment({
      ...employment,
      [editedFieldName]: changedValues[editedFieldName],
    });
  };

  return (
    <>
      <Form
        className="userProfileContainer"
        form={form}
        name="user-profile-form"
        onFinish={handleSave}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onValuesChange={handleFormValuesChange}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="employer_name"
              label={<span className="labelStyling">Employer Name</span>}
              rules={[
                {
                  required: true,
                  message: "Please enter your employer name",
                },
              ]}
            >
              <Input className="editInputStyling" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="position"
              label={<span className="labelStyling">Position</span>}
              rules={[
                {
                  required: true,
                  message: "Please enter your position",
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
                },
              ]}
            >
              <DatePicker className="editInputStyling" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>
        <Button type="danger" icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Form>
    </>
  );
};
export default UserEmployment;
