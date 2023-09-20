import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Select,
  notification,
  Spin,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteApiWithAuth, postApiWithAuth } from "../utilis/api";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: "white",
    }}
    spin
  />
);

const UserEducation = ({
  newEdu,
  education,
  setEducation,
  educationItem,
  userDataAPI,
}) => {
  const [form] = Form.useForm();
  const [isDeleteLoading, setisDeleteLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const degreeType = [
    { id: 1, name: "High School" },
    { id: 2, name: "Bachelor’s" },
  ];

  useEffect(() => {
    if (educationItem) {
      form.setFieldsValue({
        university_name: educationItem.university_name,
        major: educationItem.major,
        start_date: dayjs(new Date(educationItem.start_date)),
        end_date: dayjs(new Date(educationItem.end_date)),
        degree_type: educationItem.degree_type,
      });
    }
  }, [educationItem]);

  const handleFormValuesChange = (changedValues) => {
    const editedFieldName = Object.keys(changedValues)[0];
    if (editedFieldName === "start_date" || editedFieldName === "end_date") {
      const formattedDate = changedValues[editedFieldName]?.format('YYYY-MM-DD');
      setEducation({
        ...education,
        [editedFieldName]: formattedDate
      });
    } else {
      setEducation({
        ...education,
        [editedFieldName]: changedValues[editedFieldName],
      });
    }
  };
  const saveEducation = async () => {
    if ((new Date(education.start_date)) > (new Date(education.end_date))) {
      notification.error({
        message: "Error",
        description: "End date should be greater than the start date",
        placement: "topLeft",
      });
      return;
    }
    setisLoading(true);
    const response = await postApiWithAuth("education/", education);
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
    form.resetFields();
    userDataAPI();
  };

  const deleteEducation = async () => {
    setisDeleteLoading(true);
    const response = await deleteApiWithAuth(`education/${educationItem?.id}`);
    setisDeleteLoading(false);
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
      description: "Deleted Successfully",
      placement: "topLeft",
    });
    userDataAPI();
  };
  return (
    <>
      <Form
        className="userProfileContainer"
        form={form}
        name="user-profile-form"
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
              <Input className="editInputStyling" />
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
              <DatePicker className="editInputStyling" format="YYYY-MM-DD" disabledDate={ date => date.isAfter(new Date())}/>
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
              <DatePicker className="editInputStyling" format="YYYY-MM-DD" disabledDate={ date => date.isAfter(new Date())}/>
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
        {!newEdu ? (
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={deleteEducation}
            style={{ marginRight: "10px" }}
          >
            {isDeleteLoading ? (
              <Spin indicator={antIcon} style={{ color: "red" }} />
            ) : (
              <>Delete</>
            )}
          </Button>
        ) : (
          ""
        )}
        {newEdu ? (
          <Button type="primary" onClick={saveEducation}>
            {isLoading ? (
              <Spin indicator={antIcon} style={{ color: "white" }} />
            ) : (
              <>Save</>
            )}
          </Button>
        ) : (
          ""
        )}
      </Form>
    </>
  );
};
export default UserEducation;
