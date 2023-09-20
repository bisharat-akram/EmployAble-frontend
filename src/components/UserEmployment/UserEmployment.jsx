import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  notification,
  Spin,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  deleteApiWithAuth,
  postApiWithAuth,
  getApiWithAuth,
} from "../utilis/api";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
const UserEmployment = ({
  newEmp,
  employment,
  setEmployment,
  employmentItem,
  userDataAPI,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setisLoading] = useState(false);
  const [isDeleteLoading, setisDeleteLoading] = useState(false);

  useEffect(() => {
    if (employmentItem) {
      console.log("------------", employmentItem.start_date);
      form.setFieldsValue({
        employer_name: employmentItem.employer_name,
        position: employmentItem.position,
        start_date: dayjs(new Date(employmentItem?.start_date)),
        end_date: dayjs(new Date(employmentItem.end_date)),
      });
    }
  }, [employmentItem]);

  const handleFormValuesChange = (changedValues) => {
    const editedFieldName = Object.keys(changedValues)[0];
    if (editedFieldName === "start_date" || editedFieldName === "end_date") {
      const formattedDate = changedValues[editedFieldName].format("YYYY-MM-DD")
      setEmployment({
        ...employment,
        [editedFieldName]: formattedDate
      });
    } else {
      setEmployment({
        ...employment,
        [editedFieldName]: changedValues[editedFieldName],
      });
    }
  };
  const deleteEmployment = async () => {
    setisDeleteLoading(true);
    const response = await deleteApiWithAuth(
      `employment/${employmentItem?.id}`
    );
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

  const saveEmployment = async () => {
    if ((new Date(employment.start_date)) > (new Date(employment.end_date))) {
      notification.error({
        message: "Error",
        description: "End date should be greater than the start date",
        placement: "topLeft",
      });
      return;
    }
    setisLoading(true);
    const response = await postApiWithAuth("employment/", employment);
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
        {!newEmp ? (
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={deleteEmployment}
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
        {newEmp ? (
          <Button type="primary" onClick={saveEmployment}>
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
export default UserEmployment;
