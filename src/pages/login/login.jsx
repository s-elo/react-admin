import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {login} from '../../apis/index';
// import LinkBtn from '../../components/link';
import storage from '../../utils/storageUtil';

import "./login.less";
import logo from "../../assets/imgs/logo512.png";

export default class Login extends Component {
  onFinish = async (values) => {
    console.log(values);
    try {
      const {username, password} = values;

      const res = await login(username, password);

      console.log(res);
      if (res.status === 0) {
        message.success('Login successfully!');

        // store the user info
        storage.user = res.data;

        // no need to come back here, so use replace rather than push
        this.props.history.replace('/');
      } else {
        message.error(res.msg);
      }
    } catch(err) {
      console.log(err);
    }
  };
  onFailed = (_, values) => {
    console.log('error');
  }

  render() {
    // if already login, no need to show this page
    if (storage.user && storage.user._id) {
      this.props.history.replace('/');
    }

    return (
      <div className="login-page">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>Admin For SuperLi~</h1>
        </header>
        <section className="login-section">
          <h2>Login</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFailed}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
                { min: 4, message: "at least 4 characters" },
                { max: 12, message: "at most 12 characters" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "only letter, _ and number",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                () => ({
                  validator(_, value) {
                    // console.log(rules, value);
                    // the above has handled this situation
                    if (!value) return Promise.resolve();

                    if (value.length < 4) {
                      return Promise.reject(new Error("at least 4 characters"));
                    } else if (value.length > 12) {
                      return Promise.reject(new Error("at most 12 characters"));
                    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                      return Promise.reject(
                        new Error("only letter, _ and number")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              {/* Or <LinkBtn>register now!</LinkBtn> */}
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
