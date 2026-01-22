<script type="module">
  import { db } from "./firebase.js";
  import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/14.20.0/firebase-firestore.js";

  document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro");
    const main = document.getElementById("main");
    const beginBtn = document.getElementById("begin-btn");
    const doneBtn = document.getElementById("done-btn");
    const wordDisplay = document.getElementById("word");
    const response = document.getElementById("response");
    const timerDisplay = document.getElementById("timer");

    const nouns = ["forest", "mirror", "station", "garden", "river", "tower", "window", "library"];
    let timer;
    let timeLeft = 30;

    // --- Begin Button ---
    beginBtn.addEventListener("click", () => {
      intro.style.display = "none";
      main.style.display = "block";

      const randomWord = nouns[Math.floor(Math.random() * nouns.length)];
      loadWord(randomWord);
    });

    // --- Load a word ---
    async function loadWord(word) {
      wordDisplay.textContent = word;
      response.value = "";
      response.style.display = "block";
      doneBtn.style.display = "inline-block";

      const oldContainer = document.getElementById("response-container");
      if (oldContainer) oldContainer.remove();

      const docRef = doc(db, "responses", word);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Word already has a stored response
        response.style.display = "none";
        doneBtn.style.display = "none";
        displayResponse(docSnap.data().text);
        timerDisplay.textContent = "";
      } else {
        // New word — user writes response
        startTimer();
      }
    }

    // --- Timer countdown ---
    function startTimer() {
      clearInterval(timer);
      timeLeft = 30;
      timerDisplay.textContent = timeLeft;

      timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(timer);
          finishResponse();
        }
      }, 1000);
    }

    // --- Done button ---
    doneBtn.addEventListener("click", () => {
      clearInterval(timer);
      finishResponse();
    });

    // --- Save response to Firestore and display clickable text ---
    async function finishResponse() {
      const word = wordDisplay.textContent;
      const text = response.value.trim();

      if (!text) {
        alert("You didn't write anything!");
        return;
      }

      const docRef = doc(db, "responses", word);
      await setDoc(docRef, { text }, { merge: true });

      // Hide input & button
      response.style.display = "none";
      doneBtn.style.display = "none";
      timerDisplay.textContent = "";

      // Display clickable text
      displayResponse(text);
    }

    // --- Display clickable response ---
    function displayResponse(text) {
      let container = document.getElementById("response-container");

      if (!container) {
        container = document.createElement("div");
        container.id = "response-container";
        container.style.marginTop = "20px";
        container.style.fontSize = "18px";
        container.style.cursor = "pointer";
        wordDisplay.insertAdjacentElement("afterend", container);
      }

      container.innerHTML = "";

      const words = text.split(" ");
      words.forEach((w) => {
        const span = document.createElement("span");
        span.textContent = w + " ";
        span.style.transition = "background 0.2s";

        span.addEventListener("mouseenter", () => {
          span.style.backgroundColor = "yellow";
          span.style.color = "black";
        });
        span.addEventListener("mouseleave", () => {
          span.style.backgroundColor = "transparent";
          span.style.color = "white";
        });

        span.addEventListener("click", () => {
          loadWord(w.toLowerCase());
        });

        container.appendChild(span);
      });
    }
  });
</script>
