import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const Option = Select.Option;

export default class AddForm extends Component {
  static propTypes = {
    categoryList: PropTypes.array.isRequired,
    getForm: PropTypes.func,
  };

  formRef = React.createRef();

  componentDidMount() {
    this.props.getForm(this.formRef.current);
  }

  render() {
    const { categoryList } = this.props;

    return (
      <Form
        ref={this.formRef}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ categoryName: "", parentId: 0 }}
      >
        <Form.Item label="parentName" name="parentId">
          <Select style={{ width: "100%" }}>
            <Option value={0} key={0}>
              First Category
            </Option>
            {categoryList.map((category) => {
              return (
                <Option value={category._id} key={category._id}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="categoryName" name="categoryName">
          <Input />
        </Form.Item>
      </Form>
    );
  }
}
