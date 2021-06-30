import React, { Component } from "react";
import { Form, Input } from "antd";
import { login } from "../../apis";
// import PropTypes from 'prop-types';

export default class UpdateForm extends Component {
  //   static propTypes = {
  //     categoryName: PropTypes.string.isRequired
  //   }
  formRef = React.createRef();

  componentDidMount() {
    this.props.getForm(this.formRef.current);
  }

  render() {
    const { categoryName } = this.props;

    return (
      <Form
        ref={this.formRef}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ categoryName: categoryName }}
      >
        <Form.Item label="categoryName" name="categoryName">
          <Input />
        </Form.Item>
      </Form>
    );
  }
}
