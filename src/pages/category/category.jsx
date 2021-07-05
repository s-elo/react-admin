import React, { Component } from "react";
import { Card, Button, Table, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { reqCategory, reqAddCategory, reqUpdateCategory } from "../../apis";
import LinkBtn from "../../components/link";
import AddForm from "../../components/category/addForm";
import UpdateForm from "../../components/category/updateForm";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      subData: [],
      parentId: 0,
      parentName: "",
      // 0 both close; 1 Add; 2 Update
      showStatus: 0,
      // form: {},
    };

    this.category = {};
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
              <LinkBtn
                onClick={() => {
                  this.showUpdate(rowData);
                }}
              >
                Modify
              </LinkBtn>
              {this.state.parentId === 0 ? (
                <LinkBtn
                  onClick={() => {
                    this.showSubData(rowData);
                  }}
                >
                  Secondary Category
                </LinkBtn>
              ) : null}
            </span>
          );
        },
      },
    ];
  }

  /*operation column */
  initExtra() {
    this.extra = (
      <Button
        type="primary"
        style={{ borderRadius: "5px" }}
        onClick={() => {
          this.setState({ showStatus: 1 });
          this.addForm &&
            this.addForm.setFieldsValue({
              categoryName: "",
              parentId: 0,
            });
        }}
      >
        <PlusOutlined />
        Add
      </Button>
    );
  }

  /*when click the secondary category btn */
  showSubData = (rowData) => {
    this.setState(
      {
        parentId: rowData._id,
        parentName: rowData.name,
      },
      /*after state changed and render */
      () => {
        this.getCategory();
      }
    );
  };

  /*when click the go back category title */
  showCategory = () => {
    this.setState({
      parentId: 0,
      subData: [],
      parentName: "",
    });
  };

  /*get category list first or secondary */
  getCategory = async () => {
    this.loading = true;

    const { parentId } = this.state;

    const res = await reqCategory(parentId);
    // console.log(res);

    this.loading = false;

    if (res.status === 0) {
      if (parentId === 0) {
        this.setState({ dataSource: res.data });
      } else {
        this.setState({ subData: res.data });
      }
    } else {
      message.error("failed to get the list~");
    }
  };

  showUpdate = (rowData) => {
    this.setState({ showStatus: 2 });

    this.category = rowData;

    // it is undefined for the fisrt time render
    if (this.updateForm) {
      this.updateForm.resetFields();

      this.updateForm.setFieldsValue({
        categoryName: rowData.name,
      });
    }
  };

  handleOk = async () => {
    // const values = this.formInstance.getFieldsValue(true);

    if (this.state.showStatus === 1) {
      try {
        const values = await this.addForm.validateFields();

        await reqAddCategory(values);

        message.success("add successfully");
      } catch {
        message.error("failed to add");
        return;
      }
    } else {
      try {
        const values = await this.updateForm.validateFields();

        await reqUpdateCategory({
          categoryId: this.category._id,
          categoryName: values.categoryName,
        });

        message.success("update successfully");
      } catch {
        message.error("failed to update");
        return;
      }
    }

    this.handleCancel();

    this.getCategory();
  };

  handleCancel = () => {
    this.setState({
      showStatus: 0,
    });
  };

  render() {
    // console.log('render');
    const { dataSource, parentId, parentName, subData, showStatus } =
      this.state;

    const title =
      parentId === 0 ? (
        "Category List"
      ) : (
        <div>
          <LinkBtn onClick={this.showCategory}>Category List</LinkBtn>
          <ArrowRightOutlined style={{ marginRight: 5 }} />
          <span>{parentName}</span>
        </div>
      );

    const modalTitle = showStatus === 1 ? "Add category" : "Update category";

    const category = this.category || {};

    return (
      <Card title={title} extra={this.extra} style={{ width: "100%" }}>
        <Table
          loading={this.loading}
          dataSource={parentId === 0 ? dataSource : subData}
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
          visible={showStatus === 1}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddForm
            categoryList={dataSource}
            getForm={(form) => {
              this.addForm = form;
            }}
          />
        </Modal>
        <Modal
          title={modalTitle}
          visible={showStatus === 2}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name || ""}
            getForm={(form) => {
              this.updateForm = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
