let notes = []; // temporary notes array
let counter = 0;

// Show/hide write section
function showWrite(){
  document.getElementById("writeSection").classList.toggle("hidden");
}

// Post note: show immediately + send to Google Form
function postNote() {
    let text = document.getElementById("noteInput").value.trim();
    if (text.length < 2){
        alert("Write something first!");
        return;
    }

    // Add note locally for immediate display
    notes.push(text);
    counter++;
    document.getElementById("noteInput").value = "";
    document.getElementById("counter").innerText = `🌙 ${counter} stories shared`;
    createSticky(text);

    // Send to Google Form (in the background)
    fetch("https://docs.google.com/forms/d/e/1FAIpQLSf-qWaLjGvCBpQyxcvVA/formResponse", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "entry.1485055113=" + encodeURIComponent(text)
    });
}

// Load persistent notes from Google Sheet CSV
function loadNotes() {
    const wall = document.getElementById("wall");
    wall.innerHTML = "";

    // Replace with your published CSV link from Google Sheets
    const csvLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTpAiuxbNjoaxRgPh3Hlv4Xr16UmJBD-9oqrC60rt2aYAvQyG3zCxWeHCioKdbV0Gx5VZ3ZUSZpxlK/pub?output=csv";

    fetch(csvLink)
        .then(res => res.text())
        .then(csvText => {
            const lines = csvText.split("\n");
            // Skip header row
            lines.slice(1).forEach(line => {
                const noteText = line.split(",")[0]; // first column = note
                if(noteText) createSticky(noteText);
            });
            // Update counter
            counter = lines.length - 1;
            document.getElementById("counter").innerText = `🌙 ${counter} stories shared`;
        });
}

// Create a sticky note on the wall
function createSticky(text){
    const wall = document.getElementById("wall");
    const note = document.createElement("div");
    note.className = "note";

    // Random color & rotation
    const colors = ["#fff7a6","#ffd6e0","#c9f2ff","#d8ffd8"];
    note.style.background = colors[Math.floor(Math.random()*colors.length)];
    note.style.transform = `rotate(${Math.floor(Math.random()*10-5)}deg)`;

    note.innerText = text;

    // Make draggable
    note.onmousedown = dragMouseDown;

    wall.appendChild(note);
}

// Dragging logic
let offsetX, offsetY, dragTarget;

function dragMouseDown(e){
    dragTarget = e.target;
    offsetX = e.clientX - dragTarget.getBoundingClientRect().left;
    offsetY = e.clientY - dragTarget.getBoundingClientRect().top;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
}

function elementDrag(e){
    e.preventDefault();
    dragTarget.style.position = "absolute";
    dragTarget.style.left = (e.clientX - offsetX) + "px";
    dragTarget.style.top = (e.clientY - offsetY) + "px";
}

function closeDragElement(){
    document.onmouseup = null;
    document.onmousemove = null;
}

// Random support button
function showSupport(){
    if(notes.length === 0){
        alert("No notes yet, be the first to share 💛");
        return;
    }
    const rand = notes[Math.floor(Math.random()*notes.length)];
    alert(rand);
}
