import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const DragDropFile = ({ handleFiles, fileSupport }) => {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
<<<<<<< HEAD
      const fileType = e.target.files[0].type;

      const isFileTypeSupported =
        fileType === "application/pdf" ||
        fileType === fileSupport ||
        (fileSupport === "image" &&
          (fileType === "image/png" ||
            fileType === "image/jpeg" ||
            fileType === "image/jpg"));

      if (isFileTypeSupported) {
=======
      if (e.target.files[0].type === fileSupport
          || fileSupport.includes(e.target.files[0].type)
          // use for the download document can be support any type but not image
          || fileSupport === "any" && e.target.files[0].type !== "image/png" && e.target.files[0].type !== "image/jpeg" && e.target.files[0].type !== "image/jpg"
      ) {
>>>>>>> 857f3cd23cccdad73188e82016ffec4026385302
        if (e.target.files[0].size < 52428800) {
          handleFiles(e.target.files);
        } else {
          toast.error("File quá lớn. Vui lòng chọn file nhỏ hơn 50MB");
        }
      } else {
        toast.error("Định dạng file hiện đang chưa hỗ trợ");
      }
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div className={`flex flex-col items-center justify-center h-full`}>
          <p>Kéo và thả file vào khu vực này hoặc là</p>
          <button
            className="upload-button text-blue-400"
            onClick={onButtonClick}
          >
            Tải file từ máy
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};

export default DragDropFile;
