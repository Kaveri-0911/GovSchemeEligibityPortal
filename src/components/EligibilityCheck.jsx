import React, { useState } from "react";
import { translate } from "../project/ivr-backend/translator";
import "./EligibilityCheck.css";

const EligibilityCheck = () => {
  const [language, setLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState(null);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const startRecording = () => {
    setIsRecording(true);
    // TODO: Implement voice recording logic
  };

  const stopRecording = () => {
    setIsRecording(false);
    // TODO: Process recorded voice and get eligibility result
    // Mock result for now
    const mockResult = translate(
      "You are eligible for: Pradhan Mantri Awas Yojana",
      language
    );
    setResult(mockResult);
  };

  return (
    <div className="eligibility-check">
      <h1>{translate("Check Eligibility", language)}</h1>

      <div className="language-selector">
        <label>{translate("Select Language:", language)}</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
        </select>
      </div>

      <div className="voice-input">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={isRecording ? "recording" : ""}
        >
          {isRecording
            ? translate("Stop Recording", language)
            : translate("Start Recording", language)}
        </button>
      </div>

      {result && (
        <div className="result">
          <h3>{result}</h3>
        </div>
      )}
    </div>
  );
};

export default EligibilityCheck;
