class UIManager {
  constructor() {
    this.elements = {
      startScreen: document.getElementById("start-screen"),
      startButton: document.getElementById("start-button"),
      startMessage: document.getElementById("start-message"),
      previewUser: document.getElementById("preview-user"),
      previewJuan: document.getElementById("preview-juan"),
      previewLia: document.getElementById("preview-lia"),
      sceneBg: document.getElementById("scene-bg"),
      sceneTitle: document.getElementById("scene-title"),
      speakerName: document.getElementById("speaker-name"),
      speakerIcon: document.getElementById("speaker-icon"),
      dialogText: document.getElementById("dialog-text"),
      continuePrompt: document.getElementById("continue-prompt"),
      optionsContainer: document.getElementById("options-container"),
      progressBar: document.getElementById("progress"),
    };
  }

  init() {
    // Configurar imágenes de vista previa
    this.elements.previewUser.src =
      gameConfig.gender === 1
        ? resources.characters.userMasculino
        : resources.characters.userFemenino;
    this.elements.previewJuan.src = resources.characters.juan;
    this.elements.previewLia.src = resources.characters.lia;

    this.elements.previewUserName =
      document.getElementById("preview-user-name");
    this.elements.previewUserName.textContent = gameConfig.userName || "Tú";

    // Configurar eventos
    this.elements.startButton.addEventListener("click", () => {
      this.elements.startScreen.style.display = "none";
      sceneManager.loadScene(0);
    });

    this.dialogContainer = document.querySelector(".dialog-container");
    this.dialogContainer.addEventListener("click", () => {
      if (this.elements.continuePrompt.style.display === "block") {
        sceneManager.nextDialog();
      }
    });
  }

  updateBackground(backgroundPath) {
    this.elements.sceneBg.style.background = `url(${backgroundPath}) center/cover`;
  }

  updateSceneBackground(scene) {
    // Nuevo método para actualizar el fondo según la escena
    if (scene.background) {
      this.updateBackground(scene.background);
    }
  }

  updateDialog(dialog) {
    this.elements.speakerName.textContent = dialog.speaker;
    this.elements.dialogText.innerHTML = `<span class="dialog-text-container"><span class="typing-animation">${dialog.text}</span></span>`;

    // Cambiar ícono según el hablante
    if (dialog.speaker.includes("Juan")) {
      this.elements.speakerIcon.className = "fas fa-child";
    } else if (dialog.speaker.includes("Lía")) {
      this.elements.speakerIcon.className = "fas fa-fairy";
    } else if (dialog.speaker === "Narrador") {
      this.elements.speakerIcon.className = "fas fa-book-open";
    } else {
      this.elements.speakerIcon.className = "fas fa-user";
    }

    // Mostrar solo el personaje que habla
    // Ocultar todos primero
    characterManager.hideCharacter("juan");
    characterManager.hideCharacter("lia");
    characterManager.hideCharacter("user");
    // Mostrar el que corresponde
    if (dialog.speaker.includes("Juan")) {
      characterManager.showCharacter("juan");
    } else if (dialog.speaker.includes("Lía")) {
      characterManager.showCharacter("lia");
    } else if (dialog.speaker === gameConfig.userName) {
      characterManager.showCharacter("user");
    }
    // Si es narrador u otro, no muestra personajes
  }

  showOptions(options) {
    this.elements.continuePrompt.style.display = "none";
    this.elements.optionsContainer.style.display = "grid";
    this.elements.optionsContainer.innerHTML = "";

    options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "option-btn";
      button.textContent = option.text;
      button.addEventListener("click", () => {
        sceneManager.selectOption(option);
      });
      this.elements.optionsContainer.appendChild(button);
    });
  }

  hideOptions() {
    this.elements.continuePrompt.style.display = "block";
    this.elements.optionsContainer.style.display = "none";
  }

  disableOptions() {
    const buttons =
      this.elements.optionsContainer.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
      btn.disabled = true;
    });
  }

  highlightOption(option) {
    const buttons =
      this.elements.optionsContainer.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
      if (btn.textContent === option.text) {
        btn.classList.add(option.correct ? "correct" : "incorrect");
      }
    });
  }

  createBubbles(count) {
    const container = document.querySelector(".game-container");

    for (let i = 0; i < count; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.width = `${Math.random() * 40 + 20}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${Math.random() * 100}%`;
      bubble.style.background = `rgba(${Math.random() * 155 + 100}, ${
        Math.random() * 155 + 100
      }, 255, 0.4)`;
      bubble.style.animationDuration = `${Math.random() * 10 + 15}s`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(bubble);
    }
  }
}

const uiManager = new UIManager();
