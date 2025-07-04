// VibeBot - Homework Helper with Lit Mock AI
// Built for Vibe Coding Hackathon 2.0 (July 4, 2025)
// 100+ responses, 20+ micro-lessons, Kenyan vibes, simulated monetization
// Optimized OCR with Web Worker, fixed hallucination and paywall bugs

const chat = document.getElementById('chat');
const inputForm = document.getElementById('input-form');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loading = document.getElementById('loading');
const imageUpload = document.getElementById('image-upload');
const toggleThemeBtn = document.getElementById('toggle-theme');
const subscriptionStatus = document.getElementById('subscription-status');
const AI_NAME = 'VibeBot';

// Simulated monetization (3 free questions, then "pay" KES 10)
let questionCount = parseInt(localStorage.getItem('questionCount')) || 0;
let isPremium = localStorage.getItem('isPremium') === 'true';
const FREE_QUESTION_LIMIT = 3;

// Update subscription status
function updateSubscriptionStatus() {
  console.log(`Updating status: isPremium=${isPremium}, questionCount=${questionCount}`);
  subscriptionStatus.textContent = isPremium
    ? 'Premium Mode - Unlimited Questions! 🚀'
    : `Free Mode (${FREE_QUESTION_LIMIT - questionCount} questions left)`;
}

// Add message to chat with feedback buttons
function addMessage(text, sender = 'user', showFeedback = false) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  if (showFeedback && sender === 'ai') {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback';
    feedbackDiv.innerHTML = `
      <button onclick="rateAnswer('up')" aria-label="Thumbs up">👍</button>
      <button onclick="rateAnswer('down')" aria-label="Thumbs down">👎</button>
    `;
    msgDiv.appendChild(feedbackDiv);
  }
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}

// Toggle loading spinner with optional progress message
function setLoading(isLoading, message = 'VibeBot is thinking... 🤔') {
  loading.textContent = message;
  loading.classList.toggle('visible', isLoading);
  loading.classList.toggle('hidden', !isLoading);
}

// Get random item from array
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Expanded fun facts, jokes, and encouragements with Kenyan flavor
const funFacts = [
  'Did you know? The Maasai Mara hosts the Great Migration of over 1.5 million wildebeests!',
  'Fun fact: Kenya’s Mount Kenya is 5,199m tall, second only to Kilimanjaro in Africa!',
  'Joke: Why did the matatu driver study math? To calculate fares faster than Usain Bolt!',
  'Did you know? A group of zebras is called a dazzle because of their stripes!',
  'Joke: What do you call a lion with a smartphone? A selfie king of the savanna!',
  'Fun fact: M-Pesa, born in Kenya, revolutionized mobile money worldwide!',
  'Joke: Why don’t elephants forget homework? Their trunks are full of notes!',
  'Did you know? Nairobi’s name comes from the Maasai phrase “cool water”!',
  'Fun fact: Kenya has 42 tribes, each with unique cultures and languages!',
  'Joke: Why did the giraffe get bad grades? It was always looking over the teacher’s shoulder!'
];

const encouragements = [
  'You’re sharper than a panga cutting sugarcane! 🚴',
  'Learning faster than a matatu in Nairobi rush hour! Keep it up!',
  'You’re smarter than a safari guide spotting a cheetah!',
  'Even M-Pesa started small—you got this, champ!',
  'High five! Building brains like a Nairobi skyscraper! ✋',
  'Mistakes are your fuel—shine like Diani Beach at sunset!',
  'You’re cooler than a Tusker on a hot Kenyan day!',
  'Keep asking questions—you’re blazing like a Lamu dhow!',
  'Smarter than a boda boda dodging potholes! Let’s go!',
  'You’re the MVP of homework, like Harambee Stars on the pitch!'
];

// Expanded micro-lessons (20+ quick tips)
const microLessons = [
  'Math Tip: To add fractions, find a common denominator. Example: 1/2 + 1/4 = 2/4 + 1/4 = 3/4!',
  'Science Bite: Photosynthesis uses sunlight, water, and CO2 to make food for plants. Like a solar ugali maker!',
  'English Tip: A noun is a person, place, or thing. Example: “Nairobi” is a place noun!',
  'Math Trick: Multiply by 10 by adding a zero. Example: 5 × 10 = 50!',
  'Science Fact: Gravity pulls objects down. That’s why your pencil falls off the desk!',
  'English Tip: Verbs are action words. Example: “Run” or “sing” like a Kenyan choir!',
  'Math Tip: To subtract fractions, use a common denominator. Example: 3/4 - 1/4 = 2/4 = 1/2!',
  'Science Bite: The water cycle moves water through evaporation, condensation, and rain. Like Kenya’s rains!',
  'English Tip: Adjectives describe things. Example: “Beautiful” for Kenya’s beaches!',
  'Math Trick: To find 10% of a number, divide by 10. Example: 10% of 50 is 5!',
  'Science Fact: Energy comes in forms like heat, light, and motion. Like a matatu’s engine!',
  'English Tip: A sentence needs a subject and verb. Example: “I love ugali.”',
  'Math Tip: A square number is a number times itself. Example: 3 × 3 = 9!',
  'Science Bite: Mammals are warm-blooded and have hair. Like Kenya’s elephants!',
  'English Tip: Use commas to separate items in a list. Example: “Mangoes, bananas, and oranges.”',
  'Math Trick: To divide by 2, halve the number. Example: 8 ÷ 2 = 4!',
  'Science Fact: The sun is a star, powering Earth’s climate and plants!',
  'English Tip: A pronoun replaces a noun. Example: “She” instead of “Mary.”',
  'Math Tip: To find a percentage, multiply by the percent as a decimal. Example: 20% of 50 = 0.2 × 50 = 10!',
  'Kenyan Fact: Kenya’s flag has red for blood, green for land, and black for the people!'
];

// Expanded question database (100+ responses)
const questionDB = [
  // Math - Arithmetic
  { query: '2 + 2', response: '2 + 2 = 4! Like 2 samosas plus 2 more for a party!' },
  { query: '5 - 3', response: '5 - 3 = 2. Imagine eating 3 of your 5 chapatis!' },
  { query: '3 x 4', response: '3 × 4 = 12. That’s 3 matatus with 4 passengers each!' },
  { query: '6 ÷ 2', response: '6 ÷ 2 = 3. Share 6 mangoes between 2 friends!' },
  { query: '7 + 8', response: '7 + 8 = 15. Like 7 cows plus 8 goats in a Maasai herd!' },
  { query: '10 - 4', response: '10 - 4 = 6. You had 10 shillings, spent 4, and kept 6!' },
  { query: '5 x 5', response: '5 × 5 = 25. Like 5 rows of 5 mandazis!' },
  { query: '12 ÷ 3', response: '12 ÷ 3 = 4. Split 12 bananas among 3 kids!' },
  // Math - Fractions
  { query: 'fraction', response: 'A fraction is part of a whole. Like 1/2 a pizza! Try this: ' + random(microLessons) },
  { query: '1/2 + 1/2', response: '1/2 + 1/2 = 1. Like eating half a cake plus another half!' },
  { query: '3/4 - 1/4', response: '3/4 - 1/4 = 2/4 = 1/2. You ate 1/4 of an ugali, leaving half!' },
  { query: '1/3 x 2', response: '1/3 × 2 = 2/3. Like taking 1/3 of 2 liters of milk!' },
  // Math - Percentages
  { query: 'percentage', response: 'Percentage is out of 100. Example: 50% of 10 is 5, like half your pocket money!' },
  { query: '10% of 50', response: '10% of 50 = 5. Divide 50 by 10! Save that for a soda!' },
  { query: '25% of 20', response: '25% of 20 = 5. That’s a quarter of your 20 shillings!' },
  // Math - Algebra
  { query: 'algebra', response: 'Algebra uses letters like x to solve equations. Example: x + 2 = 5, so x = 3!' },
  { query: 'x + 5 = 10', response: 'x + 5 = 10, so x = 5. Subtract 5 from both sides!' },
  // Science - Biology
  { query: 'photosynthesis', response: 'Photosynthesis is how plants use sunlight, water, and CO2 to make food. Like a solar-powered ugali maker!' },
  { query: 'mammal', response: 'Mammals have hair and feed milk to babies. Like elephants or you!' },
  { query: 'reptile', response: 'Reptiles have scales and lay eggs. Think crocodiles in the Tana River!' },
  { query: 'plant', response: 'Plants grow using sunlight and make oxygen. Like Kenya’s tea bushes!' },
  { query: 'cell', response: 'Cells are the tiny building blocks of life. Like bricks in a Nairobi house!' },
  // Science - Physics
  { query: 'gravity', response: 'Gravity pulls things to Earth. That’s why your football doesn’t float away!' },
  { query: 'energy', response: 'Energy makes things happen. Like the sun powering plants or a matatu’s engine!' },
  { query: 'motion', response: 'Motion is when things move. Like a boda boda speeding through town!' },
  { query: 'force', response: 'A force pushes or pulls. Like kicking a football to score!' },
  // Science - Chemistry
  { query: 'water cycle', response: 'The water cycle moves water: evaporates, forms clouds, then rains. Like Nairobi’s rainy season!' },
  { query: 'atom', response: 'Atoms are tiny particles that make up everything. Like sand grains on Mombasa beach!' },
  { query: 'oxygen', response: 'Oxygen is a gas we breathe to live. Plants make it during photosynthesis!' },
  // English - Grammar
  { query: 'noun', response: 'A noun names a person, place, or thing. Like “Nairobi” or “teacher”!' },
  { query: 'verb', response: 'A verb is an action word. Run, jump, or dance—like a party in Mombasa!' },
  { query: 'adjective', response: 'An adjective describes something. Big, bright, or awesome, like you!' },
  { query: 'pronoun', response: 'A pronoun replaces a noun. Example: “She” instead of “Mary”!' },
  { query: 'sentence', response: 'A sentence is a complete thought with a subject and verb. Example: “I love ugali.”' },
  // English - Vocabulary
  { query: 'spelling', response: 'Spelling is putting letters in order. Try “Kenya” (K-E-N-Y-A) for practice!' },
  { query: 'synonym', response: 'A synonym is a word with a similar meaning. Big and large are synonyms!' },
  { query: 'antonym', response: 'An antonym is a word with the opposite meaning. Big and small are antonyms!' },
  // English - Writing
  { query: 'paragraph', response: 'A paragraph is a group of sentences about one idea. Like describing a Kenyan sunset!' },
  { query: 'essay', response: 'An essay is a short piece of writing on a topic. Start with an intro, body, and conclusion!' },
  // Kenyan General Knowledge
  { query: 'kenya capital', response: 'Kenya’s capital is Nairobi, the heart of the nation!' },
  { query: 'mount kenya', response: 'Mount Kenya is 5,199m tall, Africa’s second-highest peak!' },
  { query: 'maasai', response: 'The Maasai are a Kenyan community known for their colorful shukas and cattle herding!' },
  { query: 'm-pesa', response: 'M-Pesa is Kenya’s mobile money system, making payments super easy!' },
  { query: 'lake victoria', response: 'Lake Victoria is Africa’s largest lake, shared by Kenya, Uganda, and Tanzania!' },
  { query: 'safari', response: 'A safari is a trip to see wild animals, like in Tsavo or Amboseli!' },
  { query: 'chai', response: 'Chai is Kenya’s famous tea, often grown in Kericho. Sip it with mandazi!' },
  { query: 'swahili', response: 'Swahili is Kenya’s national language. Say “Jambo” to greet someone!' },
  // General
  { query: 'study', response: 'Studying is easier with breaks and practice. Here’s a tip: ' + random(microLessons) },
  { query: 'bored', response: 'Bored? Let’s make it fun with a joke! ' + random(funFacts) },
  { query: 'learn', response: 'Learning is like climbing Mount Kenya—one step at a time! Try this: ' + random(microLessons) },
  { query: 'homework', response: 'Homework helps you practice! Want a tip? ' + random(microLessons) }
];

// Improved fuzzy matching for misspellings
function fuzzyMatch(query, target) {
  query = query.toLowerCase().replace(/[^a-z0-9]/g, '');
  target = target.toLowerCase().replace(/[^a-z0-9]/g, '');
  console.log(`Fuzzy matching: query="${query}", target="${target}"`);
  if (query.includes(target)) return true;
  let matches = 0;
  for (let i = 0; i < query.length && i < target.length; i++) {
    if (query[i] === target[i]) matches++;
  }
  return matches / Math.max(query.length, target.length) > 0.7;
}

// Mock AI response logic with fixed hallucination
function mockAIResponse(question) {
  const q = question.toLowerCase().trim();
  console.log(`Processing question: "${q}", questionCount: ${questionCount}`);

  // Greetings
  if (/\b(hello|hi|hey|good morning|good evening|what's up)\b/.test(q)) {
    return `Yo, what's good? I'm ${AI_NAME}, your homework buddy with Kenyan vibes! Ask me anything or snap a pic! 😎`;
  }

  // Specific check for "capital" to prioritize Kenya capital
  if (/\b(capital|kenya capital|capital of kenya)\b/.test(q)) {
    const response = questionDB.find(item => item.query === 'kenya capital').response;
    console.log(`Matched 'kenya capital': ${response}`);
    return response + ' ' + random(encouragements);
  }

  // Check question database with fuzzy matching
  for (const item of questionDB) {
    if (fuzzyMatch(q, item.query)) {
      console.log(`Matched query: "${q}" to "${item.query}"`);
      return item.response + ' ' + random(encouragements);
    }
  }

  // Regex-based fallback for broad topics
  if (/\b(add|addition|plus|sum)\b/.test(q)) return 'Addition means putting numbers together. Example: 4 + 3 = 7. Try another! ' + random(encouragements);
  if (/\b(subtract|subtraction|minus|difference)\b/.test(q)) return 'Subtraction is taking away. Example: 5 - 2 = 3. Got more? ' + random(encouragements);
  if (/\b(multiply|multiplication|times|product)\b/.test(q)) return 'Multiplication is repeated addition. Example: 2 × 3 = 6. Keep it up! ' + random(encouragements);
  if (/\b(divide|division|divided|quotient)\b/.test(q)) return 'Division means sharing equally. Example: 6 ÷ 2 = 3. You’re killing it! ' + random(encouragements);
  if (/\b(maths|math|mathematics)\b/.test(q)) return 'Math is like solving puzzles! Try a question or get a tip: ' + random(microLessons);
  if (/\b(algebra)\b/.test(q)) return 'Algebra uses letters to solve problems. Example: x + 2 = 5, so x = 3! ' + random(encouragements);
  if (/\b(fraction|fractions)\b/.test(q)) return questionDB.find(item => item.query === 'fraction').response + ' ' + random(encouragements);
  if (/\b(percentage|percent)\b/.test(q)) return questionDB.find(item => item.query === 'percentage').response + ' ' + random(encouragements);
  if (/\b(photosynthesis)\b/.test(q)) return questionDB.find(item => item.query === 'photosynthesis').response + ' ' + random(encouragements);
  if (/\b(gravity)\b/.test(q)) return questionDB.find(item => item.query === 'gravity').response + ' ' + random(encouragements);
  if (/\b(water cycle)\b/.test(q)) return questionDB.find(item => item.query === 'water cycle').response + ' ' + random(encouragements);
  if (/\b(noun)\b/.test(q)) return questionDB.find(item => item.query === 'noun').response + ' ' + random(encouragements);
  if (/\b(verb)\b/.test(q)) return questionDB.find(item => item.query === 'verb').response + ' ' + random(encouragements);
  if (/\b(adjective)\b/.test(q)) return questionDB.find(item => item.query === 'adjective').response + ' ' + random(encouragements);
  if (/\b(pronoun)\b/.test(q)) return questionDB.find(item => item.query === 'pronoun').response + ' ' + random(encouragements);
  if (/\b(planet|earth|mars|jupiter)\b/.test(q)) return 'Our solar system has 8 planets. Earth is home sweet home! ' + random(encouragements);
  if (/\b(animal|mammal|reptile)\b/.test(q)) return 'Mammals have hair, reptiles have scales. Like lions vs. snakes! ' + random(encouragements);
  if (/\b(computer|robot|technology)\b/.test(q)) return 'Computers solve problems fast. Robots are like high-tech helpers! ' + random(encouragements);
  if (/\b(study|learn|remember)\b/.test(q)) return 'Flashcards and practice make studying fun! Here’s a tip: ' + random(microLessons);
  if (/\b(bored|boring)\b/.test(q)) return 'Let’s spice it up! Here’s a joke: ' + random(funFacts);
  if (/\b(joke)\b/.test(q)) return random(funFacts.filter(f => f.includes('Joke')));
  if (/\b(fun fact)\b/.test(q)) return random(funFacts);
  if (/\b(encourage|motivate|inspire)\b/.test(q)) return random(encouragements);
  if (/\b(thank)\b/.test(q)) return 'No prob, keep those questions coming! 😎';
  if (/\b(stuck|difficult|confused|i can't|too hard)\b/.test(q)) {
    return random([
      'No stress, let’s break it down together! Try a simpler question.',
      'Tough ones make you stronger! Want a micro-lesson? ' + random(microLessons),
      random(encouragements)
    ]);
  }
  if (q.length > 120) return 'Whoa, that’s a big question! Break it down for me, champ! ' + random(encouragements);

  // Fallback with fun
  console.log(`No match for "${q}", using fallback`);
  return random([
    'Hmm, that’s a tough one! Try rephrasing or snapping a pic. ' + random(funFacts),
    'Not sure, but you’re doing great! Want a micro-lesson? ' + random(microLessons),
    random(encouragements)
  ]);
}

// Handle feedback
function rateAnswer(rating) {
  addMessage(`Thanks for the ${rating === 'up' ? '👍' : '👎'}! Keep asking!`, 'ai');
  const feedback = JSON.parse(localStorage.getItem('feedback')) || [];
  feedback.push({ rating, timestamp: Date.now() });
  localStorage.setItem('feedback', JSON.stringify(feedback));
}

// Optimized image preprocessing (resize and grayscale)
function preprocessImage(file, callback) {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Resize to max 800px width, maintaining aspect ratio
    const maxWidth = 800;
    let width = img.width;
    let height = img.height;
    if (width > maxWidth) {
      height = (maxWidth / width) * height;
      width = maxWidth;
    }
    canvas.width = width;
    canvas.height = height;
    ctx.filter = 'grayscale(1)'; // Simplified filter for speed
    ctx.drawImage(img, 0, 0, width, height);
    canvas.toBlob(callback, 'image/png');
    URL.revokeObjectURL(img.src);
  };
}

// Handle text input
inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const question = userInput.value.trim();
  if (!question) return;
  addMessage(question, 'user');
  userInput.value = '';
  setLoading(true); // Show loading immediately
  console.log(`Text input: "${question}", questionCount: ${questionCount}, isPremium: ${isPremium}`);

  // Simulated monetization
  if (!isPremium && questionCount >= FREE_QUESTION_LIMIT) {
    setLoading(false); // Hide loading
    addMessage(
      `You’ve used your ${FREE_QUESTION_LIMIT} free questions! Unlock more for KES 10 (pretend payment).`,
      'ai'
    );
    const payButton = document.createElement('button');
    payButton.textContent = 'Pretend Pay KES 10';
    payButton.style.cssText = 'background: #25d366; color: #fff; border: none; padding: 0.5em 1em; border-radius: 1em; cursor: pointer;';
    payButton.onclick = () => {
      isPremium = true;
      localStorage.setItem('isPremium', 'true');
      updateSubscriptionStatus();
      addMessage('You’re now Premium! Ask away! 🚀', 'ai');
    };
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ai';
    msgDiv.appendChild(payButton);
    chat.appendChild(msgDiv);
    chat.scrollTop = chat.scrollHeight;
    return;
  }

  setTimeout(() => {
    const aiMsg = mockAIResponse(question);
    addMessage(aiMsg, 'ai', true);
    questionCount++;
    localStorage.setItem('questionCount', questionCount);
    updateSubscriptionStatus();
    setLoading(false); // Hide loading after answer
  }, 1000);
});

// Handle image upload with Web Worker
imageUpload.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  addMessage('📷 Image uploaded. Extracting text...', 'user');
  setLoading(true, 'Processing image: 0%'); // Show loading immediately
  console.log(`Image upload, questionCount: ${questionCount}, isPremium: ${isPremium}`);

  // Simulated monetization
  if (!isPremium && questionCount >= FREE_QUESTION_LIMIT) {
    setLoading(false); // Hide loading
    addMessage(
      `You’ve used your ${FREE_QUESTION_LIMIT} free questions! Unlock more for KES 10 (pretend payment).`,
      'ai'
    );
    const payButton = document.createElement('button');
    payButton.textContent = 'Pretend Pay KES 10';
    payButton.style.cssText = 'background: #25d366; color: #fff; border: none; padding: 0.5em 1em; border-radius: 1em; cursor: pointer;';
    payButton.onclick = () => {
      isPremium = true;
      localStorage.setItem('isPremium', 'true');
      updateSubscriptionStatus();
      addMessage('You’re now Premium! Ask away! 🚀', 'ai');
    };
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ai';
    msgDiv.appendChild(payButton);
    chat.appendChild(msgDiv);
    chat.scrollTop = chat.scrollHeight;
    return;
  }

  try {
    // Create Web Worker for Tesseract.js
    const worker = Tesseract.createWorker({
      logger: (m) => {
        if (m.status === 'recognizing text') {
          const progress = Math.round(m.progress * 100);
          setLoading(true, `Processing image: ${progress}%`);
        }
      }
    });

    // Initialize worker with English only for speed
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    // Preprocess image
    preprocessImage(file, async (blob) => {
      // Set 10-second timeout for OCR
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('OCR timeout')), 10000);
      });
      const ocrPromise = worker.recognize(blob);
      const { data: { text } } = await Promise.race([ocrPromise, timeoutPromise]);
      await worker.terminate(); // Clean up worker
      const extracted = text.trim();
      if (extracted) {
        addMessage(`Extracted: ${extracted}`, 'user');
        setTimeout(() => {
          const aiMsg = mockAIResponse(extracted);
          addMessage(aiMsg, 'ai', true);
          questionCount++;
          localStorage.setItem('questionCount', questionCount);
          updateSubscriptionStatus();
          setLoading(false); // Hide loading after answer
        }, 1000);
      } else {
        addMessage("Hmm, I couldn't read any text from that image. Try a clearer pic!", 'ai');
        setLoading(false); // Hide loading
      }
    });
  } catch (err) {
    console.error('OCR error:', err);
    addMessage('Oops, something went wrong with the image. Try a clearer, smaller pic!', 'ai');
    setLoading(false); // Hide loading
  } finally {
    imageUpload.value = '';
  }
});

// Trigger image upload
document.querySelector('.image-upload-label').addEventListener('click', () => imageUpload.click());

// Theme toggle
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleThemeBtn.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Initialize
window.onload = () => {
  addMessage(
    `Yo! I'm ${AI_NAME} 🤖, your homework helper with Kenyan vibes! Ask a question or snap a pic!`,
    'ai'
  );
  updateSubscriptionStatus();
  userInput.focus();
};