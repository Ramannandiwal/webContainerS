import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [tailwindInstalled, setTailwindInstalled] = useState(false);
  const [reactRouterInstalled, setReactRouterInstalled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    navigate('/builder', {
        state: { 
            name: projectName, 
            tailwind: tailwindInstalled, 
            reactRouter: reactRouterInstalled 
        }
    });
};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #7F00FF, #9B4DCA)",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#FFFFFF",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Create Your React App Without Using VSCode
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label
          htmlFor="name"
          style={{
            display: "block",
            marginBottom: "10px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#4A4A4A",
          }}
        >
          Enter your Project Name:
        </label>
        <input
          id="name"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            marginBottom: "20px",
            outline: "none",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Do You Want Tailwind Installed?
          </label>
          <input
            type="radio"
            id="tailwind-yes"
            name="tailwind"
            value="yes"
            checked={tailwindInstalled === true}
            onChange={() => setTailwindInstalled(true)}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="tailwind-yes" style={{ marginRight: "20px", color: "#4A4A4A" }}>
            Yes
          </label>
          <input
            type="radio"
            id="tailwind-no"
            name="tailwind"
            value="no"
            checked={tailwindInstalled === false}
            onChange={() => setTailwindInstalled(false)}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="tailwind-no" style={{ color: "#4A4A4A" }}>
            No
          </label>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Do you Want React Router?
          </label>
          <input
            type="radio"
            id="react-router-yes"
            name="react-router"
            value="yes"
            checked={reactRouterInstalled === true}
            onChange={() => setReactRouterInstalled(true)}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="react-router-yes" style={{ marginRight: "20px", color: "#4A4A4A" }}>
            Yes
          </label>
          <input
            type="radio"
            id="react-router-no"
            name="react-router"
            value="no"
            checked={reactRouterInstalled === false}
            onChange={() => setReactRouterInstalled(false)}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="react-router-no" style={{ color: "#4A4A4A" }}>
            No
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#9B4DCA",
            color: "#FFFFFF",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#7F00FF")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#9B4DCA")}
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default Homepage;
