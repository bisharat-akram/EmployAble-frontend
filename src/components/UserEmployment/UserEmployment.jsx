import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Row, Col, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteApiWithAuth, postApiWithAuth } from "../utilis/api";
import moment from "moment";
const UserEmployment = ({
  userData,
  employment,
  setEmployment,
  employmentItem,
}) => {
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
    if (employmentItem) {
      form.setFieldsValue({
        employer_name: employmentItem.employer_name,
        position: employmentItem.position,
        // start_date: moment(employmentItem.start_date).format(
        //   "YYYY-MM-DDTHH:mm:ss[Z]"
        // ),
        // end_date: moment(employmentItem.end_date).format(
        //   "YYYY-MM-DDTHH:mm:ss[Z]"
        // ),
      });
    }
  }, [employmentItem]);

  const handleFormValuesChange = (changedValues) => {
    const editedFieldName = Object.keys(changedValues)[0];
    const formattedStartDate = moment(changedValues.start_date).format(
      "YYYY-MM-DD"
    );
    const formattedEndDate = moment(changedValues.end_date).format(
      "YYYY-MM-DD"
    );
    if (editedFieldName === "start_date" || editedFieldName === "end_date") {
      setEmployment({
        ...employment,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });
    } else {
      setEmployment({
        ...employment,
        [editedFieldName]: changedValues[editedFieldName],
      });
    }
  };
  const deleteEmployment = async () => {
    const response = await deleteApiWithAuth(
      `employment/${employmentItem?.id}`
    );
    console.log("re=========", response);
  };
  const saveEmployment = async () => {
    const response = await postApiWithAuth("employment/", employment);
    console.log("re=========", response);
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
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={deleteEmployment}
        >
          Delete
        </Button>
        <Button type="danger" onClick={saveEmployment}>
          Save
        </Button>
      </Form>
    </>
  );
};
export default UserEmployment;
