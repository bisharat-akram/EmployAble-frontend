import { Form, Input, Button, Typography, Card } from "antd";
import {
  LockOutlined,
  MailOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./Signup.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState } from "react";
import { postApiWithoutAuth } from "../utilis/api";
import { useNavigate } from "react-router";
const { Title, Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();
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
    console.log("Received values:", values);
    // setisLoading(true);
    const response = await postApiWithoutAuth("signup/", data);
    if (!response.success) {
      // setisLoading(false);
      // enqueueSnackbar(response.error.message, {
      //   variant: "error",
      // });
      console.log("========hello");
      return;
    }
    console.log("========bye");
    navigate("/signin");
    // enqueueSnackbar("Sign Up Successful", {
    //   variant: "info",
    // });
    // setisLoading(false);
    // setToken(response.data.data.token);
    // history.push("./personalinfo");
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Handle Google login response here
  };

  const handleLogoutSuccess = () => {
    // Perform logout-related actions here
    console.log("User logged out successfully");
    // You may want to clear user data and update the UI
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
              Sign Up
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
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            className="GoogleAuthStyle"
          />
        </div>
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogoutSuccess}
        />
      </Card>
    </div>
  );
};
export default Signup;
