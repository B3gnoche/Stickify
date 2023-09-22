"use strict";

// Main Elements
const noteInput = document.querySelector(".input");
const addBtn = document.querySelector(".btn");
const stickyNoteList = document.querySelector(".note__list");
let stickyNotes = [];

// Check to see if there is anything in local storage
const loadStorage = function () {
  if (!localStorage.getItem("stickyNotes")) {
    stickyNotes = [
      {
        text: "You can start by editing this note.",
        noteId: `${Date.now()}`,
      },
    ];
    localStorage.setItem("stickyNotes", JSON.stringify(stickyNotes));
  }
  stickyNotes = JSON.parse(localStorage.getItem("stickyNotes"));
};
// Call on page load
loadStorage();

//Create Note Cards
const createNoteCards = function () {
  stickyNotes.forEach((stickyNote) => {
    const html = `
    <div class="note__wrap">
              <li class="note">
                <div class="note__content">
                  <p
                    noteId="${stickyNote.noteId}"
                    class="note__text"
                    contenteditable="true"
                  >
                    ${stickyNote.text}
                  </p>
                  <div noteId="${stickyNote.noteId}" class="note__close icon__wrap icon__animation">
                    <div class="icon__grey">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width=" 100%"
                        height=" 100%"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <g id="Media / Icon/Filled/x">
                          <path
                            id="Icon"
                            d="M11.793 10.7272L12.5001 11.4343L13.2072 10.7272L19.2173 4.71713C19.3735 4.56092 19.6267 4.56092 19.7829 4.71713C19.9391 4.87334 19.9391 5.12661 19.7829 5.28282L13.7729 11.2929L13.0658 12L13.7729 12.7071L19.7829 18.7171C19.9391 18.8733 19.9391 19.1266 19.7829 19.2828C19.6267 19.439 19.3735 19.439 19.2173 19.2828L13.2072 13.2728L12.5001 12.5657L11.793 13.2728L5.78294 19.2828C5.62673 19.439 5.37346 19.439 5.21725 19.2828C5.06105 19.1266 5.06105 18.8733 5.21725 18.7171L11.2273 12.7071L11.9344 12L11.2273 11.2929L5.21725 5.28282C5.06105 5.12661 5.06105 4.87334 5.21725 4.71713C5.37346 4.56092 5.62673 4.56092 5.78294 4.71713L11.793 10.7272Z"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </g>
                      </svg>
                    </div>
                    <div class="icon__gradient">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 25 24" fill="none">
                    <path d="M11.793 10.7272L12.5001 11.4343L13.2072 10.7272L19.2173 4.71713L18.5101 4.01003L19.2173 4.71713C19.3735 4.56092 19.6267 4.56092 19.7829 4.71713C19.9391 4.87334 19.9391 5.12661 19.7829 5.28282L13.7729 11.2929L13.0658 12L13.7729 12.7071L19.7829 18.7171C19.9391 18.8733 19.9391 19.1266 19.7829 19.2828L20.49 19.9899L19.7829 19.2828C19.6267 19.439 19.3735 19.439 19.2173 19.2828L13.2072 13.2728L12.5001 12.5657L11.793 13.2728L5.78294 19.2828C5.62673 19.439 5.37347 19.439 5.21726 19.2828C5.06105 19.1266 5.06105 18.8733 5.21725 18.7171L4.51015 18.01L5.21725 18.7171L11.2273 12.7071L11.9344 12L11.2273 11.2929L5.21725 5.28282C5.06105 5.12661 5.06105 4.87334 5.21725 4.71713C5.37346 4.56092 5.62673 4.56092 5.78294 4.71713L11.793 10.7272Z" fill="#171717" stroke="url(#paint0_linear_33_336)" stroke-width="2" stroke-linecap="round"/>
                    <defs>
                      <linearGradient id="paint0_linear_33_336" x1="4.1001" y1="3.59998" x2="20.9001" y2="20.4" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4568DC"/>
                        <stop offset="1" stop-color="#B06AB3"/>
                      </linearGradient>
                    </defs>
                  </svg>
                    </div>
                  </div>
                </div>
              </li>
            </div>`;
    stickyNoteList.insertAdjacentHTML("beforeend", html);
  });
};

//Create Close Button Listeners
const createCloseBtns = function () {
  let closeBtns = document.querySelectorAll(".note__close");
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const noteCardId = btn.getAttribute("noteid");
      stickyNotes = stickyNotes.filter((obj) => obj.noteId !== noteCardId);
      refreshDOM();
    });
  });
};

// Create listener to check if user is changing note text
const createEditabletext = function () {
  let noteTexts = document.querySelectorAll(".note__text");
  noteTexts.forEach((text) => {
    text.addEventListener("input", function (e) {
      e.preventDefault;
      let textElId = text.getAttribute("noteid");
      const newText = text.innerHTML;
      const objectToModify = stickyNotes.find((obj) => obj.noteId === textElId);
      objectToModify.text = newText;
      updateStorage();
    });
  });
};

//Loading the sticky notes from stickyNotes array
const loadNotes = function () {
  createNoteCards();
  createCloseBtns();
  createEditabletext();
};
// Load Notes on page load
loadNotes();

const updateStorage = () =>
  localStorage.setItem("stickyNotes", JSON.stringify(stickyNotes));

const refreshDOM = function () {
  stickyNoteList.innerHTML = "";
  updateStorage();
  loadNotes();
};

//Create a new Note
const createNote = function () {
  const inputText = noteInput.value;
  noteInput.value = "";
  const pushedObject = {
    text: `${inputText}`,
    noteId: `${Date.now()}`,
  };
  stickyNotes.push(pushedObject);
};

// Event listener that caputures the text in the input
addBtn.addEventListener("click", function (e) {
  e.preventDefault;
  createNote();
  refreshDOM();
});

//Check to see if a user clicks enter while adding a note
noteInput.addEventListener("keydown", function (e) {
  if (event.keyCode === 13) {
    e.preventDefault();
    addBtn.click();
  }
});

const currentYear = () => {
  const currentYearElement = document.querySelector(".current-year");
  currentYearElement.innerHTML = new Date().getFullYear().toString();
};
currentYear();

// Code to toggle note on and off on tablet
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 990) {
    const elements = document.querySelectorAll(".note");

    function toggleActiveClass(target) {
      elements.forEach((element) => {
        if (element === target) {
          element.classList.toggle("active");
        } else {
          element.classList.remove("active");
        }
      });
    }

    elements.forEach((element) => {
      element.addEventListener("click", (event) => {
        toggleActiveClass(event.currentTarget);
        event.stopPropagation();
      });
    });

    document.addEventListener("click", () => {
      elements.forEach((element) => {
        element.classList.remove("active");
      });
    });
  }
});
