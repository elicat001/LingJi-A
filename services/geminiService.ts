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
 * Enhanced to include Yearly, Monthly, and Daily fortunes.
 */
export const getBaZiAnalysis = async (
  name: string,
  gender: string,
  birthDate: string,
  birthTime: string,
  query: string
): Promise<string> => {
  try {
    const now = new Date();
    // Format: 2023年10月27日 星期五
    const currentDateStr = now.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      weekday: 'long' 
    });

    const prompt = `
    Role: You are "LingJi Zi" (灵机子), a master of BaZi (Four Pillars of Destiny).

    User Profile:
    - Name: ${name}
    - Gender: ${gender}
    - Gregorian Birth Date: ${birthDate}
    - Birth Time: ${birthTime}
    - **Analysis Target Date (Current Date)**: ${currentDateStr}

    Task: Perform a comprehensive life and current fortune analysis.

    1. **Chart Calculation (排盘)**: 
       - Calculate the User's Four Pillars (Year, Month, Day, Hour) based on Birth Date/Time.
       - Identify the **Current** Time Pillars (Year, Month, Day) for ${currentDateStr}.
    
    2. **Core Destiny Analysis (命局简析)**:
       - Identify the Day Master (日主) and its strength (旺衰).
       - Identify the Useful God (喜用神) and Taboo (忌神).
       - Briefly describe the personality and core potential.

    3. **Time-Based Fortune Analysis (流运推演)**:
       - **Yearly Fortune (流年运势)**: Analyze the interaction between the current year's pillar and the user's natal chart. Focus on career, wealth, and health for this year.
       - **Monthly Fortune (流月运势)**: Specific guidance for the current month. What energies are dominant?
       - **Daily Fortune (今日运势)**: Specific guidance for today (${currentDateStr}). What activity is auspicious? What should be avoided?

    4. **User Query Response (答疑)**:
       - Address the user's specific question: "${query || 'General Fortune'}"

    5. **Actionable Advice (开运建议)**:
       - Provide 1-2 concrete actions (lucky color, direction, accessory, or behavior) suitable for the current period.

    Format:
    - Use Markdown.
    - Use clear headings like "### 📅 今日运势".
    - Tone: Professional, authoritative, warm, yet grounded.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_BASE,
        temperature: 0.7,
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