// Iniciar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const inputName = document.getElementById("input-name");
  inputName.addEventListener("change", (e) => {
    gameConfig.userName = e.target.value.trim() || "Jugador";
    characterManager.setCharacterName("user", gameConfig.userName);
    console.log("Nombre de usuario actualizado:", gameConfig.userName);
  });

  const inputGender = document.getElementById("input-gender");
  inputGender.addEventListener("change", (e) => {
    gameConfig.gender = parseInt(e.target.value, 10);
    characterManager.setCharacterGender("user", gameConfig.gender);
    console.log("Género actualizado:", gameConfig.gender);
  });

  inputGender.addEventListener("change", (e) => {
    gameConfig.gender = parseInt(e.target.value, 10);
    characterManager.setCharacterGender("user", gameConfig.gender);
  });
  // Inicializar managers
  characterManager.init();
  uiManager.init();

  // Precargar audios
  audioManager.preloadAll();

  // Configurar nombre de usuario
  console.log("Nombre de usuario actualizado:", gameConfig.userName);

  // Crear estrellas decorativas
  createStars(15);
});

// Crear estrellas decorativas
function createStars(count) {
  const container = document.querySelector(".game-container");

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "stars";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(star);
  }
}
