// Login.js
import React from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Spin,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./SignInStyle.css"; // Import your CSS file for login styles
import { useState } from "react";
import { postApiWithoutAuth, getApiWithAuth } from "../utilis/api";
import { useNavigate } from "react-router";
import { setToken } from "../utilis/localStorage";
import { LoadingOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import ReactGA from "react-ga4";

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
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
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
    const response = await postApiWithoutAuth("login/", data);
    if (!response.success) {
      setisLoading(false);
      notification.error({
        message: "Error",
        description: response.message?.data?.error,
        placement: "topLeft",
      });
      return;
    }
    setToken(response.data.data.access);
    userData();
  };

  const userData = async () => {
    setisLoading(true);
    const response = await getApiWithAuth("me");
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
      description: "Login Successfully",
      placement: "topLeft",
    });
    if (response?.data?.user_type === 1) {
      navigate("/user");
    } else {
      navigate("/employe");
    }
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
      description: "Login Successfully",
      placement: "topLeft",
    });
    navigate("/user");
  };

  return (
    <div className="LoginMainContainerStyle">
      <Card className="LoginCardContainerStyle">
        <Title level={3}>Sign In</Title>
        <Form name="login" onFinish={onFinish}>
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
              prefix={<UserOutlined />}
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="LoginStyle"
            >
              {isLoading ? <Spin indicator={antIcon} /> : <> Sign In</>}
            </Button>
          </Form.Item>
        </Form>
        <Text>
          Don't have an account? <a href="signup">Sign up</a>
        </Text>
        <div className="OrContainerStyle">
          <div className="HorizontalLine"></div>
          Or
          <div className="HorizontalLine"></div>
        </div>
        <GoogleLogin
          text="Login with Google"
          flow="auth-code"
          className="GoogleAuthStyle"
          width="400"
          onSuccess={responseGoogle}
        />
      </Card>
    </div>
  );
};

export default SignIn;
