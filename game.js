// Twitch Monster Fighting Game for OBS Browser Plugin
// This code creates a game where a random monster appears on the screen, and Twitch chat can fight it using loyalty points.

const monsters = [
  { name: "Rathalos", health: 100, image: "rathalos.gif" },
  { name: "Orc", health: 200, image: "rathalos.gif" },
  { name: "Dragon", health: 500, image: "rathalos.gif" }
];

let currentMonster = null;
let monsterHealth = 0;
let monsterMaxHealth = 0;
const chatLog = [];

// Select a random monster
function spawnMonster() {
  currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
  monsterHealth = currentMonster.health;
  monsterMaxHealth = currentMonster.health;
  updateMonsterDisplay();
}

// Update the monster display in the browser plugin
function updateMonsterDisplay() {
  const monsterContainer = document.getElementById("monster-container");
  const healthBar = document.getElementById("health-bar");

  if (currentMonster) {
    monsterContainer.innerHTML = `
      <img src="images/${currentMonster.image}" alt="${currentMonster.name}" />
      <h2>${currentMonster.name}</h2>
    `;
    healthBar.style.width = `${(monsterHealth / monsterMaxHealth) * 100}%`;
  } else {
    monsterContainer.innerHTML = "<h2>No Monster</h2>";
    healthBar.style.width = "0%";
  }
}

// Handle chat command to fight the monster
function fightMonster(username, damage) {
  if (!currentMonster) {
    chatLog.push(`${username} tried to attack, but there was no monster!`);
    return;
  }

  monsterHealth -= damage;
  chatLog.push(`${username} dealt ${damage} damage to ${currentMonster.name}!`);

  if (monsterHealth <= 0) {
    chatLog.push(`${username} defeated the ${currentMonster.name}!`);
    currentMonster = null;
    monsterHealth = 0;
  }

  updateMonsterDisplay();
}

// Display chat log
function updateChatLog() {
  const chatLogContainer = document.getElementById("chat-log");
  chatLogContainer.innerHTML = chatLog.slice(-10).map(log => `<p>${log}</p>`).join("");
}

// Setup the page on load
window.onload = () => {
  spawnMonster();

  // Simulate chat commands (replace this with real Twitch chat integration)
  setInterval(() => {
    const randomDamage = Math.floor(Math.random() * 50) + 10;
    fightMonster("RandomUser", randomDamage);
    updateChatLog();
  }, 3000);
};