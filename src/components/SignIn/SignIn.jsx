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
import { useSnackbar } from "notistack";

const { Title, Text } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
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
    const response = await postApiWithoutAuth("login/", data);
    if (!response.success) {
      // setisLoading(false);
      enqueueSnackbar(response.error.message, {
        variant: "error",
      });
      return;
    }
    enqueueSnackbar("Login Successfully", {
      variant: "info",
    });
    // setisLoading(false);
    setToken(response.data.data.access);
    userData();
  };

  const userData = async () => {
    const response = await getApiWithAuth("me");
    if (!response.success) {
      // setisLoading(false);
      enqueueSnackbar(response.error.message, {
        variant: "error",
      });
      return;
    }
    enqueueSnackbar("Login Successfully", {
      variant: "info",
    });
    if (response?.data?.user_type == 1) {
      navigate("/user");
    } else {
      navigate("/employe");
    }
  };
  const responseGoogle = async (res) => {
    console.log(res.accessToken);
    const response = await postApiWithoutAuth("google-login/", {
      access_token: res.accessToken,
    });
    if (!response.success) {
      // setisLoading(false);
      // enqueueSnackbar(response.error.message, {
      //   variant: "error",
      // });
      return;
    }
    setToken(response.data.data.access);
    enqueueSnackbar("Login Successfully", {
      variant: "info",
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
