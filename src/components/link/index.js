import React, { Component } from "react";
import "./index.less";

export default class LinkBtn extends Component {
  render() {
    const {
      color = "#61DAFB",
      width = "fit-content",
      height = "fit-content",
      ...rest
    } = this.props;

    return (
      <button {...rest} style={{ color, width, height }}>
        {this.props.children}
      </button>
    );
  }
}
