const chatButton = document.querySelector('.chat_button');
const chatContent = document.querySelector('.chat');
const icons = {
    isClicked: '<img src="https://img.icons8.com/fluency/40/000000/bot.png"/>',
    isNotClicked: '<img src="https://img.icons8.com/color/40/000000/chat--v2.png"/>'
}
const chat = new Interactivechat(chatButton, chatContent, icons);
chat.display();
chat.toggleIcon(false, chatButton);
