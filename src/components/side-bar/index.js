import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  PieChartOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";

import "./index.less";
import logo from "../../assets/imgs/logo512.png";

const { SubMenu } = Menu;

export default class SideBar extends Component {
  render() {
    return (
      <div className="menu">
        <Link to="/" className="logo">
          <img src={logo} />
          <div className="banner">Super-Admin</div>
        </Link>

        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          //   inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Home
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Products">
            <Menu.Item key="5">Category</Menu.Item>
            <Menu.Item key="6">Item</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Roles
          </Menu.Item>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Charts"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
