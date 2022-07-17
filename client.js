var socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio=new Audio('ting.wav');
const append = (message,position)=>
{ 
    const messageElement = document.createElement("div");
    var text=document.createTextNode(message);
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageElement.append(text);
    messageContainer.append(messageElement);
    if(position==`left`){
        audio.play();
    }
}
const names = prompt("Enter Your name");
socket.emit('new-user-joined', names);
socket.on('user-joined',name=>
{
    append(`${name} joined the chat`,`left`);
});
form.addEventListener('submit', (e)=>
{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,`right`); 
    socket.emit('send',message);
    messageInput.value='';
});
socket.on('receive',data=>
{
    append(`${data.name}:${data.message}`,`left`);
});
socket.on('leave',data=>
{
    append(`${data.name} left the chat`,`left`);
});