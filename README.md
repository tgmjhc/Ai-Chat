# AI Chat - Claude Powered Assistant 🤖

A beautiful, modern chat interface powered by Anthropic's Claude AI. Deploy it to GitHub Pages and have your own AI assistant website!

![AI Chat Interface](https://img.shields.io/badge/Claude-Sonnet%204-FF6B35)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-4ecdc4)

## ✨ Features

- 🎨 **Beautiful Modern UI** - Dark theme with animated gradients and smooth transitions
- 💬 **Real-time Chat** - Conversation with Claude AI with full context retention
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

### Step 3: Get Your Claude API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **API Keys**
4. Create a new API key
5. Copy your API key (it starts with `sk-ant-api03-...`)

### Step 4: Add Your API Key

1. Open your deployed website
2. Click the **⚙️ Settings** button in the top right
3. Paste your API key
4. Click **Save Settings**

That's it! Start chatting with your AI assistant! 🎉

## 🔧 Configuration

### API Key Storage

Your API key is stored in your browser's `localStorage`. It never leaves your browser and is only sent directly to Anthropic's API.

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

### Model Selection

The app uses `claude-sonnet-4-20250514` by default. You can change this in `script.js`:

```javascript
model: 'claude-sonnet-4-20250514',  // Change to any available model
```

Available models:
- `claude-sonnet-4-20250514` (Sonnet 4 - Balanced, best for most tasks)
- `claude-opus-4-20250514` (Opus 4 - Most capable, slower)
- `claude-haiku-4-20251001` (Haiku 4 - Fastest, most affordable)

## 📋 File Structure

```
ai-chat/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🔒 Security Notes

- Your API key is stored in browser localStorage (client-side only)
- The key is never sent to any server except Anthropic's official API
- API calls are made directly from your browser to Anthropic
- Consider setting usage limits on your API key in Anthropic Console

## 💰 Pricing

This uses the Anthropic API which has usage-based pricing:
- Claude Sonnet 4: ~$3 per million input tokens, ~$15 per million output tokens
- Check current pricing at [anthropic.com/pricing](https://anthropic.com/pricing)

**Tip**: Set up billing alerts in your Anthropic console to avoid unexpected charges!

## 🐛 Troubleshooting

### "API Key Required" message
- Make sure you've added your API key in settings
- Verify your API key is correct (starts with `sk-ant-api03-`)

### "Invalid API key" error
- Check your API key in [Anthropic Console](https://console.anthropic.com/)
- Make sure the key has not expired or been revoked

### "Rate limit exceeded" error
- You've made too many requests too quickly
- Wait a few moments and try again
- Consider upgrading your Anthropic plan

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

## 📚 Resources

- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Claude Model Comparison](https://docs.anthropic.com/en/docs/about-claude/models)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 🤝 Contributing

Feel free to fork this project and make it your own! Some ideas:
- Add new features
- Improve the UI/UX
- Optimize performance
- Fix bugs

## 📄 License

This project is open source and available under the MIT License.

## ⚠️ Disclaimer

This is an unofficial project and is not affiliated with Anthropic. Use at your own risk and be mindful of API costs.

---

**Made with ❤️ using Claude**

Need help? Check the [Anthropic Documentation](https://docs.anthropic.com/) or open an issue!
