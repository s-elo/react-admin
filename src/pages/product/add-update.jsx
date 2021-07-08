import React, { Component } from "react";
import { Card, Form, Input, Cascader, Upload, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkBtn from "../../components/link";
import { reqCategory } from "../../apis";
import PicturesWall from "../../components/product/pictureWall";

const { Item } = Form;
const { TextArea } = Input;

export default class AddUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryList: [],
    };

    this.pictureWall = React.createRef();

    this.isUpdate = !!this.props.location.state;
    this.product = this.props.location.state || {};

    this.selectedCategory = [];

    this.getCategory();

    this.initCardTitle();
  }

  getCategory = async () => {
    const { data } = await reqCategory(0);

    if (this.isUpdate) {
      const { pCategoryId } = this.product;

      if (pCategoryId === "0") {
        const selectedItem = data.find(
          (v) => v._id === this.product.categoryId
        );

        this.selectedCategory.push(selectedItem._id);
      } else {
        const { data } = await reqCategory(pCategoryId);

        const selectedItem = data.find(
          (v) => v._id === this.product.categoryId
        );

        this.selectedCategory.push(pCategoryId, selectedItem._id);
      }
    }

    this.setState({
      categoryList: data.map((item) => ({
        value: item._id,
        label: item.name,
        isLeaf: false,
      })),
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

  onFinish = (values) => {
    console.log(values);
    // father use the function from son
    const imgs = this.pictureWall.current.getImgs();
    console.log(imgs);
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

  getImgUrls(imgs) {
    console.log(imgs);
  }

  render() {
    const { isUpdate, product } = this;

    const { categoryList } = this.state;

    return (
      <Card title={this.cardTitle}>
        <Form
          wrapperCol={{ span: 8 }}
          labelCol={{ span: 2 }}
          onFinish={this.onFinish}
        >
          <Item
            initialValue={product.name}
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please give the product name!" },
            ]}
          >
            <Input placeholder="please give the product name" />
          </Item>

          <Item
            initialValue={product.desc}
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
            initialValue={product.price}
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
            initialValue={this.selectedCategory}
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
          <Item
            label="Images"
          >
            <PicturesWall ref={this.pictureWall} />
          </Item>
          <Item
            label="Detail"
            name="detail"
            rules={[
              { required: true, message: "Please provide the product detail!" },
            ]}
          >
            <Input placeholder="please give the product name" />
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
