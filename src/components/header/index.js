import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import storage from "../../utils/storageUtil";
import formatTime from "../../utils/formatTime";
import menuList from "../../configs/menuConfig";

import "./index.less";

class Header extends Component {
  state = {
    visible: false,
    username: storage.user.username,
    currentTime: formatTime(Date.now()),
  };

  getTime = () => {
    this.timer = setInterval(() => {
      const currentTime = formatTime(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };

  getTitle = (list) => {
    if (!list.length) return "";

    const { pathname } = this.props.location;

    /*BPS*/
    const stack = [...list];

    while (stack.length) {
      const menu = stack.pop();

      if (menu.key === pathname) {
        return menu.title;
      }

      if (menu.children) {
        for (const child of menu.children) {
          stack.push(child);
        }
      }
    }

    return "";
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    // delete the admin info
    storage.removeUser();

    this.props.history.replace("/login");
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    this.getTime();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { username, currentTime, visible } = this.state;

    // every second the Header will render since the timeInterval
    const title = this.getTitle(menuList);

    return (
      <div className="header">
        <div className="user-info">
          <span>Hello, {username}~</span>
          <span onClick={this.showModal}>Login out</span>
        </div>
        <div className="other-info">
          <div className="title">{title}</div>
          <div className="time-weather">
            <span className="time">{currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" />
            <span className="weather">Good</span>
          </div>
        </div>
        <Modal
          // title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={this.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>Are sure to login out?</p>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Header);
