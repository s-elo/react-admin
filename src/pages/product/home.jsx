import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message, Switch } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkBtn from "../../components/link";
import {
  reqGetProducts,
  reqSearchProduct,
  reqUpdateProductStatus,
} from "../../apis/index";

const Option = Select.Option;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      total: 0,
      searchContent: "",
      searchType: "productName",
    };

    this.loading = false;

    this.initCardTitle();
    this.initExtra();
    this.initCol();

    this.getProductList();
  }

  initCardTitle = () => {
    const { searchType } = this.state;

    this.cardTitle = (
      <span>
        <Select
          defaultValue={searchType}
          style={{ width: 150 }}
          onChange={(val) => {
            this.setState({ searchType: val });
          }}
        >
          <Option value={"productName"}>search by name</Option>
          <Option value={"productDesc"}>search by desc</Option>
        </Select>
        <Input
          placeholder="Keywords"
          style={{ width: 150, margin: "0 10px" }}
          // value={searchContent}
          onChange={(e) => {
            this.setState({ searchContent: e.target.value });
          }}
        ></Input>
        <Button
          type="primary"
          style={{ borderRadius: "5px" }}
          onClick={() => {
            this.getProductList();
          }}
        >
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
        title: "onSale",
        dataIndex: "status",
        render: (_, item) => (
          <Switch
            defaultChecked={item.status ? true : false}
            onChange={(val) => {
              this.statusChange(val, item);
            }}
          />
        ),
      },
      {
        width: 150,
        title: "Operations",
        dataIndex: "price",
        render: (_, item) => {
          return (
            <div>
              <LinkBtn
                onClick={() => {
                  this.props.history.push("/product/detail", { item });
                }}
              >
                Detail
              </LinkBtn>
              <LinkBtn>Modify</LinkBtn>
            </div>
          );
        },
      },
    ];
  };

  statusChange = async (val, item) => {
    const productId = item._id;

    const res = await reqUpdateProductStatus(productId, val ? 1 : 0);

    if (res.status !== 0) message.error("failed to upadte");
  };

  getProductList = async (pageNum = 1, pageSize = 5) => {
    this.loading = true;

    const { searchType, searchContent } = this.state;

    let res;
    if (searchContent !== "") {
      res = await reqSearchProduct({
        pageNum,
        pageSize,
        searchContent,
        searchType,
      });
    } else {
      res = await reqGetProducts(pageNum, pageSize);
    }
    this.loading = false;

    // console.log(res);
    if (res.status === 0) {
      this.setState({ product: res.data.list, total: res.data.total });
    } else {
      message.error("failed to get data");
    }
  };

  render() {
    const { product, total } = this.state;

    return (
      <Card title={this.cardTitle} extra={this.extra}>
        <Table
          loading={this.loading}
          bordered
          rowKey="_id"
          dataSource={product}
          columns={this.columns}
          pagination={{
            total: total,
            defaultPageSize: 1,
            position: ["bottomCenter"],
            onChange: this.getProductList,
            showTotal: (total) => `Total ${total} products`,
            // pageSizeOptions: [1, 2, 5, 10],
          }}
        />
        ;
      </Card>
    );
  }
}
