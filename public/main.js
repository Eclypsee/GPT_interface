document.getElementById('send-button').addEventListener('click', sendMessage);

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage('You', userInput);
    document.getElementById('user-input').value = '';

    const sendButton = document.getElementById('send-button');
    sendButton.disabled = true;

    await fetchChatGPTResponse(userInput);

    sendButton.disabled = false;
}

function appendMessage(sender, message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const senderElement = document.createElement('div');
    senderElement.classList.add('sender');
    senderElement.textContent = `${sender}:`;

    const contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.textContent = message;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(contentElement);
    messagesDiv.appendChild(messageElement);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function fetchChatGPTResponse(userInput) {
    const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userInput })
    });

    const botMessage = await response.json();
    if (botMessage.error) {
        appendMessage('Error', botMessage.error);
    } else {
        appendMessage('ChatGPT', botMessage.text);
    }
}
