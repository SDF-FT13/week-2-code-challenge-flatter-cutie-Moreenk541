document.addEventListener('DOMContentLoaded', () => {
    const characterBar = document.getElementById('character-bar');
    const detailedInfo = document.getElementById("detailed-info");
    const voteCount = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    const characterForm = document.getElementById("character-form");
    const nameInput = document.getElementById("new-name");
    const imageUrlInput = document.getElementById("image-url");
    const sortButton = document.getElementById("sort-btn");
    
    let currentCharacter = null;

    // Fetch and display character names
    function fetchCharacters() {
        fetch('http://localhost:3000/characters')
            .then(res => res.json())
            .then(characters => {
                characterBar.innerHTML = "";
                characters.forEach(character => addCharacterToBar(character));
            });
    }
    fetchCharacters();

    // Add character name and delete button to the character bar
    function addCharacterToBar(character) {
        const container = document.createElement('div');
        container.classList.add('character-container');
        
        const span = document.createElement('span');
        span.textContent = character.name;
        span.classList.add('character-name');
        span.addEventListener("click", () => displayCharacterDetails(character));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "delete";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteCharacter(character.id, container);
        });

        container.appendChild(span);
        container.appendChild(deleteBtn);
        characterBar.appendChild(container);
    }

    // Display character details function
    function displayCharacterDetails(character) {
        currentCharacter = character;
        detailedInfo.querySelector('#name').textContent = character.name;
        const img = detailedInfo.querySelector('#image');
        img.src = character.image;
        img.alt = character.name;
        voteCount.textContent = character.votes;
    }

    // Handle voting submission
    votesForm.addEventListener('submit', event => {
        event.preventDefault();
        if (!currentCharacter) return;

        const addedVotes = parseInt(votesInput.value) || 0;
        currentCharacter.votes += addedVotes;
        updateVotes(currentCharacter.id, currentCharacter.votes);
        voteCount.textContent = currentCharacter.votes;
        votesInput.value = "";
    });

    function updateVotes(id, votes) {
        fetch(`http://localhost:3000/characters/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes })
        }).then(res => res.json());
    }

    // Reset votes button click
    resetButton.addEventListener("click", () => {
        if (currentCharacter) {
            currentCharacter.votes = 0;
            updateVotes(currentCharacter.id, 0);
            voteCount.textContent = 0;
        }
    });

    // Handle adding a new character
    characterForm.addEventListener('submit', event => {
        event.preventDefault();

        const newName = nameInput.value.trim();
        const newImage = imageUrlInput.value.trim();
        if (!newName || !newImage) return;

        const newCharacter = { name: newName, image: newImage, votes: 0 };

        fetch("http://localhost:3000/characters", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCharacter)
        })
        .then(response => response.json())
        .then(character => {
            addCharacterToBar(character);
            displayCharacterDetails(character);
            characterForm.reset();
        });
    });

    // Delete a character
    function deleteCharacter(id, element) {
        fetch(`http://localhost:3000/characters/${id}`, { method: "DELETE" })
        .then(() => {
            element.remove();
            if (currentCharacter?.id === id) {
                detailedInfo.innerHTML = "<p>Select a character</p>";
            }
        });
    }

    // Sort characters by votes
    sortButton.addEventListener("click", () => {
        fetch('http://localhost:3000/characters')
        .then(res => res.json())
        .then(characters => {
            const sorted = characters.sort((a, b) => b.votes - a.votes);
            characterBar.innerHTML = "";
            sorted.forEach(character => addCharacterToBar(character));
        });
    });
});
