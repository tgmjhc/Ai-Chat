// DOM Elements
const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');
const welcomeScreen = document.getElementById('welcomeScreen');
const settingsModal = document.getElementById('settingsModal');

// State
let conversationHistory = [];
let messageCount = 0;
let apiKey = localStorage.getItem('groq_api_key') || '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    userInput.focus();
    checkApiKey();
});

// Auto-resize textarea
userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 200) + 'px';
});

// Send on Enter, new line on Shift+Enter
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Check if API key exists
function checkApiKey() {
    if (!apiKey) {
        setTimeout(() => {
            showApiKeyPrompt();
        }, 1000);
    }
}

function showApiKeyPrompt() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <strong>API Key Required</strong><br><br>
        To use this chat, you need a FREE Groq API key. Click the settings button (⚙️) in the top right to add your key.<br><br>
        <small>Get your FREE API key from <a href="https://console.groq.com/" target="_blank" style="color: var(--accent-primary);">console.groq.com</a> - No credit card required!</small>
    `;
    chatArea.appendChild(errorDiv);
}

// Settings Modal Functions
function openSettings() {
    settingsModal.classList.add('active');
    document.getElementById('apiKey').value = apiKey;
}

function closeSettings() {
    settingsModal.classList.remove('active');
}

function saveSettings() {
    const newApiKey = document.getElementById('apiKey').value.trim();
    if (newApiKey) {
        apiKey = newApiKey;
        localStorage.setItem('groq_api_key', apiKey);
        closeSettings();
        
        // Clear chat and show success message
        const messages = chatArea.querySelectorAll('.message, .error-message');
        messages.forEach(msg => msg.remove());
        
        addMessage('system', '✅ API key saved successfully! You can now start chatting with Chrizzed Engine.');
    } else {
        alert('Please enter a valid API key');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === settingsModal) {
        closeSettings();
    }
}

// Example prompts
function useExample(text) {
    userInput.value = text;
    userInput.focus();
    sendMessage();
}

// Add message to chat
function addMessage(role, content) {
    if (welcomeScreen.style.display !== 'none') {
        welcomeScreen.style.display = 'none';
    }

    const messageDiv = document.createElement('div');
    
    if (role === 'system') {
        messageDiv.className = 'error-message';
        messageDiv.style.background = 'rgba(78, 205, 196, 0.1)';
        messageDiv.style.borderColor = 'rgba(78, 205, 196, 0.3)';
        messageDiv.style.color = 'var(--accent-tertiary)';
        messageDiv.innerHTML = content;
        chatArea.appendChild(messageDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
        return;
    }

    messageDiv.className = `message ${role}-message`;
    messageDiv.style.animationDelay = `${messageCount * 0.1}s`;
    messageCount++;

    const avatarClass = role === 'user' ? 'user-avatar' : 'ai-avatar';
    const avatarText = role === 'user' ? 'U' : 'AI';
    const roleName = role === 'user' ? 'You' : 'Assistant';

    messageDiv.innerHTML = `
        <div class="message-header">
            <div class="avatar ${avatarClass}">${avatarText}</div>
            <div class="message-role">${roleName}</div>
        </div>
        <div class="message-content">${formatContent(content)}</div>
    `;

    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Format message content
function formatContent(content) {
    // Escape HTML
    content = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    // Convert markdown-style code blocks
    content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
        return `<pre><code>${code.trim()}</code></pre>`;
    });
    
    // Convert inline code
    content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Convert bold
    content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italic
    content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert links
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Convert line breaks to paragraphs
    content = content.split('\n\n').map(para => {
        if (para.trim() && !para.includes('<pre>')) {
            return `<p>${para.replace(/\n/g, '<br>')}</p>`;
        }
        return para;
    }).join('');
    
    return content;
}

// Send message
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Check API key
    if (!apiKey) {
        addMessage('system', '⚠️ Please add your FREE Groq API key in settings first.');
        openSettings();
        return;
    }

    // Disable input
    userInput.disabled = true;
    sendButton.disabled = true;

    // Add user message
    addMessage('user', message);
    
    // Prepare messages for Groq API format
    const groqMessages = [
        ...conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
        })),
        { role: 'user', content: message }
    ];

    // Clear input
    userInput.value = '';
    userInput.style.height = 'auto';

    // Show typing indicator
    typingIndicator.classList.add('active');
    chatArea.scrollTop = chatArea.scrollHeight;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: groqMessages,
                temperature: 0.7,
                max_tokens: 2048,
                top_p: 1,
                stream: false
            })
        });

        // Hide typing indicator
        typingIndicator.classList.remove('active');

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract text from Groq response
        const assistantMessage = data.choices[0].message.content;

        // Add assistant message
        addMessage('assistant', assistantMessage);
        
        // Update conversation history
        conversationHistory.push({ role: 'user', content: message });
        conversationHistory.push({ role: 'assistant', content: assistantMessage });

    } catch (error) {
        typingIndicator.classList.remove('active');
        
        let errorMessage = error.message;
        
        // Handle common errors
        if (error.message.includes('401')) {
            errorMessage = 'Invalid API key. Please check your Groq API key in settings.';
        } else if (error.message.includes('429')) {
            errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (error.message.includes('500')) {
            errorMessage = 'Server error. Please try again later.';
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <strong>Error:</strong> ${errorMessage}<br><br>
            <small>If this persists, check your API key in settings or visit <a href="https://console.groq.com/" target="_blank" style="color: var(--accent-primary);">console.groq.com</a></small>
        `;
        chatArea.appendChild(errorDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    // Re-enable input
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
}

// Clear conversation
function clearConversation() {
    conversationHistory = [];
    messageCount = 0;
    const messages = chatArea.querySelectorAll('.message, .error-message');
    messages.forEach(msg => msg.remove());
    welcomeScreen.style.display = 'flex';
}
