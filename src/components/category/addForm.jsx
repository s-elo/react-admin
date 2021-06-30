import React, { Component } from "react";
import { Form, Input, Select } from "antd";

const Option = Select.Option;

export default class AddForm extends Component {
  render() {
    return (
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ categoryName: ''}}
        // onFinish={this.onFinish}
        // onFinishFailed={this.onFinishFailed}
      >
        <Form.Item label="parentName">
          <Select
             defaultValue='Jack'
            style={{ width: '100%' }}
          >
            <Option value={'Jack'}>Jack</Option>
          </Select>
          ,
        </Form.Item>

        <Form.Item label="categoryName" name="categoryName">
          <Input />
        </Form.Item>
      </Form>
    );
  }
}
