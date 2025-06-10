const translations = {
  en: {
    eligible: "You are eligible for:",
    not_eligible: "Sorry, no schemes match your details.",
  },
  hi: {
    eligible: "आप योग्य हैं:",
    not_eligible:
      "क्षमा करें, आपके विवरणों से मेल खाने वाली कोई योजना नहीं है।",
  },
  mr: {
    eligible: "तुम्हाला पात्र आहे:",
    not_eligible: "क्षमस्व, तुमच्या तपशीलांशी जुळणारी कोणतीही योजना नाही.",
  },
};

export function translate(text: string, language: string): string {
  if (text.includes("You are eligible for:")) {
    return `${
      translations[language]?.eligible || translations.en.eligible
    } ${text.split(":")[1].trim()}`;
  } else if (text.includes("Sorry, no schemes match your details.")) {
    return translations[language]?.not_eligible || translations.en.not_eligible;
  }
  return text;
}
