import React, { Component } from "react";
import { reqOneCategory } from "../../apis";

import { List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkBtn from "../../components/link";

import "./detail.less";

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pName: "",
      cName: "",
    };

    this.initHeader();
  }

  initHeader = () => {
    this.header = (
      <span>
        <LinkBtn
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <ArrowLeftOutlined />
        </LinkBtn>
        <span style={{ marginLeft: "5px" }}>Item Detail</span>
      </span>
    );
  };

  async componentDidMount() {
    const { categoryId, pCategoryId } = this.props.location.state.item;

    if (parseInt(pCategoryId) === 0) {
      const res = await reqOneCategory(categoryId);

      this.setState({ pName: res.data.name });
    } else {
      const res = await Promise.all([
        reqOneCategory(categoryId),
        reqOneCategory(pCategoryId),
      ]);

      this.setState({ pName: res[0].data.name, cName: res[1].data.name });
    }
  }

  render() {
    const { pName, cName } = this.state;

    let item = {};

    if (this.props.location.state) {
      item = this.props.location.state.item;
    }
    const { name = "", desc = "", price = "", detail = "", imgs = [] } = item;

    const data = [
      <span>
        <label>Product name:</label>
        {name}
      </span>,
      <span>
        <label>Description:</label>
        {desc}
      </span>,
      <span>
        <label>Price:</label>
        {"￥" + price}
      </span>,
      <span>
        <label>Category:</label>
        {pName + (cName === "" ? "" : `--> ${cName}`)}
      </span>,
      <span>
        <label>Images:</label>
        {imgs.map((img) => (
          <img
            key={img}
            src={`http://localhost:5000/upload/${img}`}
            alt={name}
          />
        ))}
      </span>,
      <span>
        <label>Detail:</label>
        <span
          dangerouslySetInnerHTML={{
            __html: detail,
          }}
        ></span>
      </span>,
    ];
    return (
      <List
        header={this.header}
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    );
  }
}
