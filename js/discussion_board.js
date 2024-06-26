document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project_id');

    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const fileInput = document.getElementById('fileInput');

    function fetchMessages() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `./services/includes/fetch_messages.php?project_id=${projectId}`, true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                messagesDiv.innerHTML = '';

                response.messages.forEach(message => {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('chat-msg');
                    if (response.user_id == message.id){
                        messageElement.classList.add('owner');
                    }
                    messageElement.innerHTML = `
                        <div class="chat-msg-profile">
                            <img class="chat-msg-img" src="${message.profile_image.slice(6)}" />
                            <div class="chat-msg-date">${message.username}</div>
                        </div>
                        <div class="chat-msg-content">
                            ${message.file_path ? `<div class="chat-msg-text">
                            <img src="${message.file_path.slice(6)}"/>
                            <span>${message.created_at.slice(10,16)}</span>
                            </div>` : ''}
                            ${message.message ? `<div class="chat-msg-text">${message.message}
                            <span>${message.created_at.slice(10,16)}</span></div>` : ''}
                           
                        </div>
                    `;
                
                    messagesDiv.appendChild(messageElement);
                });

                
            } else {
                console.error('Failed to fetch messages');
            }
            
        };

        xhr.send();
    }

    function sendMessage(formData) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', './services/includes/send_message.php', true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    fetchMessages();
                } else {
                    console.error('Failed to send message:', response.error);
                }
            } else {
                console.error('Failed to send message');
            }
        };

        xhr.send(formData);
    }

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(messageForm);

        const messageText = messageInput.value.trim();
        const fileSelected = fileInput.files.length > 0;

        if (!messageText && !fileSelected) {
            return;
        }

        formData.append('project_id', projectId);

        // Log the form data for debugging
        console.log('Form Data Entries:');
        formData.forEach((value, key) => {
            console.log(key, value);
        });

        sendMessage(formData);

        messageInput.value = '';
        fileInput.value = '';
    });

    setInterval(fetchMessages, 1000);
    fetchMessages();
});
