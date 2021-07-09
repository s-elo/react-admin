import React from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDeleteImg } from "../../apis";
import PropTypes from "prop-types";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array,
  };

  constructor(props) {
    super(props);

    let fileList = [];

    // for update
    const { imgs } = this.props;

    if (imgs && imgs.length) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: `http://localhost:5000/upload/${img}`,
      }));
    }

    this.state = {
      previewVisible: false,
      previewImage: "",
      // previewTitle: "",
      fileList,
    };
  }

  getImgs = () => {
    return this.state.fileList.map((file) => file.name);
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      //   previewTitle:
      //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async ({ file, fileList }) => {
    if (file.status === "done") {
      const ret = file.response;

      if (ret.status === 0) {
        message.success("upload successfully");
        fileList[fileList.length - 1].name = ret.data.name;
      } else {
        message.error("fialed to upload");
      }
    } else if (file.status === "removed") {
      const res = await reqDeleteImg(file.name);

      if (res.status === 0) {
        message.success("delete successfully");
      } else {
        message.status.error("failed to delete");
      }
    }

    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          accept="image/*"
          name="image" /*request param name*/
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          // title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
