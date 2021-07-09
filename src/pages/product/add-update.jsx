import React, { Component } from "react";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkBtn from "../../components/link";
import { reqCategory, reqAddOrUpdate } from "../../apis";
import PicturesWall from "../../components/product/pictureWall";

const { Item } = Form;
const { TextArea } = Input;

export default class AddUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryList: [],
      selectedCategory: [],
    };

    this.pictureWall = React.createRef();

    this.isUpdate = !!this.props.location.state;
    this.product = this.props.location.state || {};

    this.getCategory();

    this.initCardTitle();
  }

  getCategory = async () => {
    const { data } = await reqCategory(0);

    const categoryList = data.map((item) => ({
      value: item._id,
      label: item.name,
      isLeaf: false,
    }));

    const { selectedCategory } = this.state;

    if (this.isUpdate) {
      const { pCategoryId } = this.product;

      // only one level
      if (pCategoryId === "0") {
        const selectedItem = data.find(
          (v) => v._id === this.product.categoryId
        );

        selectedCategory.push(selectedItem._id);
      } else {
        // second level
        const { data } = await reqCategory(pCategoryId);

        const selectedItem = data.find(
          (v) => v._id === this.product.categoryId
        );

        selectedCategory.push(pCategoryId, selectedItem._id);

        const children = data.map((item) => ({
          value: item._id,
          label: item.name,
          isLeaf: true,
        }));

        // only the one has chidren can have the children key
        const pCategory = categoryList.find((item) => item.value === pCategoryId);
        pCategory.children = children;
      }
    }

    this.setState({
      categoryList,
      selectedCategory,
    });
  };

  initCardTitle = () => {
    this.cardTitle = (
      <span>
        <LinkBtn
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <ArrowLeftOutlined />
        </LinkBtn>
        <span style={{ marginLeft: "5px" }}>
          {this.isUpdate ? "Update Item" : "Add Item"}
        </span>
      </span>
    );
  };

  onFinish = async (values) => {
    const { name, desc, price, category } = values;

    const product = { name, desc, price };

    if (category.length > 1) {
      product.pCategoryId = category[0];
      product.categoryId = category[1];
    } else {
      product.pCategoryId = "0";
      product.categoryId = category[0];
    }

    if (this.isUpdate) product._id = this.product._id;

    // father use the function from son
    product.imgs = this.pictureWall.current.getImgs();

    const res = await reqAddOrUpdate(product);

    if (res.status === 0) {
      message.success(
        this.isUpdate ? "update successfully" : "add successfully"
      );
      this.props.history.goBack();
    } else {
      message.error(this.isUpdate ? "failed to update" : "failed to add");
    }
  };

  loadCategory = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    targetOption.loading = true;
    const { data } = await reqCategory(targetOption.value);
    targetOption.loading = false;

    if (data.length !== 0) {
      targetOption.children = data.map((item) => ({
        value: item._id,
        label: item.name,
      }));
    }

    // trigger render
    this.setState({
      categoryList: [...this.state.categoryList],
    });
  };

  render() {
    const { name, desc, price, imgs } = this.product;

    const { categoryList, selectedCategory } = this.state;

    return (
      <Card title={this.cardTitle}>
        <Form
          wrapperCol={{ span: 8 }}
          labelCol={{ span: 3 }}
          onFinish={this.onFinish}
          // defaultValue={}
        >
          <Item
            initialValue={name}
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please give the product name!" },
            ]}
          >
            <Input placeholder="please give the product name" />
          </Item>

          <Item
            initialValue={desc}
            label="Description"
            name="desc"
            rules={[
              { required: true, message: "Please give the product desc!" },
            ]}
          >
            <TextArea
              placeholder="please give the product desc"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>

          <Item
            initialValue={price}
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please give the product price!" },
              () => ({
                validator(_, value) {
                  if (value >= 0) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("Price cannot lower 0"));
                  }
                },
              }),
            ]}
          >
            <Input
              placeholder="please give the product price"
              type="number"
              addonAfter="￥"
            />
          </Item>

          <Item
            initialValue={selectedCategory}
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please select the product category!",
              },
            ]}
          >
            <Cascader
              options={categoryList}
              loadData={this.loadCategory}
              changeOnSelect
            />
          </Item>
          <Item label="Images">
            <PicturesWall ref={this.pictureWall} imgs={imgs} />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
