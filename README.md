# Hakathon-2.0

VibeBot is a fun, smart, and budget-friendly homework helper designed for Kenyan parents and kids built for the Vibe Coding Hackathon 2.0 (July 2025). With a WhatsApp inspired chat interface VibeBot delivers kid friendly answers to homework questions across math, science, English, and Kenyan general knowledge. Powered by a robust mock AI and Tesseract.js for image-to-text OCR, it solves real problems for busy parents without relying on costly APIs. VibeBot is low-code, mobile-friendly, and ready to monetize with a simulated KES 10 per question model making it perfect for the hackathon’s goals of accessibility speed-to-market and revenue potential. Project OverviewVibeBot tackles the challenge of helping busy Kenyan parents support their kids’ homework without breaking the bank. It offers:Instant Answers: 100+ kid-friendly responses for math (arithmetic, fractions, algebra), science (biology, physics, chemistry), English (grammar, vocabulary, writing), and Kenyan culture (history, geography).
Image Upload: OCR via Tesseract.js extracts text from homework images (e.g., math equations, handwritten notes).
Kenyan Vibes: Playful responses with local flair (e.g., “You’re sharper than a panga cutting sugarcane!”) and fun facts (e.g., “Nairobi means ‘cool water’ in Maasai!”).
Simulated Monetization: A fake paywall (3 free questions, then “pay” KES 10) mimics the hackathon’s KES 5–10 per question model without real payment APIs.
Low-Cost Design: Built entirely client-side to avoid expensive APIs, ensuring fast deployment and accessibility for all users.

 Why VibeBot?The ProblemBusy Kenyan parents often struggle to help their kids with homework due to time constraints or complex questions. Existing solutions like tutoring apps or AI APIs (e.g., ChatGPT, Hugging Face) are costly, require subscriptions, or need internet-heavy backends, which aren’t affordable or practical for many Kenyan households.The SolutionVibeBot is a low-code, client-side web app that:Provides instant kid-friendly answers to common homework questions (e.g., “What is 3 × 4?” → “3 × 4 = 12. That’s 3 matatus with 4 passengers each!”).
Supports image uploads for handwritten homework using free Tesseract.js OCR.
Uses a mock AI with 100+ responses and 20+ micro-lessons (e.g., “To add fractions, find a common denominator!”) to educate and engage.
Mimics a WhatsApp-like UI for familiarity, with dark/light mode and mobile responsiveness.
Simulates monetization (KES 10 per question after 3 free ones) to show revenue potential without costly APIs like M-Pesa’s Daraja or Twilio.
Stays budget-friendly by avoiding server-side APIs making it deployable on free static hosts like GitHub Pages.

Why No APIs?To align with the hackathon’s speed-to-market and accessibility goals VibeBot avoids costly APIs for these reasons:Cost: APIs like M-Pesa’s Daraja, Twilio (WhatsApp), or Hugging Face require paid subscriptions or setup fees, which are impractical for a hackathon prototype.
Complexity: Server-side APIs need backends (e.g., Node.js, Firebase), increasing development time and hosting costs.
Accessibility: Many Kenyan users have limited internet or low-end devices. A client-side app with Tesseract.js and a mock AI ensures offline-capable functionality (after initial load) and fast responses.
Hackathon Fit: A simulated paywall demonstrates monetization potential (KES 5–10 per question) without real payment integration, keeping it low-code and fast to deploy.

 FeaturesSmart Mock AI:100+ responses covering math, science, English, and Kenyan general knowledge.
20+ micro-lessons (e.g., “A sentence needs a subject and verb. Example: ‘I love ugali.’”) for quick learning.
Fuzzy matching handles misspellings (e.g., “photsynthesis” → “photosynthesis”).
Kenyan-flavored encouragements (e.g., “You’re cooler than a Tusker on a hot day!”) and fun facts (e.g., “M-Pesa revolutionized mobile money!”).

Image-to-Text OCR:Upload homework images (e.g., math equations) and extract text using Tesseract.js.
Client-side preprocessing (grayscale, contrast boost) improves accuracy for handwritten notes.

WhatsApp-Inspired UI:Familiar chat interface with user and AI message bubbles.
Dark/light mode toggle for accessibility.
Mobile-responsive design for low-end devices (tested at 600px and below).

Simulated Monetization:3 free questions, then a “Pretend Pay KES 10” button unlocks “Premium Mode.”
Stored in localStorage to mimic subscription plans without real payments.

Feedback System:Thumbs-up/down buttons on AI responses for user engagement.
Feedback stored in localStorage for future improvements.

Loading Animation:Smooth spinner appears instantly on question/image submission and hides after answers.
Matches WhatsApp-green theme for consistency.

Footer:© 2025 VibeBot with a Kenyan touch (“Built with  for Kenyan kids!”).

 Tech StackHTML5: Simple, semantic structure for the chat interface.
CSS3: WhatsApp-inspired styling with responsive design and dark/light mode.
JavaScript (ES6): Powers the mock AI, OCR, and monetization logic.
Tesseract.js: Free, client-side OCR for image-to-text conversion.
localStorage: Stores question count, subscription status, and feedback without a backend.
No APIs: Keeps it low-cost fast and offline-capable after initial load.

 Getting StartedPrerequisitesA modern web browser (e.g., Chrome, Firefox).
No server or backend required—runs entirely client-side.
Internet connection for initial Tesseract.js CDN load (works offline afterward).


