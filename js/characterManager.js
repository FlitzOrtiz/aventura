class CharacterManager {
  constructor() {
    this.characterElements = {
      juan: {
        container: document.getElementById("juan-character"),
        image: document.getElementById("juan-img"),
        name: document.getElementById("juan-name"),
      },
      user: {
        container: document.getElementById("user-character"),
        image: document.getElementById("user-img"),
        name: document.getElementById("user-name"),
      },
      lia: {
        container: document.getElementById("lia-character"),
        image: document.getElementById("lia-img"),
        name: document.getElementById("lia-name"),
      },
    };
  }

  init() {
    // Configurar imágenes iniciales
    this.setCharacterImage("juan", resources.characters.juan);
    this.setCharacterImage("user", resources.characters.user);
    this.setCharacterImage("lia", resources.characters.lia);

    // Configurar nombre de usuario
    this.setCharacterName("user", gameConfig.userName);
  }

  setCharacterImage(characterId, imagePath) {
    if (this.characterElements[characterId]) {
      const imgElem = this.characterElements[characterId].image;
      console.log("elemento de imagen:", imgElem);
      if (!imgElem) {
        console.error(
          `No se encontró el elemento de imagen para ${characterId}`
        );
        return;
      }
      if (!imagePath) {
        console.error(
          `No se encontró la imagen para ${characterId}:`,
          imagePath
        );
        return;
      }
      console.log(`Setting image for ${characterId}: ${imagePath}`);
      imgElem.setAttribute("src", imagePath);
    }
  }

  setCharacterName(characterId, name) {
    if (this.characterElements[characterId]) {
      this.characterElements[characterId].name.textContent = name;
    }
  }

  showCharacter(characterId) {
    if (this.characterElements[characterId]) {
      const element = this.characterElements[characterId].container;
      element.style.opacity = "1";
      element.style.pointerEvents = "";
      element.style.transform = "translateY(0)";
      element.classList.add("character-entrance");
    }
  }

  hideCharacter(characterId) {
    if (this.characterElements[characterId]) {
      const element = this.characterElements[characterId].container;
      element.style.opacity = "0";
      element.style.pointerEvents = "none";
      element.style.transform = "translateY(30px)";
    }
  }

  displayNoneCharacter(characterId) {
    if (this.characterElements[characterId]) {
      const element = this.characterElements[characterId].container;
      element.style.display = "none";
    }
  }

  displayNormalCharacter(characterId) {
    if (this.characterElements[characterId]) {
      const element = this.characterElements[characterId].container;
      element.style.display = "";
    }
  }

  highlightCharacter(characterId) {
    if (this.characterElements[characterId]) {
      this.characterElements[characterId].container.classList.add("active");
    }
  }

  setCharacterGender(characterId, gender) {
    if (characterId === "user") {
      let imgSrc = resources.characters.userMasculino; // Por defecto
      console.log(`Género del usuario: ${gender}`);
      console.log(
        `Recursos de personajes:`,
        resources.characters.userMasculino
      );

      console.log(
        `Imagen de usuario masculino: ${
          gender === 1 && resources.characters.userMasculino
        }`
      );

      if (gender === 1 && resources.characters.userMasculino) {
        console.log("Usando imagen masculina");
        imgSrc = resources.characters.userMasculino;
      } else if (gender === 2 && resources.characters.userFemenino) {
        imgSrc = resources.characters.userFemenino;
      }
      this.setCharacterImage("user", imgSrc);
    }
  }

  unhighlightAllCharacters() {
    Object.keys(this.characterElements).forEach((charId) => {
      this.characterElements[charId].container.classList.remove("active");
    });
  }

  applyAnimation(characterId, animationName) {
    if (this.characterElements[characterId]) {
      const element = this.characterElements[characterId].container;
      element.classList.add(animationName);

      // Eliminar la animación después de que termine
      setTimeout(() => {
        element.classList.remove(animationName);
      }, 1200);
    }
  }
}

const characterManager = new CharacterManager();
