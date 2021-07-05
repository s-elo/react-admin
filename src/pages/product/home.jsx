import React, { Component } from "react";
import { Card, Select, Input, Button, Table } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkBtn from "../../components/link";
import { reqGetProducts } from "../../apis/index";

const Option = Select.Option;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
    };

    this.initCardTitle();
    this.initExtra();
    this.initCol();

    this.getProductList();
  }

  initCardTitle = () => {
    this.cardTitle = (
      <span>
        <Select defaultValue={1} style={{ width: 150 }}>
          <Option value={1}>search by name</Option>
          <Option value={2}>search by price</Option>
        </Select>
        <Input
          placeholder="Keywords"
          style={{ width: 150, margin: "0 10px" }}
        ></Input>
        <Button type="primary" style={{ borderRadius: "5px" }}>
          Search
        </Button>
      </span>
    );
  };

  initExtra = () => {
    this.extra = (
      <Button type="primary" style={{ borderRadius: "5px" }} onClick={() => {}}>
        <PlusOutlined />
        Add Item
      </Button>
    );
  };

  initCol = () => {
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Description",
        dataIndex: "desc",
      },
      {
        width: 150,
        title: "Price",
        dataIndex: "price",
        render: (_, item) => "￥" + item.price,
      },
      {
        width: 100,
        title: "Status",
        dataIndex: "status",
      },
      {
        width: 150,
        title: "Operations",
        dataIndex: "price",
        render: (_, item) => {
          return (
            <div>
              <LinkBtn>Detail</LinkBtn>
              <LinkBtn>Modify</LinkBtn>
            </div>
          );
        },
      },
    ];
  };

  getProductList = async () => {
    const res = await reqGetProducts();

    console.log(res);

    this.setState({ product: res.data.list });
  };

  render() {
    const { product } = this.state;

    return (
      <Card title={this.cardTitle} extra={this.extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={product}
          columns={this.columns}
        />
        ;
      </Card>
    );
  }
}
