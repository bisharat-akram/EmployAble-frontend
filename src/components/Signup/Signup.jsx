import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  // Alert,
  notification,
  Spin,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./Signup.css";
import { useState } from "react";
import { postApiWithoutAuth } from "../utilis/api";
import { useNavigate } from "react-router";
import { setToken } from "../utilis/localStorage";
import { GoogleLogin } from '@react-oauth/google';
// import { useSnackbar } from "notistack";
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

const { Title, Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onFinish = async (values) => {
    setisLoading(true);
    const response = await postApiWithoutAuth("signup/", data);
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
      description: "Signup Successfully",
      placement: "topLeft",
    });

    setToken(response.data.data.access);
    navigate("/user");
  };

  const responseGoogle = async (res) => {
    setisLoading(true);
    const response = await postApiWithoutAuth("google-login/", {
      access_token: res.credential,
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
    setToken(response.data.data.access);
    notification.success({
      message: "Success",
      description: "Signup Successfully",
      placement: "topLeft",
    });
    navigate("/user");
  };

  return (
    <div className="SignupMainContainerStyle">
      <Card className="SignupCardContainerStyle">
        <Title level={3}>Sign Up</Title>
        <Form name="signup" onFinish={onFinish}>
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please enter your first name!",
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined />}
              placeholder="First Name"
              className="InputStyle"
              name="first_name"
              value={data.first_name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please enter your last name!",
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined />}
              placeholder="Last Name"
              className="InputStyle"
              name="last_name"
              value={data.last_name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="Email"
              className="InputStyle"
              name="email"
              value={data.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="InputStyle"
              name="password"
              value={data.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<CheckCircleOutlined />}
              placeholder="Confirm Password"
              className="InputStyle"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="SignupStyle"
            >
              {isLoading ? <Spin indicator={antIcon} /> : <>Sign Up</>}
            </Button>
          </Form.Item>
        </Form>
        <Text>
          Already have an account? <a href="/">Sign in</a>
        </Text>
        <div className="OrContainerStyle">
          <div className="HorizontalLine"></div>
          Or
          <div className="HorizontalLine"></div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <GoogleLogin
            text="Login with Google"
            flow="auth-code"
            className="GoogleAuthStyle"
            width="400"
            onSuccess={responseGoogle}
          />
        </div>
      </Card>
    </div>
  );
};
export default Signup;
