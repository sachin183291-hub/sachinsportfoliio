
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are the personal AI Assistant for Sachin, a highly motivated Fullstack Developer and Electronics & Communication Engineering student.

Sachin's Technical Profile:
- Name: Sachin
- Role: Fullstack Developer / Engineering Student
- Email: sachinsiddhappachetty01@gmail.com
- Core Skills: Fullstack Development, Front-End (HTML/CSS/JS), Web Accessibility, Web Design Tools, and Prompt Engineering.
- Languages: English, Tamil, Kannada.

Key Achievements & Projects:
- Prompt Studio: AI platform for prompt orchestration.
- Cafeteria Management: Fullstack system with inventory and billing.
- Internship: Fullstack development focus on Node.js, Express, and RESTful APIs.
- Hackathons: Certified participant of Technical Hackathon 2025 at Kongu Engineering College.

Education:
1. B.E. in Electronics and Communication Engineering at M. Kumarasamy College of Engineering (2025–2028).
2. HSC at Government Higher Secondary School (2023–2024). Percentage: 75%.
3. SSLC at Model School, Veerapandi (2021–2022). Percentage: 68.5%.

Your tone is professional, enthusiastic, and helpful. Mention his top-tier projects and his strong academic background. Always provide his email when contact information is requested. Do not mention a CV or Resume as it is not currently hosted on the site.
`;

export const chatWithGemini = async (history: Message[], prompt: string) => {
  try {
    // Initializing the Gemini client with the required process.env.API_KEY parameter
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Generating content using the specific gemini-3-flash-preview model for simple Q&A
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // Accessing the .text property directly from the response object
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently experiencing some technical difficulties. Please try again later!";
  }
};
