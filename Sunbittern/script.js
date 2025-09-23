const storyTextElement = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');

var Veggies = ['a turnip', 'an onion', 'a pepper','a piece of broccoli']; 
let pocketVeg = 0;

let call= new Audio("sounds/call.m4a"); // sound file
call.loop = true;

// Define your story nodes
const storyNodes = {
    start: {
        text: "The villagers have sent you into the rainforest to find their missing vegetables.",
        choices: [
            { text: "Continue", next: "second" },
            
        ]
    },
    second: {
        text: "After walking a while, you are deep within the forest. Odd sounds echo all around you. Suddenly, you spot something on the ground.",
        choices: [
            { text: "Investigate", next: "Investigate" },
            { text: "Keep Walking", next: "keepWalking" }
        ]
    },
    Investigate: {
        text:() => {
        const random = Math.floor(Math.random() * Veggies.length);   
        return "There's a " + Veggies[random] + " on the ground! Do you pick it up?";
        },
        choices: [
            { text: "Yes", next: "yesVeg" },
            { text: "No", next: "keepWalking" }
        ]
    },
    yesVeg:  {
        text: () => {
            return "You put the veggie in your pocket. You now have " + pocketVeg + " veggies.";
            },
            collectVeg: true,
        choices: [{ text: "That's enough vegetables! Let's get out of here.", next: "leaveForest" },
                    { text: "No, let's keep walking.", next: "keepWalking" }
        ]
    },

    keepWalking:  {
        text: () => {
            
            call.play();
            return "As you continue to walk, you hear a forlorn cry.";
        },
        choices: [
            { text: "Look for the source of the sound.", next: "lookSound" },
            { text: "Too spooky! Let's get out of here.", next: "leaveForest" }
        ]
    },
    lookSound:  {
        text: () => {
            
            call.play();
            return "Hmm... should you look up into the canopy, or down at the ground?";
        },
        choices: [
            { text: "Look down.", next: "Investigate" },
            { text: "Look up!", next: "nest" }
        ]
    },

    nest:  {
        text: "Up in the tree... is a nest made of vegetables? And oh god, it stinks... ",
        choices: [
            { text: "Take a veggie from the nest.", next: "flight" },
            { text: "Get outta there.", next: "leaveForest" }
        ]
    },

    flight:  {
        text: "As you approach the nest, a bird slowly flutters down to the ground in front of you. It looks enraged, but it's small, drab, and nonthreatening.",
        choices: [
            { text: "Time to bail!", next: "leaveForest" },
            { text: "No, the veggie is mine now!", next: "monster" }
        ]
    },

    monster:  {
        text: "You lunge at the bird. It flares up! Hissing, unfolding it's wings ... and shifting? Oh no. It's a horrifying monster!",
        
    },





    leaveForest: {
        text: () => {
        call.pause(); // stop forest music
        call.currentTime = 0;
        return "You exit the forest."
        },
        choices: [{ text: "Go to the village.", next: "inVillage" }]
    },

    inVillage: {
        text: () => {
            if (pocketVeg > 3) {
                return "The villagers are relieved by the return of their veggies. You are lauded as a local hero!";
            } 
            else if (pocketVeg > 0) {
                return "You've brought back a miniscule amount of vegetables, but at least you put in the effort. The villagers thank you."
            }
            else {
                return "The villagers are very disappointed. No veggies?! Where's your tenacity?";
            }
        },
        choices: [{ text: "Start Again", next: "start" }]
    }
};

let currentStoryNode = 'start';

function updateStory() {
    const node = storyNodes[currentStoryNode];
    storyTextElement.textContent = typeof node.text === 'function' ? node.text() : node.text;
    choicesContainer.innerHTML = ''; // Clear previous choices

    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice.next);
        choicesContainer.appendChild(button);
    });
}

function makeChoice(nextStoryNode) {
    const nextNode = storyNodes[nextStoryNode];
    if (nextNode.collectVeg) {
        pocketVeg++;
    }
    currentStoryNode = nextStoryNode;
    updateStory();
}

/*
function updateStory() {
    const node = storyNodes[currentStoryNode];
    storyTextElement.textContent = typeof node.text === 'function' ? node.text() : node.text;
    choicesContainer.innerHTML = ''; // Clear previous choices

    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice.next);
        choicesContainer.appendChild(button);
    });
}

function makeChoice(nextStoryNode) {
    const nextNode = storyNodes[nextStoryNode];
    if (nextNode.collectVeg) {
        pocketVeg++;
    }
    currentStoryNode = nextStoryNode;
    updateStory();
}

// Initialize the game
updateStory();
*/