//Header.js

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const arr = [
      document.getElementById("articleHeader"),
      document.getElementById("place"),
      document.getElementById("longitude"),
      document.getElementById("latitude"),
      Array.from(document.getElementById("previewImg").children)[0],
    ];

    arr.forEach((x) => {
      x.classList.remove("visibility");
    });
  },
  { once: true }
);

const title = document.getElementById("title");
const date = document.getElementById("date");

// longlatAsync.js
const place = document.getElementById("place");
const longitude = document.getElementById("longitude");
const latitude = document.getElementById("latitude");
const whisperer = document.getElementById("whisperer");

//addline.js

const line = document.getElementById("addNew");
const innerLine = Array.from(line.children)[0];

//add Buttons

const buttons = document.getElementById("addBubbles");
const bubbles = Array.from(buttons.children);

const article = document.getElementById("articlePart");
