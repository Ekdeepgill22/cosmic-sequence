const correctOrder = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
let draggedItemId = null;

document.addEventListener("DOMContentLoaded", () => {
  // Shuffle planets on load
  shufflePlanets();

  // Enable drag for planets
  document.querySelectorAll(".planet").forEach(planet => {
    planet.addEventListener("dragstart", (e) => {
      draggedItemId = e.target.id;
    });
  });

  // Set up drop slots
  document.querySelectorAll(".drop-slot").forEach(slot => {
    slot.addEventListener("dragover", (e) => e.preventDefault());

    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedEl = document.getElementById(draggedItemId);
      const planetContainer = document.getElementById('planets');

      if (draggedEl) {
        // If slot already has a planet, return it to pool
        if (slot.firstChild) {
          planetContainer.appendChild(slot.firstChild);
        }
        slot.innerHTML = ""; // Optional: clears the slot
        slot.appendChild(draggedEl);
      }
    });
  });
});

function checkAnswer() {
  const slots = document.querySelectorAll('.drop-slot');
  let result = true;

  slots.forEach((slot, index) => {
    const planet = slot.firstChild;
    if (!planet || planet.id !== correctOrder[index]) {
      result = false;
    }
  });

  alert(result ? "✅ Correct! Well done." : "❌ Incorrect. Try again!");
}

function resetGame() {
  const planetContainer = document.getElementById('planets');
  const slots = document.querySelectorAll('.drop-slot');

  slots.forEach(slot => {
    if (slot.firstChild) {
      planetContainer.appendChild(slot.firstChild);
    }
  });

  shufflePlanets();
}

function showHint() {
  alert("Hint: My Very Educated Mother Just Served Us Noodles");
}

function shufflePlanets() {
  const container = document.getElementById('planets');
  const planets = Array.from(container.children);
  const shuffled = planets.sort(() => 0.5 - Math.random());
  container.innerHTML = "";
  shuffled.forEach(planet => container.appendChild(planet));
}
