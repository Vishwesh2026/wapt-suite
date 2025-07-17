import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const API = `${BACKEND_URL}/scan`;

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [url, setUrl] = useState("");
  const [param, setParam] = useState("");
  const [toolResult, setToolResult] = useState(null);
  const [error, setError] = useState(null);

  const launchTool = async (scanType) => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    if ((scanType === "sql_injection" || scanType === "xss") && !param) {
      setError("Please enter a parameter for this scan type");
      return;
    }
    setError(null);
    setToolResult(null);

    try {
      const formData = new FormData();
      formData.append("url", url);
      if (scanType === "sql_injection" || scanType === "xss") {
        formData.append("param", param);
      }
      formData.append("scan_type", scanType);

      const response = await axios.post(API, formData);
      setToolResult(response.data);
    } catch (e) {
      setError(`Error running ${scanType}: ${e.response?.data?.error || e.message}`);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="content-section">
            <h2>Welcome to WAPT</h2>
            <p>Web Application Penetration Testing Suite</p>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>Security Assessment</h3>
                <p>Comprehensive web application security testing</p>
              </div>
              <div className="feature-card">
                <h3>Vulnerability Detection</h3>
                <p>Advanced scanning and detection capabilities</p>
              </div>
              <div className="feature-card">
                <h3>Reporting</h3>
                <p>Detailed security reports and recommendations</p>
              </div>
            </div>
          </div>
        );
      case "description":
        return (
          <div className="content-section">
            <h2>WAPT - Web Application Penetration Testing</h2>
            <div className="description-content">
              <p>
                WAPT (Web Application Penetration Testing) is a comprehensive
                security testing methodology designed to identify and assess
                vulnerabilities in web applications. Our platform provides
                professional-grade tools and techniques used by security
                professionals worldwide.
              </p>
              <h3>Key Features:</h3>
              <ul>
                <li>
                  <strong>Automated Scanning:</strong> Comprehensive vulnerability
                  detection across multiple attack vectors
                </li>
                <li>
                  <strong>Manual Testing Tools:</strong> Professional toolkit for
                  in-depth security assessment
                </li>
                <li>
                  <strong>OWASP Top 10 Coverage:</strong> Complete testing for the
                  most critical web application security risks
                </li>
                <li>
                  <strong>Custom Payloads:</strong> Flexible testing with
                  customizable attack scenarios
                </li>
                <li>
                  <strong>Detailed Reporting:</strong> Professional reports with
                  remediation recommendations
                </li>
              </ul>
              <h3>Testing Methodology:</h3>
              <p>
                Our testing approach follows industry best practices and includes
                reconnaissance, vulnerability identification, exploitation testing,
                and comprehensive reporting. The platform supports both
                authenticated and unauthenticated testing scenarios.
              </p>
              <h3>Security Standards:</h3>
              <p>
                WAPT adheres to international security standards including OWASP,
                NIST, and ISO 27001 guidelines, ensuring comprehensive coverage of
                web application security testing requirements.
              </p>
            </div>
          </div>
        );
      case "tools":
        return (
          <div className="content-section">
            <h2>Penetration Testing Tools</h2>
            <div className="input-section">
              <label>
                Target URL:
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="input-field"
                />
              </label>
              <label>
                Parameter (for SQL Injection/XSS):
                <input
                  type="text"
                  value={param}
                  onChange={(e) => setParam(e.target.value)}
                  placeholder="e.g., id"
                  className="input-field"
                />
              </label>
            </div>
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            {toolResult && (
              <div className="tool-result">
                <h3>Scan Results</h3>
                {toolResult.results ? (
                  <ul>
                    {toolResult.results.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{toolResult.error || "No results returned"}</p>
                )}
              </div>
            )}
            <div className="tools-grid">
              <div className="tool-card">
                <h3>SQL Injection Scanner</h3>
                <p>Advanced SQL injection vulnerability detection</p>
                <div className="tool-actions">
                  <button
                    className="tool-button"
                    onClick={() => launchTool("sql_injection")}
                  >
                    Launch Tool
                  </button>
                </div>
              </div>
              <div className="tool-card">
                <h3>XSS Detector</h3>
                <p>Cross-site scripting vulnerability assessment</p>
                <div className="tool-actions">
                  <button
                    className="tool-button"
                    onClick={() => launchTool("xss")}
                  >
                    Launch Tool
                  </button>
                </div>
              </div>
              <div className="tool-card">
                <h3>CSRF Scanner</h3>
                <p>Cross-site request forgery vulnerability check</p>
                <div className="tool-actions">
                  <button
                    className="tool-button"
                    onClick={() => launchTool("csrf")}
                  >
                    Launch Tool
                  </button>
                </div>
              </div>
              {/* <div className="tool-card">
                <h3>Web Crawler</h3>
                <p>Automated web application discovery and mapping</p>
                <div className="tool-actions">
                  <button className="tool-button" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>
              <div className="tool-card">
                <h3>Authentication Bypass</h3>
                <p>Authentication and authorization testing tools</p>
                <div className="tool-actions">
                  <button className="tool-button" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>
              <div className="tool-card">
                <h3>Directory Bruteforcer</h3>
                <p>Hidden directory and file discovery</p>
                <div className="tool-actions">
                  <button className="tool-button" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>
              <div className="tool-card">
                <h3>Payload Generator</h3>
                <p>Custom payload creation and testing</p>
                <div className="tool-actions">
                  <button className="tool-button" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>*/}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-image">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxjeWJlcnNlY3VyaXR5fGVufDB8fHx8MTc1MjE4NDY0OHww&ixlib=rb-4.1.0&q=85"
            alt="WAPT Security"
            className="header-img"
          />
        </div>
      </div>

      {/* Navigation Section */}
      <div className="navigation-section">
        <div className="nav-buttons">
          <button
            className={`nav-button ${activeSection === "home" ? "active" : ""}`}
            onClick={() => setActiveSection("home")}
          >
            <span>HOME</span>
          </button>
          <button
            className={`nav-button ${
              activeSection === "description" ? "active" : ""
            }`}
            onClick={() => setActiveSection("description")}
          >
            <span>DESCRIPTION</span>
          </button>
          <button
            className={`nav-button ${activeSection === "tools" ? "active" : ""}`}
            onClick={() => setActiveSection("tools")}
          >
            <span>TOOLS</span>
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default App;