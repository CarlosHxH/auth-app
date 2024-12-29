import React, { useState } from "react";
import { styled } from "@mui/system";
import { Box, Chip } from "@mui/material";
import Image from "next/image";

// Styled components
const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  border: "2px dashed #1976d2",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5",
  transition: "border-color 0.3s",
  "&:hover": {
    borderColor: "#1565c0",
  },
});

const Input = styled("input")({
  display: "none",
});

const UploadButton = styled("label")({
  padding: "10px 20px",
  backgroundColor: "#1976d2",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
});

interface Props {
  label: string;
  name: string;
  value?: string;
  onChange: (event: { [key: string]: any }) => void;
}

const FileUploader = ({ label, name, value, onChange }: Props) => {
  const [base64String, setBase64String] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string; // Cast result to string
        setBase64String("data:image/png;base64," + base64.split(",")[1]); // Remove the data URL part
        setFileName(file.name); // Store the file name
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const handleRemoveFile = () => {
    setBase64String(""); // Clear the Base64 string
    setFileName(""); // Clear the file name
  };

  React.useEffect(()=>onChange({[name]:base64String}),[base64String, fileName])

  return (
    <Container>
      <Input accept="image/*" id={"fileUpload"+name||""} type="file" onChange={handleFileChange}/>
      <UploadButton htmlFor={"fileUpload"+name||""}>{label}</UploadButton>
      {(value) && (
        <span style={{ position: "relative" }}>
          <Image
            height={100}
            width={100}
            src={value || ""}
            alt={name}
          />
          <Chip
            label={`${fileName}`}
            onDelete={handleRemoveFile}
            color="error"
            style={{position: "absolute",bottom: -15,right: 0}}
          />
        </span>
      )}
    </Container>
  );
};

export default FileUploader;
