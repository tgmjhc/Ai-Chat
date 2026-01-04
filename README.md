# Chrizzed Engine - AI Chat Assistant 🤖

A beautiful, modern chat interface powered by FREE AI technology. Deploy it to GitHub Pages and have your own AI assistant website!

![Chrizzed Engine](https://img.shields.io/badge/Chrizzed-Engine-FF6B35)
![Powered by Groq](https://img.shields.io/badge/Powered%20by-Groq-4ecdc4)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-success)

## ✨ Features

- 🎨 **Beautiful Modern UI** - Dark theme with animated gradients and smooth transitions
- 💬 **Real-time Chat** - Conversation with AI using Llama 3.3 70B model
- 🆓 **100% FREE** - No credit card required, completely free API access
- 🔐 **Secure API Key Storage** - Your API key is stored locally in your browser
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight** - Pure HTML, CSS, and JavaScript - no frameworks needed
- 🎯 **Example Prompts** - Quick start with suggested conversation starters
- ✏️ **Markdown Support** - Code blocks, formatting, and more

## 🚀 Quick Start - Deploy to GitHub Pages

### Step 1: Fork/Upload to GitHub

1. Create a new repository on GitHub
2. Upload these files to your repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md` (this file)

### Step 2: Enable GitHub Pages

1. Go to your repository **Settings**
2. Navigate to **Pages** (in the left sidebar)
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait a few minutes for GitHub to build your site

Your site will be available at: `https://yourusername.github.io/repository-name/`

### Step 3: Get Your FREE Groq API Key 🎉

1. Go to [console.groq.com](https://console.groq.com/)
2. Sign up with your Google/GitHub account (takes 30 seconds!)
3. Click **API Keys** in the left menu
4. Click **Create API Key**
5. Copy your API key (it starts with `gsk_...`)

**NO CREDIT CARD REQUIRED! 100% FREE!**

### Step 4: Add Your API Key

1. Open your deployed website
2. Click the **⚙️ Settings** button in the top right
3. Paste your API key
4. Click **Save Settings**

That's it! Start chatting with your AI assistant! 🎉

## 🆓 Why Groq is Perfect for This Project

✅ **Completely FREE** - No credit card, no payment required
✅ **Fast Responses** - One of the fastest AI inference engines
✅ **Generous Limits** - More than enough for personal projects
✅ **Reliable** - Enterprise-grade infrastructure
✅ **Easy Setup** - Get started in under 2 minutes

## 🧠 AI Model

This project uses **Llama 3.3 70B** via Groq API:
- 70 billion parameters
- Excellent at coding, reasoning, and conversation
- Supports 128K context window
- Comparable to GPT-4 for many tasks

## 🔧 Configuration

### API Key Storage

Your API key is stored in your browser's `localStorage`. It never leaves your browser and is only sent directly to Groq's API.

### Customization

You can easily customize the appearance by editing `styles.css`:

```css
:root {
    --bg-primary: #0a0a0f;        /* Main background */
    --accent-primary: #ff6b35;    /* Primary accent color */
    --accent-secondary: #f7931e;  /* Secondary accent color */
    --accent-tertiary: #4ecdc4;   /* Tertiary accent color */
}
```

### Change AI Model

You can switch to different models in `script.js`:

```javascript
model: 'llama-3.3-70b-versatile',  // Current model
```

Available Groq models (all FREE):
- `llama-3.3-70b-versatile` - Best overall (current)
- `llama-3.1-70b-versatile` - Also excellent
- `mixtral-8x7b-32768` - Fast and efficient
- `gemma2-9b-it` - Lightweight option

Check [console.groq.com](https://console.groq.com/docs/models) for the latest models!

## 📋 File Structure

```
chrizzed-engine/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🔒 Security Notes

- Your API key is stored in browser localStorage (client-side only)
- The key is never sent to any server except Groq's official API
- API calls are made directly from your browser to Groq
- All communication is encrypted via HTTPS

## 💰 Pricing

**100% FREE!** 🎉

Groq offers:
- Free tier with generous limits
- No credit card required
- Perfect for personal projects and experimentation
- Rate limits are more than enough for personal use

## 🐛 Troubleshooting

### "API Key Required" message
- Make sure you've added your API key in settings
- Verify your API key is correct (starts with `gsk_`)

### "Invalid API key" error
- Check your API key in [Groq Console](https://console.groq.com/)
- Make sure you copied the entire key

### "Rate limit exceeded" error
- You've made too many requests too quickly
- Wait a few moments and try again
- Free tier limits are quite generous

### Messages not appearing
- Check browser console for errors (F12)
- Make sure JavaScript is enabled
- Try clearing browser cache and localStorage

## 🎨 Customization Ideas

- Change the color scheme to match your brand
- Add a dark/light mode toggle
- Implement conversation history saving
- Add file upload capabilities
- Create custom example prompts
- Add voice input/output
- Integrate with other APIs

## 📚 Resources

- [Groq Documentation](https://console.groq.com/docs)
- [Groq Models](https://console.groq.com/docs/models)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Llama 3.3 Information](https://www.llama.com/)

## 🤝 Contributing

Feel free to fork this project and make it your own! Some ideas:
- Add new features
- Improve the UI/UX
- Optimize performance
- Fix bugs
- Add new AI models

## 📄 License

This project is open source and available under the MIT License.

## ⭐ Why "Chrizzed Engine"?

This is YOUR custom AI chat engine! Personalize it, brand it, and make it uniquely yours. The name represents your own creation powered by cutting-edge AI technology.

---

**Made with ❤️ and powered by FREE AI**

### Quick Setup Summary:
1. ✅ Upload files to GitHub
2. ✅ Enable GitHub Pages
3. ✅ Get FREE Groq API key (no credit card!)
4. ✅ Add key to your site
5. ✅ Start chatting!

**Total cost: $0.00** 🎉

Need help? Visit [console.groq.com](https://console.groq.com/) for support!
