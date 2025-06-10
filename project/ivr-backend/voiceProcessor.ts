import { checkEligibility } from "./logic/eligibilityChecker";
import { translate } from "./translator";
import { SpeechToText } from "./speechToText";

export class VoiceProcessor {
  private stt: SpeechToText;
  private language: string;

  constructor() {
    this.stt = new SpeechToText();
    this.language = "en";
  }

  async processVoiceInput(audioData: Buffer): Promise<string> {
    // Detect language from audio
    this.language = await this.stt.detectLanguage(audioData);

    // Convert speech to text
    const { age, income } = await this.stt.convertToText(
      audioData,
      this.language
    );

    // Check eligibility
    const schemes = checkEligibility(age, income);

    // Generate response in detected language
    return this.generateResponse(schemes);
  }

  private generateResponse(schemes: any[]): string {
    let response: string;

    if (schemes.length > 0) {
      const schemeNames = schemes.map((s) => s.name).join(", ");
      response = translate(
        `You are eligible for: ${schemeNames}`,
        this.language
      );
    } else {
      response = translate(
        "Sorry, no schemes match your details.",
        this.language
      );
    }

    return response;
  }
}
