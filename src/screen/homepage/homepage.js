import React, { useState } from "react";
import Dropzone from "react-dropzone";
import imagePicture from "../../assets/images/image.svg";
import "./homepage.css";
import { Button, Spin, Upload } from "antd";
import axios from "axios";

function Homepage() {
  const [downImage, setDownImage] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState();

  return (
    <div className="top-container">
      {!loading && (
        <div className="main-container">
          {!visible && (
            <>
              <h2>Upload your image</h2>
              <p className="file">File should be Jpeg, Png,...</p>
              <Dropzone
                onDrop={async (acceptedFiles) => {
                  setLoading(true);
                  let data = new FormData();
                  data.append("image", acceptedFiles[0]);
                  axios
                    .post("http://localhost:4000/upload-image", data)
                    .then((data) => {
                      console.log("DATA", data);
                      setDownImage(
                        `http://localhost:4000/get-image/${data.data.id}`
                      );
                      setId(data.data.id);
                      setLoading(false);
                      setVisible(true);
                    })
                    .catch((e) => console.log("ERROR", e));
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div className="container" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <img
                        className="uploader-image"
                        src={imagePicture}
                        alt="uloader-img"
                      />
                      <p>Drag &amp; Drop your image here</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <p className="or">Or</p>
              <Upload
                beforeUpload={() => {
                  return false;
                }}
                onChange={async (acceptedFiles) => {
                  setLoading(true);
                  console.log("Accepted files", acceptedFiles);
                  let data = new FormData();
                  data.append("image", acceptedFiles.file);
                  axios
                    .post("http://localhost:4000/upload-image", data)
                    .then((data) => {
                      console.log("DATA", data);
                      setDownImage(
                        `http://localhost:4000/get-image/${data.data.id}`
                      );
                      setId(data.data.id);
                      setLoading(false);
                      setVisible(true);
                    })
                    .catch((e) => console.log("ERROR", e));
                }}
              >
                <Button type="primary" className="uploadButton">
                  Choose a file
                </Button>
              </Upload>
            </>
          )}
          {visible && (
            <div className="image-container">
              <img className="finalImage" src={downImage} />
              <a
                className="download-link"
                href={`http://localhost:4000/get-image/${id}`}
              >
                http://localhost:4000/get-image/${id}
              </a>
            </div>
          )}
        </div>
      )}
      {loading && (
        <div className="loading-container">
          <Spin className="spin" size="large" />
        </div>
      )}
    </div>
  );
}

export default Homepage;
