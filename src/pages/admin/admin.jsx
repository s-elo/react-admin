import React, { Component } from "react";
import { Layout } from "antd";
import storage from "../../utils/storageUtil";
import Header from "../../components/header";
import SideBar from "../../components/side-bar";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    let userInfo = {};

    if (storage.user && storage.user._id) {
      userInfo = storage.user;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <SideBar></SideBar>
        </Sider>
        <Layout>
          <Header></Header>
          <Content
            style={{
              backgroundColor: "white",
              margin: "20px",
              padding: "20px",
            }}
          >
            Content
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
