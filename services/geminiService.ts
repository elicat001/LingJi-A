import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION_BASE } from "../constants";

// Ensure API key is available
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

// Helper to clean base64 string
const cleanBase64 = (dataUrl: string) => {
  return dataUrl.split(',')[1];
};

/**
 * Perform BaZi analysis based on user profile.
 * Enhanced to include Yearly, Monthly, and Daily fortunes with configurable target date.
 */
export const getBaZiAnalysis = async (
  name: string,
  gender: string,
  birthDate: string,
  birthTime: string,
  query: string,
  targetDateStr?: string
): Promise<string> => {
  try {
    const dateObj = targetDateStr ? new Date(targetDateStr) : new Date();
    // Format: 2023年10月27日 星期五
    const analysisDateStr = dateObj.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      weekday: 'long' 
    });

    const prompt = `
    Role: You are "LingJi Zi" (灵机子), a profound master of BaZi (Four Pillars of Destiny) and I Ching.

    User Profile:
    - Name: ${name}
    - Gender: ${gender}
    - Gregorian Birth Date: ${birthDate}
    - Birth Time: ${birthTime}
    - **Analysis Target Date**: ${analysisDateStr}

    Task: Perform a deep, comprehensive fortune analysis focusing on the specific energies of the Year, Month, and Day relative to the user's Natal Chart.

    Structure & Content Requirements (Strict Markdown Format):

    1.  **🏷️ 命盘与时空 (Destiny & Space-Time)**
        *   **Natal Chart (本命)**: Display the user's Four Pillars (Year, Month, Day, Hour).
        *   **Current Time (流年流月流日)**: Convert ${analysisDateStr} to the **Lunar Date** and display the **Current Pillars** (Year, Month, Day).
        *   **Day Master Status**: Identify the Day Master element (e.g., Yang Fire) and its strength in the current season.

    2.  **📅 流年与流月 (Yearly & Monthly Energies)**
        *   **Yearly Luck**: Interaction between Natal Chart and current Year Pillar (Tai Sui).
        *   **Monthly Focus**: Key theme for this month (Wealth, Career, Relationships, or Health).
        *   **Advice**: One sentence summary of the general trend.

    3.  **☀️ 今日运势 (Daily Fortune for ${analysisDateStr})**
        *   **Fortune Score**: [0-100]
        *   **Energy Reading**: Describe the mood (e.g., "Heavenly Stem Combine", "Earthly Branch Clash").
        *   **Gods & Killings (神煞)**: List active stars today (e.g., Nobleman, Peach Blossom, Traveling Horse).
        *   **Lucky Hours (吉时)**: List the two best 2-hour periods today.
        *   **Direction**: Wealth God (财神) & Joy God (喜神) directions.

    4.  **✅ 每日宜忌 (Yi & Ji)**
        *   **宜 (Do)**:
            *   [Activity 1]
            *   [Activity 2]
            *   [Activity 3]
        *   **忌 (Don't)**:
            *   [Activity 1]
            *   [Activity 2]
            *   [Activity 3]

    5.  **💡 答疑解惑 (Q&A)**
        *   Address the user's specific query with depth: "${query || 'Please provide general guidance for my current path.'}"

    6.  **🔮 开运锦囊 (Remedies)**
        *   **Lucky Color**: [Color]
        *   **Lucky Number**: [Number]
        *   **Action**: A specific behavioral or Feng Shui tip for today.

    Tone: Mystical, authoritative, empathetic, and culturally rich. Use professional BaZi terminology (e.g., "Seven Killings", "Direct Wealth") but explain them simply.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_BASE,
        temperature: 0.75,
      },
    });

    return response.text || "大师正在入定，请稍后再试。";
  } catch (error) {
    console.error("BaZi Analysis Error:", error);
    return "天机不可泄露（网络连接错误，请重试）。";
  }
};

/**
 * Perform Vision analysis for Palmistry, Face Reading, or Feng Shui.
 */
export const getVisionAnalysis = async (
  imageBase64: string,
  type: 'palm' | 'face' | 'fengshui',
  userQuery?: string
): Promise<string> => {
  try {
    let specificInstruction = "";
    
    if (type === 'palm') {
      specificInstruction = `
      Analyze this image as a Palmistry expert. 
      Identify: Life Line, Head Line, Heart Line.
      Provide a fortune summary based on these lines.
      If no palm is visible, reply with "INVALID_IMAGE".
      `;
    } else if (type === 'face') {
      specificInstruction = `
      Analyze this image as a Physiognomy (Face Reading) expert.
      Identify key facial features and their meanings regarding fortune, career, and health (general wellness only).
      If no face is visible, reply with "INVALID_IMAGE".
      `;
    } else if (type === 'fengshui') {
      specificInstruction = `
      Analyze this image as a Feng Shui Grandmaster.
      Identify furniture placement, light, and flow of Qi.
      List 1-2 Pros and 1-2 Cons (Sha Qi).
      Provide cures/remedies.
      `;
    }

    const cleanData = cleanBase64(imageBase64);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming JPEG/PNG, API is flexible
              data: cleanData
            }
          },
          {
            text: `${specificInstruction}\nUser Query: ${userQuery || "General analysis"}`
          }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_BASE,
      }
    });

    return response.text || "无法解读图像。";
  } catch (error) {
    console.error("Vision Analysis Error:", error);
    return "慧眼蒙尘（图像处理失败，请重试）。";
  }
};

/**
 * Perform Tarot interpretation.
 */
export const getTarotInterpretation = async (
  question: string,
  cards: { past: string; present: string; future: string }
): Promise<string> => {
  try {
    const prompt = `
    User is performing a Tarot Divination.
    Question: "${question}"
    
    Spread:
    1. Past: ${cards.past}
    2. Present: ${cards.present}
    3. Future: ${cards.future}

    Interpret these cards together to answer the question. Provide a cohesive narrative.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_BASE,
        temperature: 0.8,
      },
    });

    return response.text || "牌面模糊，请诚心再试。";
  } catch (error) {
    console.error("Tarot Error:", error);
    return "灵力不足（连接失败）。";
  }
};