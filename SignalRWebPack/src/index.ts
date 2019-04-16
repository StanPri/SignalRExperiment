import "./css/main.css";
import * as signalR from "@aspnet/signalr";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");
const divMessageInProgress: HTMLDivElement = document.querySelector("#messageInProgress");
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.start().catch(err => document.write(err));

connection.on("messageReceived", (username: string, message: string) => {
    let messageContainer = document.createElement("div");

    messageContainer.innerHTML =
        `<div class="message-author">${username}</div><div>${message}</div>`;

    divMessages.appendChild(messageContainer);
    divMessages.scrollTop = divMessages.scrollHeight;
});

connection.on("messageInProgress", (message: string) => {
    let messageContainer = document.createElement("div");

    messageContainer.innerHTML =
        `<div class="messageInProgress">${message}</div>`;
    if (divMessageInProgress.lastChild) {
        divMessageInProgress.removeChild(divMessageInProgress.lastChild);
    }
    divMessageInProgress.appendChild(messageContainer);
});

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
    messageInProgress();
    if (e.keyCode === 13) {
        send();
    }
});

btnSend.addEventListener("click", send);

function send() {
    connection.send("newMessage", username, tbMessage.value)
              .then(() => tbMessage.value = "");
}

function messageInProgress() {
    connection.send("inProgressMessage", username);
}