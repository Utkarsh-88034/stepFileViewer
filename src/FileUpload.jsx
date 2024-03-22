import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const FileUpload = ({ setGlb }) => {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("stepFile", file);

    try {
      const response = await axios.post(
        "http://localhost:2000/convert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );
      if (response) {
        setLoading(false);
      }
      console.log(response);
      setGlb(response.data);
      const blob = new Blob([response.data]);

      setConvertedFile(URL.createObjectURL(blob));
      nav("/viewer");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <h1>STEP to GLB Converter</h1>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>
        {loading ? "Loading ..." : "Upload & Convert"}
      </button>
      {convertedFile && (
        <a href={convertedFile} download="converted.glb">
          Download Converted GLB
        </a>
      )}
    </div>
  );
};

export default FileUpload;
