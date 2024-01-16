let mytext = document.querySelector(".msger-chat");
// let voice_chat = document.querySelector(".msger-chat .msg-text");
let myBtn = document.querySelector(".mic");
let clear = document.querySelector(".clearicon");
let copybtn = document.querySelector(".copyicon");

// Web Speech API
let recod = window.webkitSpeechRecognition || webkitSpeechRecognition;
let spRec = new recod();
console.log(spRec);

spRec.interimResults = true;
let isListening = false;
let speechRecognitionInitiated = false;
//Start and Stop Buttons
myBtn.addEventListener("click", () => {
  if (myBtn.classList.contains("stop_circle")) {
    myBtn.innerHTML = `<i class="material-icons">mic</i>`;
    myBtn.classList.remove("stop_circle");
    myBtn.classList.add("mic");
    isListening = false;
    spRec.stop();
  } else {
    myBtn.innerHTML = `<i class="material-icons">stop_circle</i>`;
    myBtn.classList.remove("mic");
    myBtn.classList.add("stop_circle");
    spRec.start();
    isListening = true;
    speechRecognitionInitiated = true;
  }
});

spRec.addEventListener("result", (e) => {
  let words = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join(" ");
  console.log(words);

  let newMessage = document.createElement("div");
  newMessage.classList.add("msg", "right-msg");

  if (e.results[0].isFinal) {
    newMessage.innerHTML = `
      <div class="msg-bubble">
        <div class="msg-text">
          <p>${words}</p>
        </div>
      </div>
    `;

    mytext.appendChild(newMessage);

    // Reset the voice_chat content for the next input
  } else {
    newMessage.innerHTML = `
      <div class="msg-bubble">
        <div class="msg-text">
          <p>${words}</p>
        </div>
      </div>
    `;
  }
});

spRec.addEventListener("end", () => {
  if (isListening) {
    spRec.start();
  }
});
// Copy Button Event
copybtn.addEventListener("click", () => {
  if (speechRecognitionInitiated) {
    let messages = document.querySelectorAll(".msger-chat .msg-text p");

    let textToCopy = Array.from(messages).map((message) => message.textContent).join("\n");

    navigator.clipboard.writeText(textToCopy);

    copybtn.innerHTML = `<i class="material-icons">done</i>`;
    setTimeout(() => {
      copybtn.innerHTML = `<i class="material-icons">content_copy</i>`;
    }, 2000);
  } else {
    alert("Speech recognition must be initiated first.");
  }
});


//Clear Button Event
clear.addEventListener("click", () => {
  if (speechRecognitionInitiated) {
    mytext.innerHTML = "";
    voice_chat.innerHTML = "";

    clear.innerHTML = `<i class="material-icons">cleaning_services</i>`;
    setTimeout(() => {
      clear.innerHTML = `<i class="material-icons">clear_all</i>`;
    }, 2000);
  } else {
    alert("Speech recognition must be initiated first.");
  }
});

