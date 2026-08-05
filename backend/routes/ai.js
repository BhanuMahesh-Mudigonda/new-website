import express from 'express';
import {
  chatWithAssistant,
  recommendPackage,
  searchGallery,
  generateCaption,
  comparePackages,
  answerFaq
} from '../services/aiService.js';

const router = express.Router();

// Error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 1. AI Assistant Chat
router.post('/chat', asyncHandler(async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required.' });
  }
  const reply = await chatWithAssistant(messages);
  res.json({ reply });
}));

// 2. Smart Package Recommendation
router.post('/recommend-package', asyncHandler(async (req, res) => {
  const eventDetails = req.body;
  const recommendation = await recommendPackage(eventDetails);
  res.json({ recommendation });
}));

// 3. Smart Gallery Search
router.post('/search-gallery', asyncHandler(async (req, res) => {
  const { query, availableImages } = req.body;
  if (!query || !availableImages) {
    return res.status(400).json({ error: 'Query and availableImages are required.' });
  }
  const matchingIds = await searchGallery(query, availableImages);
  res.json({ matchingIds });
}));

// 4. AI Caption Generator
router.post('/generate-caption', asyncHandler(async (req, res) => {
  const { imageContext } = req.body;
  if (!imageContext) {
    return res.status(400).json({ error: 'Image context is required.' });
  }
  const captions = await generateCaption(imageContext);
  res.json({ captions });
}));

// 5. AI Package Comparison
router.post('/compare-packages', asyncHandler(async (req, res) => {
  const { packages, userContext } = req.body;
  if (!packages) {
    return res.status(400).json({ error: 'Packages info is required.' });
  }
  const comparison = await comparePackages(packages, userContext);
  res.json({ comparison });
}));

// 6. AI FAQ
router.post('/faq', asyncHandler(async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }
  const answer = await answerFaq(question);
  res.json({ answer });
}));

export default router;
