import React, { useState } from "react";
import { sendVerificationSMS } from "../services/twilioService";

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await sendVerificationSMS(phoneNumber);
      if (result.success) {
        alert("Verification code sent!");
      } else {
        setError("Failed to send verification code");
      }
    } catch (err) {
      setError("Error sending verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = () => {
    // In production, verify the code matches what was sent
    if (verificationCode === "123456") {
      // Replace with actual verification
      setIsVerified(true);
    } else {
      setError("Invalid verification code");
    }
  };

  return (
    <div className="phone-verification">
      <h2>Phone Verification</h2>
      <div>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button onClick={handleSendCode} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Verification Code"}
        </button>
      </div>

      {!isVerified && (
        <div>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
          />
          <button onClick={handleVerifyCode}>Verify</button>
        </div>
      )}

      {isVerified && <p>Phone number verified successfully!</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PhoneVerification;
