import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { DownloadOutlined } from "@ant-design/icons";
import {
  Drawer,
  Upload,
  Button,
  message,
  Modal,
  Spin
} from "antd";
import sampleCsv from "../../../assets/file/samplefile.csv";
import "./Import.scss";

import constants from "../../../constants/constants";
import messages from "../../../constants/messages";
import PropTypes from "prop-types";

import {
  uploadEmpData,
  clearUploadEmpData
} from "../../../actions/empActions";

const {
  EMPLOYEE: {
    IMPORT
  },
  IMPORT: {
    IMPORT_TITLE,
    FILE_TEXT,
    FILE_FORMAT,
    FILE_SIZE,
    UPLOAD_BTN,
    DOWNLOAD_TEXT
  },
  CANCELBTN,
  CONFIRM,
  ROUTES: {
    VIEWALLEMPLOYEE
  }
} = constants;

const {
  FILE_UPLOAD_FAILED,
  FILE_UPLOAD_SUCCESSFULLY
} = messages;

const ImportCSV = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const [fileInfo, setfileInfo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [file, setfile] = useState("");
  const dispatch = useDispatch();

  const uploadEmpDataResponse = useSelector(
    state => state.empReducer.uploadEmpData,
    shallowEqual
  );

  const showDrawer = useCallback(() => {
    setVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setfileInfo([]);
    setfile("");
  }, []);

  useEffect(() => {
    if (uploadEmpDataResponse.error) {
      message.error(`${file.name} ${FILE_UPLOAD_FAILED}`);
      dispatch(clearUploadEmpData());
      setisLoading(false);
    } else if (uploadEmpDataResponse.result) {
      setisLoading(false);
      message.success(`${file.name} ${FILE_UPLOAD_SUCCESSFULLY}`);
      dispatch(clearUploadEmpData());
      handleCancel();
      onClose();
      history.push(VIEWALLEMPLOYEE);
    }
  }, [uploadEmpDataResponse]);

  const handleConfirm = () => {
    setIsModalVisible(true);
  };

  const handleUpload = (info) => {
    setfileInfo(info.fileList);
  };
  const uploadImage = (option) => {
    const { onSuccess, file } = option;
    setfile(file);
    onSuccess("Ok");
  };

  const handleRemove = () => {
    setfileInfo([]);
  };

  const handleCancelmodal = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const formData = new FormData();
    setisLoading(true);
    formData.append("file", file);
    dispatch(uploadEmpData(formData));
  };

  return (
    <>
      <a onClick={showDrawer}>
        <DownloadOutlined /> {IMPORT}
      </a>
      <Modal title="Upload file"
      className="Modalcontainer"
      visible={isModalVisible}
      onOk={handleOk} onCancel={handleCancelmodal}>
        <p>Are you sure want to continue?</p>
        <p>We will upload and process your selected file.
          File not selected for upload will be discarded.</p>
      </Modal>
      <Drawer
        title={IMPORT_TITLE}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width="400"
        className="importer"
      >
            <Spin spinning={isLoading} className="loader"
    size="large">
        <div className="uploadContainer">
          <DownloadOutlined />
          <h2>{FILE_TEXT}</h2>
            <p>{FILE_FORMAT}</p>
            <p>{FILE_SIZE}</p>
            <Upload
              customRequest={uploadImage}
              accept=".csv, text/csv"
              multiple={false}
              fileList={fileInfo}
              onRemove={handleRemove}
              showUploadList={{ showPreviewIcon: false }}
              maxCount={1}
              onChange={handleUpload}
            >
              <Button className="importUploadbutton">{UPLOAD_BTN}</Button>
            </Upload>
            <a href={sampleCsv}>{DOWNLOAD_TEXT}</a>
        </div>
        <div className="btn">
          <Button
            className="btn-white"
            type="primary"
            onClick={handleCancel}
          >{CANCELBTN}</Button>
          <Button
            className="btn-primary"
            type="primary"
            onClick={handleConfirm}
            >{CONFIRM}</Button>
        </div>
        </Spin>
      </Drawer>
    </>
  );
};

ImportCSV.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(ImportCSV));
