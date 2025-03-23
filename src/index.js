// Your code here

document.addEventListener('DOMContentLoaded',() =>{
    const characterBar = document.getElementById('character-bar')
})

fetch('http://localhost:3000/characters')
.then(res => res.json())
.then(characters =>{
    characters.forEach(character=> addCharacter(character))

})

function addCharacter(character){
    const span = document.createElement('span')
    span .textContent = character.name;
    
}
