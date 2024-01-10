import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./LandingPage.css";
import { Form, Input, Button, notification } from "antd";
const LandingPageConatctForm = () => {
  const { TextArea } = Input;
  const [state, handleSubmit] = useForm("mnqenaer");
  if (state.succeeded) {
    notification.success({
      message: "Success",
      description: "Message send successfully",
      placement: "topLeft",
    });
  }
  return (
    <>
      <div className="LandingPageContactFormMain">
        <div className="contactUsHeadingStyle" style={{ marginBottom: "30px" }}>
          Contact Us
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
          <div className="LandingPageLabelStyle">Subject</div>

          <Form.Item
            name="subject"
            rules={[
              {
                required: true,
                message: "Please enter your subject!",
              },
            ]}
          >
            <Input
              placeholder="Subject"
              className="InputStyle"
              name="subject"
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
          <div>
            <Button
              type="submit"
              disabled={state.submitting}
              className="LandingPageLoginButton"
              style={{ marginBottom: "30px" }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default LandingPageConatctForm;
