import { useLocation } from "react-router-dom";
import Monaco from "../Component/Monaco";
import { Terminal as XTerm } from '@xterm/xterm';
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef, useState } from "react";
import { WebContainer } from '@webcontainer/api';
import axios from 'axios';
import FileComponent from "../Component/FileComponenet";

let webcontainer;
let isbooting = false;
let viteProcess;

const Builder = () => {
  const [loading, setLoading] = useState(true);
  const terminalRef = useRef(null);
  const terminalInstance = useRef(null);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(""); // File fetched from backend
  const [updatedContent, setUpdatedContent] = useState(""); // Updated file content
  const [selectedFile, setSelectedFile] = useState(null);
  const location = useLocation();
  const { name, tailwind, reactRouter } = location.state || {};

  // Fetch file on mount
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/file");
        const fileData = JSON.stringify(response.data);
        setFile(fileData);
        setUpdatedContent(JSON.parse(fileData)?.src?.directory?.["App.jsx"]?.file?.contents);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, []);

  const updateFile = async () => {
    try {
        
      const response = await axios.post("http://localhost:4000/update", { file: updatedContent,path:selectedFile });

      // Write the updated content to WebContainer's filesystem
      const fsPath = selectedFile; 
      await webcontainer.fs.writeFile(fsPath, updatedContent);

      console.log("File updated successfully in the container.");

      // Restart the Vite server if necessary
      if (viteProcess) {
        viteProcess.kill(); // Kill the existing process
        console.log("Existing Vite server stopped");
      }

      // Optionally, restart Vite process
      // viteProcess = await webcontainer.spawn('npm', ['run', 'dev']);
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };

  useEffect(() => {
    if (!file) return;

    const terminal = new XTerm({
      convertEol: true,
      cursorBlink: true,
    });
    terminalInstance.current = terminal;

    if (terminalRef.current) {
      terminal.open(terminalRef.current);
      terminal.resize(80, 10);
      terminal.writeln("Terminal initialized...");
    }

    const init = async () => {
      if (!isbooting) {
        isbooting = true;
        webcontainer = await WebContainer.boot();
        await webcontainer.mount(JSON.parse(file));

        const startShell = async (terminal) => {
          const shellProcess = await webcontainer.spawn("jsh");
          shellProcess.output.pipeTo(
            new WritableStream({
              write(data) {
                terminal.write(data);
              },
            })
          );

          const input = shellProcess.input.getWriter();
          terminal.onData((data) => {
            input.write(data);
          });

          return shellProcess;
        };

        startShell(terminal);

        webcontainer.on("server-ready", (port, url) => {
          setUrl(url);
          setLoading(false);
        });
      }
    };

    init();

    return () => {
      if (webcontainer) {
        webcontainer.dispose();
      }
    };
  }, [file]);

  const handleFileClick = (filePath, content) => {
    setSelectedFile(filePath);
    setUpdatedContent(content); // Set content to Monaco editor
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-blue-500 to-purple-700">
      <div className="flex flex-col md:flex-row w-full h-[60vh] gap-4 p-4">
        
        {/* Left Section: File Explorer */}
        <div className=" p-4 w-[10%] bg-white rounded-lg shadow-lg overflow-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">File Explorer</h2>
          {file && (
            <FileComponent onFileClick={handleFileClick} file={JSON.parse(file)} />
          )}
        </div>

        {/* Middle Section: Monaco Editor */}
        <div className=" w-[50%] p-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Editor  {selectedFile}</h2>
          {file && (
            <Monaco
              file={JSON.parse(file)}
              content={updatedContent}
              setContent={setUpdatedContent}
            />
          )}
        </div>

        {/* Right Section: Actions & Preview */}
        <div className=" w-[40%] flex-col justify-center items-center  p-6 bg-white shadow-lg rounded-lg">
        <div>
        <button
            onClick={updateFile}
            className="  py-3 mb-4 text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-lg transition duration-300 ease-in-out"
          >
            Save Changes
          </button>
        </div>
          

          {loading ? (
            <div className=" text-center text-lg text-gray-500">Loading...</div>
          ) : (
            <div className="h-full">
            <iframe
              src={url}
              className="w-full h-full rounded-lg shadow-lg"
              title="Preview"
            />
          </div>
          
          )}
        </div>
      </div>

      {/* Bottom Section: Terminal */}
      <div className="w-full bg-black p-4 text-white mt-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Terminal</h2>
        <div ref={terminalRef} className="h-60"></div>
      </div>
    </div>
  );
};

export default Builder;
