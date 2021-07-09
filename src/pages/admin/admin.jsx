import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Layout } from "antd";

import storage from "../../utils/storageUtil";
import Header from "../../components/header";
import SideBar from "../../components/side-bar";

import Home from "../home/home";
import User from "../user/user";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  constructor(props) {
    super(props);

    if (storage.user && storage.user._id) {
      this.userInfo = storage.user;
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider style={{ height: "100%" }}>
          <SideBar userInfo={this.userInfo}></SideBar>
        </Sider>
        <Layout style={{ height: "auto" }}>
          <Header></Header>
          <Content
            style={{
              // backgroundColor: "white",
              // margin: "20px",
              padding: "20px",
              minHeight: 500,
            }}
          >
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              {/* if there is no match above */}
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer
            style={{
              width: "100%",
              height: "100px",
              textAlign: "center",
              color: "#7f8c8d",
            }}
          >
            Using Chrome will be better~
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
