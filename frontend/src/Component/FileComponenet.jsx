import React, { useState } from "react";

// FileTree Component: Displays a file structure
const FileTree = ({ files, onFileClick, basePath = "" }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleFolder = (folderName) => {
    setExpandedFolders((prevState) => ({
      ...prevState,
      [folderName]: !prevState[folderName],
    }));
  };

  if (!files) return null;

  return (
    <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
      {Object.entries(files).map(([key, value]) => {
        const filePath = `${basePath}/${key}`;
        return (
          <li key={key} style={{ margin: "8px 0" }}>
            {value.directory ? (
              <div
                onClick={() => toggleFolder(key)}
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#4A90E2",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    marginRight: "8px",
                    transform: expandedFolders[key] ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  ▶
                </span>
                {key}/
              </div>
            ) : (
              <div
                style={{ color: "#333", marginLeft: "16px", cursor: "pointer" }}
                onClick={() => {
                    console.log(filePath,value)
                    onFileClick(filePath, value.file.contents)
                }} // Trigger onFileClick with filePath and content
              >
                {key}
              </div>
            )}
            {value.directory && expandedFolders[key] && (
              <FileTree
                files={value.directory}
                onFileClick={onFileClick}
                basePath={filePath}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

// FileComponent: Displays the file structure
const FileComponent = ({ file, onFileClick }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#f9f9f9",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h2 style={{ color: "#2D3748", textAlign: "center", marginBottom: "16px" }}>
        Project Files
      </h2>
      <FileTree files={file} onFileClick={onFileClick} /> {/* Pass onFileClick here */}
    </div>
  );
};

export default FileComponent;
