let submit = document.querySelector(".submit");
let notesElem = document.querySelector(".notes");
let title = document.getElementById("title");
let desc = document.getElementById("desc");

// Now we will get(fetch) the saved values(notes) from the local storage
let notes = JSON.parse(localStorage.getItem("notes"));
if(notes){ // run the if condition if notes are present in local storage
    notes.forEach(element => {
        addNotes(element); // calling addNotes() function
    });
}

// creating a div in notes class and submitting notes
submit.addEventListener("click", (e)=>{
    e.preventDefault();
    addNotes();
})
function addNotes(obj) {
    let card = document.createElement("div"); // new notes will be created in this div and get saved in card variable
    card.classList.add("card"); 
    let titleVal = title.value;
    let descVal = desc.value;
    if(obj){ // run the if condition if object are present in local storage(notes are saved in ls in form of objects)
        titleVal = obj.title;
        descVal = obj.desc;
    }

    if(titleVal && descVal){ // This "if" condition will not allow to save notes with empty fields
        card.innerHTML =`<h3>${titleVal}</h3>
        <p>${descVal}</p>
        <button class="del">Delete</button>`;
        notesElem.appendChild(card); // Appending a div in notes class in which new notes will be saved as the card variable
        updateLs(); // calling the updateLs() function to save notes in the localstorage
    }

    // Selecting delete btn and adding an event on it
    let clear = card.querySelector(".del");
    clear.addEventListener("click", ()=>{
        card.remove();  // This will remove the card whose delete btn will be clicked
        updateLs(); // calling the updateLs() function to remove notes from the localstorage
    })
}

// This function will add notes in local storage
function updateLs(){
    let card = document.querySelectorAll(".card"); // This will select all the notes that are created 
    let arr = []; // We will push(store) all the selected notes in an empty array using forEach loop
    card.forEach(element => {
        arr.push({
            // Seleting title and description values
            title : element.children[0].innerText,
            desc : element.children[1].innerText,
        })
    });
    // Pushing array value in local storage
    localStorage.setItem("notes", JSON.stringify(arr));
}