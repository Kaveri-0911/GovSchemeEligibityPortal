import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const sendVerificationSMS = async (phoneNumber) => {
  try {
    const message = await client.messages.create({
      body: "Your verification code is: 123456", // In production, generate a random code
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error("Twilio SMS error:", error);
    return { success: false, error: error.message };
  }
};

export const makeVoiceCall = async (phoneNumber) => {
  try {
    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml", // Replace with your TwiML URL
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    return { success: true, callId: call.sid };
  } catch (error) {
    console.error("Twilio Voice error:", error);
    return { success: false, error: error.message };
  }
};
