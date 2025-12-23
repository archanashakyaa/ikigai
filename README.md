# MindFit - Your AI Mental Fitness Companion 🧠✨

MindFit is a comprehensive, AI-powered mental wellness dashboard designed to help students and individuals track their mental fitness, vent safely, and find support in a non-judgmental environment.

## 🚀 Key Features

### 1. **Vent to AI (The Lifeguard) 🌊**
A safe, anonymous space to chat with "MindFit," a supportive, 20-year-old "lifeguard" persona.
- **Judgement-Free Zone**: Vent about anything from exam stress to relationship drama.
- **Smart Responses**: Powered by **Google Gemini AI**, offering empathetic and motivating replies.
- **Crisis Awareness**: Automatically detects severe distress and provides immediate resources.

### 2. **Smart Journal with Voice Notes 🎙️**
Journaling made effortless.
- **Voice-to-Text**: Record your thoughts directly in the browser using the **MediaRecorder API**.
- **Audio History**: Play back your past voice entries to hear your progress.
- **Mood Tagging**: Tag entries with moods and topics for deeper analysis.
- **AI Insights**: The system analyzes your entries to offer personalized suggestions (e.g., "You seem anxious about exams; try a breathing exercise").

### 3. **Real-Time Progress & Analytics 📊**
Gamify your mental wellness journey.
- **Leveling System**: Earn XP for journaling and checking in. Can you reach "Master" status?
- **Mood Trajectory Charts**: Interactive graphs to visualize your emotional trends over 7 or 30 days.
- **Deep Analytics**: Identify your personal "triggers" and see what impacts your mood the most.
- **Mental Battery**: A dynamic indicator of your current energy levels based on recent activity.

### 4. **Quick Support & Doctor Finder 🩺**
Immediate tools for urgent needs.
- **Anxiety Relief**: Quick breathing exercises and grounding techniques.
- **Find Professional Help**: Integrated **Google Maps** search to instantly find Psychiatrists and Therapists near you.
- **Crisis Line**: One-tap access to the 988 Suicide & Crisis Lifeline.

### 5. **Community Safe Space 🫂**
Connect with others anonymously.
- **Live Chat Rooms**: Join rooms like "Exam Stress" or "Late Night Thoughts" to chat with peers.
- **Discussion Feed**: Share posts and support others with anonymous likes and comments.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Architecture**: React with CSS Modules
- **AI Integration**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) (Gemini)
- **Data Persistence**: LocalStorage (Privacy-first client-side storage)
- **APIs**: MediaRecorder API (Voice), Google Maps (Doctor Finder)

---

## 🏁 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/mindfit.git
   cd mindfit/website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_ai_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to start your journey!

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
*Built with ❤️ for Mental Health Awareness.*
