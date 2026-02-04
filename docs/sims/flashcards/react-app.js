import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FlashcardApp = () => {
  const [mode, setMode] = useState('create'); // 'create', 'loading', 'study'
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState('describe');
  const [animating, setAnimating] = useState(false);

  const generateFlashcards = async () => {
    if (!topic.trim()) return;
    
    setMode('loading');
    
    let prompt;
    
    if (activeTab === 'paste') {
      prompt = `You are tasked with extracting flashcard content from a given text chunk. Your goal is to identify key terms and their corresponding definitions or explanations that would be suitable for creating flashcards.

Here's the text chunk you need to analyze:
<text_chunk>
${topic}
</text_chunk>

Guidelines for extracting flashcard content:
1. Identify important terms, concepts, or phrases that are central to the text's topic.
2. For each term, find a corresponding definition, explanation, or key information from the text.
3. Ensure that the term and definition pairs are concise and clear.
4. Extract only the most relevant and significant information.
5. Aim for a balance between comprehensiveness and brevity.

Create between 3-10 flashcards based on the content available.

Respond ONLY with a valid JSON array in this exact format:
[
  {
    "front": "Term or concept (keep concise, 1-5 words ideal)",
    "back": "Definition or explanation from the text (clear and educational, under 50 words)"
  }
]

DO NOT include any text outside the JSON array.`;
    } else {
      prompt = `You are tasked with creating educational flashcards about "${topic}". Your goal is to create concise, clear, and accurate flashcard pairs that would help someone learn this topic.

Guidelines for creating effective flashcards:
1. Each flashcard should have a clear term/concept on one side and a concise definition/explanation on the other
2. Terms should be specific and focused (ideally 1-5 words)
3. Definitions should be clear and brief (ideally under 50 words)
4. Focus on the most important concepts related to the topic
5. Make the content educational, accurate, and helpful for learning

Based on the topic, adapt your approach:
* For locations (countries, cities): Use the location as the term and key facts as the definition
* For historical subjects: Use events/people as terms and dates/significance as definitions
* For scientific topics: Use concepts/terms as the front and explanations as the back
* For language learning: Use words in one language as terms and translations as definitions

Please provide exactly 10 flashcards in this JSON format - don't include any text outside the JSON:
[
  {
    "front": "Term or concept",
    "back": "Definition or explanation"
  }
]`;
    }
    
    try {
      const response = await window.claude.complete(prompt);
      const cards = JSON.parse(response);
      setFlashcards(cards);
      setCurrentIndex(0);
      setFlipped(false);
      setMode('study');
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('Failed to generate flashcards. Please try again.');
      setMode('create');
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setFlipped(false);
        setCurrentIndex(currentIndex + 1);
        setTimeout(() => setAnimating(false), 50);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setFlipped(false);
        setCurrentIndex(currentIndex - 1);
        setTimeout(() => setAnimating(false), 50);
      }, 150);
    }
  };

  const handleKeyPress = (e) => {
    if (mode === 'study') {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleFlip();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, currentIndex, flashcards.length, flipped, animating]);

  if (mode === 'create') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#6A9BCC' }}>
        <div className="w-full max-w-lg p-8">
          <h1 className="text-white text-4xl font-bold text-center mb-8">Create flashcards</h1>
          
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-0.5 rounded-full inline-flex">
              <button
                onClick={() => setActiveTab('paste')}
                className={`px-6 py-2 rounded-full font-medium transition-all text-base ${
                  activeTab === 'paste' 
                    ? 'bg-white text-gray-700 shadow-md' 
                    : 'text-white hover:text-white/90'
                }`}
              >
                Paste text
              </button>
              <button
                onClick={() => setActiveTab('describe')}
                className={`px-6 py-2 rounded-full font-medium transition-all text-base ${
                  activeTab === 'describe' 
                    ? 'bg-white text-gray-700 shadow-md' 
                    : 'text-white hover:text-white/90'
                }`}
              >
                Describe topic
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={activeTab === 'describe' 
                ? "Describe a topic Claude will generate the details...\n\ne.g. capitals of the world\ne.g. fun facts about San Diego" 
                : "Paste your text here..."}
              className="w-full h-52 text-gray-900 placeholder-gray-400 resize-none focus:outline-none"
              style={{ fontSize: '18px', lineHeight: '1.6' }}
            />
          </div>
          
          <button
            onClick={generateFlashcards}
            className="w-full mt-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors text-lg"
          >
            Generate flashcards
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#6A9BCC' }}>
        <div className="text-center">
          <h1 className="text-white text-4xl font-medium mb-4">Generating your flashcard set...</h1>
          <p className="text-white/80 mb-8">This may take a while depending on the upload...</p>
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'study') {
    const currentCard = flashcards[currentIndex];
    
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#6A9BCC' }}>
        <div className="w-full max-w-2xl px-8">
          <div className="relative" style={{ perspective: '1000px' }}>
            <div
              className={`relative w-full h-96 transition-all duration-700 transform-style-preserve-3d cursor-pointer ${
                flipped ? 'rotate-x-180' : ''
              } ${animating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
              onClick={handleFlip}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card */}
              <div 
                className="absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-center flex-1 flex items-center justify-center">
                  <h2 className="text-4xl font-medium text-gray-800">{currentCard.front}</h2>
                </div>
                <p className="text-gray-500 mt-auto">Use ↑↓ arrows or click to flip</p>
              </div>
              
              {/* Back of card */}
              <div 
                className="absolute inset-0 bg-white rounded-3xl shadow-xl flex items-center justify-center p-8 rotate-x-180 backface-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateX(180deg)'
                }}
              >
                <div className="text-center">
                  <p className="text-xl text-gray-700 leading-relaxed">{currentCard.back}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full transition-all ${
                currentIndex === 0 
                  ? 'bg-white/20 text-white/50 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            
            <span className="mx-6 text-white text-lg font-medium">
              {currentIndex + 1} / {flashcards.length}
            </span>
            
            <button
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              className={`p-3 rounded-full transition-all ${
                currentIndex === flashcards.length - 1 
                  ? 'bg-white/20 text-white/50 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setMode('create');
                setTopic('');
                setFlashcards([]);
              }}
              className="text-white/70 hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Create new flashcards
            </button>
          </div>
        </div>
      </div>
    );
  }
};

// Add CSS for 3D flip animation
const style = document.createElement('style');
style.textContent = `
  .rotate-x-180 {
    transform: rotateX(180deg);
  }
  .backface-hidden {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  @keyframes slideInFromRight {
    from {
      transform: translateX(20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideInFromLeft {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

export default FlashcardApp;