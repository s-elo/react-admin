import React, { Component } from "react";
import { Card, Button, Table, message, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqCategory, reqAddCategory } from "../../apis";
import LinkBtn from "../../components/link";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      visible: false,
      modalTitle: "Add category",
      form: {},
    };

    this.loading = false;

    this.initCol();
    this.initExtra();

    this.getCategory();
  }

  initCol() {
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Operations",
        width: 300,
        render: (_, rowData) => {
          return (
            <span>
              <LinkBtn onClick={this.editCategory.bind(this, rowData)}>
                Modify
              </LinkBtn>
              <LinkBtn>Detail</LinkBtn>
            </span>
          );
        },
      },
    ];
  }

  initExtra() {
    this.extra = (
      <Button
        type="primary"
        style={{ borderRadius: "5px" }}
        onClick={this.editCategory.bind(this, null)}
      >
        <PlusOutlined />
        Add
      </Button>
    );
  }
  getCategory = async () => {
    this.loading = true;

    const res = await reqCategory(0);
    // console.log(res);

    this.loading = false;

    if (res.status === 0) {
      this.setState({ dataSource: res.data });
    } else {
      message.error("failed to get the list~");
    }
  };

  editCategory = (rowData) => {
    if (rowData) {
      console.log(rowData);

      this.setState({
        visible: true,
        modalTitle: "Update category",
        form: { ...rowData },
      });
    } else {
      this.setState({ visible: true, modalTitle: "Add category", form: {} });
    }
  };

  handleOk = async () => {
    const res = await reqAddCategory(this.form);

    if (res.status === 0) {
      message.success("Add successfully!");

      this.getCategory();

      this.setState({ visible: false });
    } else {
      message.error("something wrong, please try again~");
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  formChange = (e, key) => {
    const { value } = e.target;

    this.form[key] = value;
  };

  render() {
    // console.log('render');
    const { dataSource, visible, modalTitle, form } = this.state;

    return (
      <Card title="Category list" extra={this.extra} style={{ width: "100%" }}>
        <Table
          loading={this.loading}
          dataSource={dataSource}
          columns={this.columns}
          rowKey="_id"
          bordered
          pagination={{
            position: ["bottomCenter"],
            total: dataSource.length,
            showTotal: (total) => `Total ${total} categorys`,
            defaultPageSize: 5,
            defaultCurrent: 1,
            showQuickJumper: true,
            pageSizeOptions: [5, 7, 10, 15],
          }}
        />
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ parentId: 0 }}
            // onFinish={this.onFinish}
            // onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="parentId"
              name="parentId"
              rules={[
                { required: true, message: "Please input the parentId!" },
              ]}
            >
              <Input
                onChange={(e) => {
                  this.formChange(e, "parentId");
                }}
                disabled={true}
              />
            </Form.Item>

            <Form.Item
              label="categoryName"
              name="categoryName"
              rules={[
                { required: true, message: "Please input the category name!" },
              ]}
            >
              <Input
                onChange={(e) => {
                  this.formChange(e, "categoryName");
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}
