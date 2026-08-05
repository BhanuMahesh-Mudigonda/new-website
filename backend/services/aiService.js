import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

let openai = null;

const ensureConfigured = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured.');
  }
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
};

/**
 * AI Assistant Chat
 */
export const chatWithAssistant = async (messages) => {
  ensureConfigured();
  const systemPrompt = `You are a professional, elegant, and helpful luxury wedding photography assistant for PB Photography (based in Vijayawada). 
Your goal is to assist clients with package details, styling advice, poses, and general inquiries. 
Keep your responses concise, warm, and highly professional. Format responses in plain text or simple markdown (avoid complex formatting).
Do not invent prices if not provided in context. If unsure about specific pricing, suggest they book an appointment for a custom quote.
PB Photography specializes in Telugu weddings, traditional ceremonies, pre-wedding, candid, and cinematic films.`;

  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 500,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Chat Error:", error);
    throw new Error("Failed to get response from AI assistant.");
  }
};

/**
 * Smart Package Recommendation
 */
export const recommendPackage = async (eventDetails) => {
  ensureConfigured();
  const { eventType, budget, guestCount, location, indoorOutdoor, days } = eventDetails;
  const prompt = `Based on the following event details, recommend the best luxury photography package for the client.
Event Type: ${eventType || 'Not specified'}
Budget: ${budget || 'Not specified'}
Guest Count: ${guestCount || 'Not specified'}
Location: ${location || 'Not specified'}
Setting: ${indoorOutdoor || 'Not specified'}
Number of Days: ${days || 'Not specified'}

PB Photography Packages (For Context):
1. Silver Package (Basic, smaller events, budget-friendly)
2. Gold Package (Standard weddings, good coverage, medium budget)
3. Diamond / Premium Package (Luxury, multi-day, large guest count, drone coverage, cinematic, high budget)

Respond with a short, warm, and professional recommendation explaining WHY this package is the best fit. Be concise (max 3-4 sentences).`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Recommendation Error:", error);
    throw new Error("Failed to generate recommendation.");
  }
};

/**
 * Smart Gallery Search
 */
export const searchGallery = async (query, availableImagesMetadata) => {
  ensureConfigured();
  const prompt = `You are a smart gallery search assistant. The user wants to find images matching: "${query}".
Here is a list of available images with their metadata (ID, category, alt text):
${JSON.stringify(availableImagesMetadata)}

Return ONLY a JSON object with a single key "ids" that contains an array of the string IDs of the images that best match the query. 
Example format: {"ids": ["img1", "img2"]}. If no images match, return {"ids": []}.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });
    return JSON.parse(completion.choices[0].message.content).ids;
  } catch (error) {
    console.error("OpenAI Search Error:", error);
    return []; // fallback to empty array on error
  }
};

/**
 * AI Caption Generator
 */
export const generateCaption = async (imageContext) => {
  ensureConfigured();
  const prompt = `You are an expert social media manager for a luxury wedding photography studio. 
Generate captions for the following photograph context: ${imageContext}

Please provide the response in a JSON object with the following keys:
- "instagram": An engaging Instagram caption with suitable emojis and hashtags.
- "facebook": A slightly longer, storytelling Facebook caption.
- "quote": A short, romantic wedding quote suitable for this image.
- "description": An emotional, poetic description of the moment.

Example format:
{
  "instagram": "...",
  "facebook": "...",
  "quote": "...",
  "description": "..."
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI Caption Error:", error);
    throw new Error("Failed to generate captions.");
  }
};

/**
 * AI Package Comparison
 */
export const comparePackages = async (packages, userContext) => {
  ensureConfigured();
  const prompt = `The user is trying to decide between the following packages:
${packages}

User context (if any): ${userContext || 'None provided'}

Explain the main differences between these packages in a professional, warm tone. 
Recommend which one might be better suited based on typical scenarios (e.g. if they want more cinematic coverage, suggest the premium one). 
Keep it concise (3-4 sentences).`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Compare Error:", error);
    throw new Error("Failed to compare packages.");
  }
};

/**
 * AI FAQ
 */
export const answerFaq = async (question) => {
  ensureConfigured();
  const systemPrompt = `You are the FAQ assistant for PB Photography. 
Answer the following customer question professionally and concisely. 
If the question is about pricing, mention that pricing depends on the scope of the event and they should contact for a custom quote, but give a general idea if standard (e.g. packages start around a certain reasonable luxury price point, but it's best not to give exact numbers unless specified).
If the question is unrelated to wedding photography, politely steer them back.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI FAQ Error:", error);
    throw new Error("Failed to answer FAQ.");
  }
};
