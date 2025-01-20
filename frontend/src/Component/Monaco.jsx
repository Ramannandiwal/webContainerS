import { Editor } from '@monaco-editor/react';

const Monaco = ({ file, content, setContent }) => {
  const handleEditorChange = (newValue) => {
    setContent(newValue); // Update the parent state
  };

  return (
    <Editor
      onChange={handleEditorChange}
      options={{ fontSize: 18, minimap: { enabled: false }, readOnly: false }}
      theme="vs-dark"
      defaultLanguage="javascript"
      value={content} // Controlled value
    />
  );
};

export default Monaco;
