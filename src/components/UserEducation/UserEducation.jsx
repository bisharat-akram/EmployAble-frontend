import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Row, Col, Button, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteApiWithAuth, postApiWithAuth } from "../utilis/api";
import moment from "moment";

const UserEducation = ({
  userData,
  education,
  setEducation,
  educationItem,
}) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const degreeType = [
    { id: 1, name: "High School" },
    { id: 2, name: "Bachelor’s" },
  ];
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
    if (educationItem) {
      form.setFieldsValue({
        university_name: educationItem.university_name,
        major: educationItem.major,
        // start_date: educationItem.start_date,
        // end_date: educationItem.end_date,
        degree_type: educationItem.degree_type,
      });
    }
  }, [educationItem]);

  const handleFormValuesChange = (changedValues) => {
    const editedFieldName = Object.keys(changedValues)[0];
    const formattedStartDate = moment(changedValues.start_date).format(
      "YYYY-MM-DD"
    );
    const formattedEndDate = moment(changedValues.end_date).format(
      "YYYY-MM-DD"
    );
    if (editedFieldName === "start_date" || editedFieldName === "end_date") {
      setEducation({
        ...education,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });
    } else {
      setEducation({
        ...education,
        [editedFieldName]: changedValues[editedFieldName],
      });
    }
  };
  const saveEducation = async () => {
    const response = await postApiWithAuth("education/", education);
    console.log("re=========", response);
  };
  const deleteEducation = async () => {
    const response = await deleteApiWithAuth(`education/${educationItem?.id}`);
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
        <Row gutter={[16, 16]}>
          <Col style={{ width: "370px" }}>
            <Form.Item
              name="degree_type"
              label={<span className="labelStyling">Degree</span>}
              rules={[
                {
                  required: true,
                  message: "Please select your degree",
                },
              ]}
            >
              <Select placeholder="Select degree">
                {degreeType?.map((deg) => (
                  <Select.Option key={deg.id} value={deg.id}>
                    {deg.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={deleteEducation}
        >
          Delete
        </Button>
        <Button type="danger" onClick={saveEducation}>
          Save
        </Button>
      </Form>
    </>
  );
};
export default UserEducation;
