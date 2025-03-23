// Your code here

document.addEventListener('DOMContentLoaded',() =>{
    const characterBar = document.getElementById('character-bar')
    const detailedInfo = document.getElementById("detailed-info");
    const voteCount = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    const characterForm = document.getElementById("character-form");
    const nameInput = document.getElementById("new-name");
    const imageUrlInput = document.getElementById("image-url");
    
    let currentCharacter = null;

// Fetch and display character names fetch("/characters")
fetch('http://localhost:3000/characters')
.then(res => res.json())
.then(characters =>{
    characters.forEach(character=> addCharacterToBar(character))

})


// Add character name to the character bar function
function addCharacterToBar(character){
    const span = document.createElement('span')
    span .textContent = character.name;
    span.classList. add('character-name')
    span.addEventListener("click", () => displayCharacterDetails(character));
    characterBar.appendChild(span);

}

// Display character details function
})
