import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// Update the import path below if eligibilityChecker.ts is in a different location
import { checkEligibility } from './logic/eligibilityChecker';

// If you need Request and Response types, import them like this:
// import { Request, Response } from 'express';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/ivr-check', (req, res) => {
  const { age, income } = req.body;
  if (!age || !income) return res.status(400).send('Missing data');

  try {
    const matchedSchemes = checkEligibility(age, income);
    const reply = matchedSchemes.length
      ? `You are eligible for: ${matchedSchemes.map((s: { name: string }) => s.name).join(', ')}.`
      : 'Sorry, no schemes match your details.';
    return res.send(reply);
  } catch {
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => console.log(`IVR backend running on port ${PORT}`));
