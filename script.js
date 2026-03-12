let notes = []; // stores notes temporarily
let counter = 0;

function showWrite(){
  document.getElementById("writeSection").classList.toggle("hidden");
}

function postNote(){
  let text = document.getElementById("noteInput").value.trim();
  if(text.length < 2){
    alert("Write something first!");
    return;
  }

  // Save to local array (later, can send to Google Form)
  notes.push(text);
  counter++;
  document.getElementById("noteInput").value = "";
  document.getElementById("counter").innerText = `🌙 ${counter} stories shared`;

  createSticky(text);
}

function loadNotes(){
  // Clear wall
  const wall = document.getElementById("wall");
  wall.innerHTML = "";
  notes.forEach(text => createSticky(text));
}

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
