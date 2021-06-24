import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import * as Icons from "@ant-design/icons";

import "./index.less";
import logo from "../../assets/imgs/logo512.png";

import menuList from "../../configs/menuConfig";

const { SubMenu } = Menu;

class SideBar extends Component {
  constructor(props) {
    super(props);

    // return an array, jsx will resolve it
    // get the render menu in constructor
    // so only run the getMenu function once for the first render
    this.menuList = this.getMenu(menuList);
  }

  // get the Icon node dymatically
  getIconNode = (IconName) => {
    return Icons[IconName] ? React.createElement(Icons[IconName]) : "";
  };

  getMenu = (menuList) => {
    return menuList.map((menu) => {
      if (menu.children) {
        const {pathname} = this.props.location;
        // see if there is a sub menu matching current path
        // then decide if we need to expand the sub menu
        const matchChild = menu.children.find(menu => menu.key === pathname);

        if (matchChild) {
          // using its father's key to expand
          this.openKey = menu.key;
        }

        return (
          <SubMenu
            key={menu.key}
            icon={this.getIconNode(menu.icon)}
            title={menu.title}
          >
            {this.getMenu(menu.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={menu.key} icon={this.getIconNode(menu.icon)}>
            <Link to={menu.key}>{menu.title}</Link>
          </Menu.Item>
        );
      }
    });
  };

  render() {
    const { userInfo } = this.props;
    // console.log(userInfo);

    // noted that the location is from withRouter
    const { pathname } = this.props.location;

    return (
      <div className="menu">
        <Link to="/" className="logo">
          <img src={logo} />
          <div className="banner">Super-Admin</div>
        </Link>

        <Menu
          selectedKeys={[pathname]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
          //   inlineCollapsed={this.state.collapsed}
        >
          {this.menuList}
        </Menu>
      </div>
    );
  }
}

// withRouter will return a component and give the router-related props to it
export default withRouter(SideBar);
