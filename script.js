// DOM Elements
const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');
const welcomeScreen = document.getElementById('welcomeScreen');
const settingsModal = document.getElementById('settingsModal');

// State - API key is hardcoded for instant use
let conversationHistory = [];
let messageCount = 0;
let apiKey = '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';
let currentFile = null;
let currentFileContent = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    userInput.focus();
    // API key is already set, no need to check
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

// Example prompts
function useExample(text) {
    userInput.value = text;
    userInput.focus();
    sendMessage();
}

// File handling functions
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    currentFile = file;
    const filePreview = document.getElementById('filePreview');
    
    // Get file icon based on type
    const fileIcon = getFileIcon(file.type, file.name);
    
    // Format file size
    const fileSize = formatFileSize(file.size);
    
    // Read file content
    readFileContent(file);
    
    // Show preview
    filePreview.innerHTML = `
        <div class="file-item">
            <span class="file-icon">${fileIcon}</span>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${fileSize}</div>
            </div>
            <button class="file-remove" onclick="removeFile()">Remove</button>
        </div>
    `;
    filePreview.classList.add('active');
}

function getFileIcon(fileType, fileName) {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) return '📝';
    if (fileType.includes('excel') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) return '📊';
    if (fileType.includes('powerpoint') || fileName.endsWith('.pptx') || fileName.endsWith('.ppt')) return '📊';
    if (fileType.includes('zip') || fileType.includes('rar')) return '🗜️';
    if (fileName.endsWith('.txt')) return '📄';
    if (fileName.endsWith('.csv')) return '📊';
    if (fileName.endsWith('.json')) return '{ }';
    if (fileName.endsWith('.js') || fileName.endsWith('.py') || fileName.endsWith('.java') || 
        fileName.endsWith('.cpp') || fileName.endsWith('.html') || fileName.endsWith('.css')) return '💻';
    return '📎';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function readFileContent(file) {
    const reader = new FileReader();
    
    // Handle different file types
    if (file.type.startsWith('image/')) {
        reader.onload = function(e) {
            currentFileContent = {
                type: 'image',
                data: e.target.result,
                mimeType: file.type
            };
        };
        reader.readAsDataURL(file);
    } else if (file.type.startsWith('text/') || 
               file.name.endsWith('.txt') || 
               file.name.endsWith('.md') ||
               file.name.endsWith('.json') ||
               file.name.endsWith('.csv') ||
               file.name.endsWith('.js') ||
               file.name.endsWith('.py') ||
               file.name.endsWith('.html') ||
               file.name.endsWith('.css') ||
               file.name.endsWith('.java') ||
               file.name.endsWith('.cpp')) {
        reader.onload = function(e) {
            currentFileContent = {
                type: 'text',
                data: e.target.result,
                fileName: file.name
            };
        };
        reader.readAsText(file);
    } else {
        // For other file types, inform user
        currentFileContent = {
            type: 'unsupported',
            fileName: file.name,
            fileType: file.type
        };
    }
}

function removeFile() {
    currentFile = null;
    currentFileContent = null;
    document.getElementById('filePreview').classList.remove('active');
    document.getElementById('fileInput').value = '';
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
    if (!message && !currentFile) return;

    // Disable input
    userInput.disabled = true;
    sendButton.disabled = true;

    // Prepare user message with file info
    let userMessage = message;
    if (currentFile) {
        userMessage = message || `I've uploaded a file: ${currentFile.name}`;
    }

    // Add user message
    addMessage('user', userMessage);
    
    // Prepare the message content for API
    let messageContent = message;
    
    // Handle file content
    if (currentFileContent) {
        if (currentFileContent.type === 'text') {
            messageContent += `\n\n[File: ${currentFileContent.fileName}]\n\`\`\`\n${currentFileContent.data}\n\`\`\``;
        } else if (currentFileContent.type === 'image') {
            messageContent += `\n\n[I've uploaded an image. Please analyze it and tell me what you see.]`;
        } else if (currentFileContent.type === 'unsupported') {
            messageContent += `\n\n[I've uploaded a file named "${currentFileContent.fileName}" of type "${currentFileContent.fileType}". Please provide general information about this file type and what you can help me with.]`;
        }
    }
    
    // Prepare messages for Groq API format
    const groqMessages = [
        ...conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
        })),
        { role: 'user', content: messageContent }
    ];

    // Clear input and file
    userInput.value = '';
    userInput.style.height = 'auto';
    if (currentFile) {
        removeFile();
    }

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
        conversationHistory.push({ role: 'user', content: messageContent });
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
