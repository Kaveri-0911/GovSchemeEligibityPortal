import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// Update the import path below if eligibilityChecker.ts is in a different location
import { checkEligibility } from "./logic/eligibilityChecker";
import { VoiceProcessor } from "./voiceProcessor";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// If you need Request and Response types, import them like this:
// import { Request, Response } from 'express';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/api/ivr-check", (req, res) => {
  const { age, income } = req.body;
  if (!age || !income) return res.status(400).send("Missing data");

  try {
    const matchedSchemes = checkEligibility(age, income);
    const reply = matchedSchemes.length
      ? `You are eligible for: ${matchedSchemes
          .map((s: { name: string }) => s.name)
          .join(", ")}.`
      : "Sorry, no schemes match your details.";
    return res.send(reply);
  } catch {
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/api/voice-check", async (req, res) => {
  const { audio } = req.body;
  if (!audio) return res.status(400).send("Missing audio data");

  try {
    const voiceProcessor = new VoiceProcessor();
    const audioBuffer = Buffer.from(audio, "base64");
    const response = await voiceProcessor.processVoiceInput(audioBuffer);
    return res.send(response);
  } catch {
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/api/make-call", (req, res) => {
  const { to, message } = req.body;
  if (!to || !message) return res.status(400).send("Missing required data");

  client.calls
    .create({
      twiml: `<Response><Say>${message}</Say></Response>`,
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER
    })
    .then(call => {
      console.log(`Call initiated with SID: ${call.sid}`);
      res.json({ success: true, callSid: call.sid });
    })
    .catch(error => {
      console.error(`Error initiating call: ${error.message}`);
      res.status(500).json({ success: false, error: error.message });
    });
});

app.listen(PORT, () => console.log(`IVR backend running on port ${PORT}`));
