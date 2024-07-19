import React, { useRef, useEffect, useState } from 'react';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';

const MyDropzone = () => {
  const dropzoneRef = useRef(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const dropzone = new Dropzone(dropzoneRef.current, {
      url: "http://localhost:5000/upload", // 你的上传API端点
      method: "post",
      paramName: "file",
      maxFiles: 10,
      maxFilesize: 5, // 以MB为单位
      acceptedFiles: ".jpg,.png,.gif",
      dictDefaultMessage: "拖拽文件到此或点击上传",
      init: function () {
        this.on("sending", function (file, xhr, formData) {
          formData.append("description", description); // 将描述添加到表单数据中
        });
      }
    });

    return () => {
      dropzone.destroy();
    };
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以处理其他表单提交逻辑
  };

  return (
    <div>
      <h1>文件上传</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>文件描述</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </form>
      <div ref={dropzoneRef} className="dropzone"></div>
    </div>
  );
};

export default MyDropzone;
