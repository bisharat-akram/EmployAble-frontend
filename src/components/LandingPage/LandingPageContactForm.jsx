import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./LandingPage.css";
import { Form, Input, Button, notification } from "antd";
const LandingPageConatctForm = () => {
  const { TextArea } = Input;
  const [state, handleSubmit] = useForm("mzbnzbbd");
  if (state.succeeded) {
    notification.success({
      message: "Success",
      description: "Message sent successfully",
      placement: "topLeft",
    });
  }

  return (
    <>
      <div className="LandingPageContactFormMain">
        <div className="contactUsHeadingStyle" style={{ marginBottom: "10px" }}>
          Contact Us
        </div>
        <div
          className="contactUsSubHeadingStyle"
          style={{ marginBottom: "30px" }}
        >
          Connect with us to learn more about empowering individuals with
          criminal records
        </div>
        <Form name="signup" onFinish={handleSubmit} style={{ width: "50%" }}>
          <div className="LandingPageLabelStyle">Name</div>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your  name!",
              },
            ]}
          >
            <Input placeholder="Name" className="InputStyle" name="name" />
          </Form.Item>
          <div className="LandingPageLabelStyle">Phone</div>

          <Form.Item
            name="phone"
            rules={[
              {
                pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                message: "Please enter a valid phone number",
                required: false,
              },
            ]}
          >
            <Input
              placeholder="Phone Number"
              className="InputStyle"
              name="phone"
            />
          </Form.Item>
          <div className="LandingPageLabelStyle">Email</div>
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
              type="email"
              placeholder="Email"
              className="InputStyle"
              name="email"
            />
          </Form.Item>

          <div className="LandingPageLabelStyle">Message</div>
          <Form.Item
            name="message"
            rules={[
              {
                required: true,
                message: "Please enter your message!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Message"
              className="InputStyle"
              name="message"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="SignupStyle"
              disabled={state.submitting}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default LandingPageConatctForm;
