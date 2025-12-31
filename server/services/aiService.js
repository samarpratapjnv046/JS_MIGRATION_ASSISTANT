const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function migrateCode(code) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Migrate the following JavaScript code to modern ES6+ syntax.
- Replace var with const/let where appropriate
- Convert functions to arrow functions if suitable
- Apply modern JavaScript best practices
- Ensure functionality remains identical

IMPORTANT RULES:
- Return ONLY the migrated code
- No explanation
- No markdown
- No extra text

Original code:
${code}
`;

    const result = await model.generateContent(prompt);

    const migratedCode = result.response.text().trim();

    if (!migratedCode) {
      throw new Error("Empty response from Gemini");
    }

    return migratedCode;
  } catch (error) {
    console.error("Error migrating code:", error?.message || error);
    throw new Error("Failed to migrate code using Gemini");
  }
}

module.exports = { migrateCode };
