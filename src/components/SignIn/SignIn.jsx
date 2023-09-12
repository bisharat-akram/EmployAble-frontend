// Login.js
import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { GoogleLogin } from "react-google-login";
import "./SignInStyle.css"; // Import your CSS file for login styles
import { useState } from "react";
import { postApiWithoutAuth, getApiWithAuth } from "../utilis/api";
import { useNavigate } from "react-router";
import { setToken } from "../utilis/localStorage";

const { Title, Text } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
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
    console.log("Received values:", values);
    // Handle login form submission here
    const response = await postApiWithoutAuth("login/", data);
    console.log("==========", response);
    if (!response.success) {
      // setisLoading(false);
      // enqueueSnackbar(response.error.message, {
      //   variant: "error",
      // });
      console.log("========hello");
      return;
    }
    console.log("========bye");
    // navigate("/");
    // enqueueSnackbar("Sign Up Successful", {
    //   variant: "info",
    // });
    // setisLoading(false);

    setToken(response.data.data.access);
    userData();

    // history.push("./personalinfo");
  };

  const userData = async () => {
    const response = await getApiWithAuth("me");
    console.log("res==========", response);
    if (!response.success) {
      // setisLoading(false);
      // enqueueSnackbar(response.error.message, {
      //   variant: "error",
      // });
      console.log("========hello");
      return;
    }
    console.log("========hello", response?.data?.user_type);
    if (response?.data?.user_type == 1) {
      console.log("1111");
      navigate("/user");
    } else {
      console.log("2222");

      navigate("/employe");
    }
  };
  const responseGoogle = (response) => {
    console.log(response?.data?.user_type);

    // Handle Google login response here
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
              Sign In
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
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          className="GoogleAuthStyle"
        />
      </Card>
    </div>
  );
};

export default SignIn;
