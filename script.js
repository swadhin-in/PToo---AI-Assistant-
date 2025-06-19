const chatBox = document.getElementById("chat-box");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

function respondTo(query) {
  let response;

  query = query.toLowerCase();

  if (query.includes("hello") || query.includes("hi")) {
    response = "Hello! How can I help you today?";
  } else if (query.includes("time")) {
    response = `The current time is ${new Date().toLocaleTimeString()}`;
  } else if (query.includes("name")) {
    response = "I'm PToo!";
  } 
  else if (query.includes("weather")) {
    response = "I can't check the weather right now, but you can look it up online!";
  } else if (query.includes("joke")) {
    response = "Why don't scientists trust atoms? Because they make up everything!";
  } else {
    response = "I cannot assist you right now, but I'm developing soon by Swadhin!";
  }

  appendMessage("bot", response);
  speak(response);
}

function appendMessage(sender, text) {
  const p = document.createElement("p");
  p.className = sender;
  p.textContent = text;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    appendMessage("user", transcript);
    respondTo(transcript);
  };

  recognition.onerror = function(event) {
    speak("Sorry, I couldn't hear you.");
  };
}

