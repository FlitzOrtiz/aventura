class SceneManager {
  constructor() {
    this.currentScene = null;
    this.justRestarted = false;
  }

  loadScene(sceneIndex) {
    this.currentScene = scenesConfig[sceneIndex];

    this.justRestarted = true;

    // Actualizar elementos visuales
    uiManager.updateBackground(this.currentScene.background);

    // Resetear personajes
    characterManager.unhighlightAllCharacters();
    characterManager.hideCharacter("juan");
    characterManager.hideCharacter("user");
    characterManager.hideCharacter("lia");

    // Actualizar imágenes de personajes si es necesario
    if (this.currentScene.characterState) {
      if (this.currentScene.characterState.juan) {
        characterManager.setCharacterImage(
          "juan",
          this.currentScene.characterState.juan
        );
      }
    }

    // Ejecutar función onStart si existe
    if (this.currentScene.onStart) {
      this.currentScene.onStart();
    }

    // Mostrar personajes de la escena
    setTimeout(() => {
      this.currentScene.characters.forEach((char) => {
        characterManager.showCharacter(char);
      });
    }, 300);

    // Iniciar diálogos
    gameState.currentDialog = 0;
    this.showDialog();
  }

  showDialog() {
    const dialog = this.currentScene.dialogs[gameState.currentDialog];

    // Actualizar información del diálogo
    uiManager.updateDialog(dialog);

    // Resaltar el personaje que habla
    characterManager.unhighlightAllCharacters();

    console.log(`Mostrando diálogo: ${dialog.speaker} - ${dialog.text}`);

    console.log(`Escena: ${JSON.stringify(this.currentScene)}`);

    // Cambiar imagen según el tipo de diálogo y personaje
    if (dialog.speaker.includes("Juan")) {
      characterManager.highlightCharacter("juan");
      let imgSrc = resources.characters.juanParado;
      // Imagen de Juan adolorido si el diálogo tiene la propiedad 'adolorido'
      if (dialog.triste && resources.characters.juanTriste) {
        imgSrc = resources.characters.juanTriste;
      } else if (dialog.adolorido && resources.characters.juanAdolorido) {
        imgSrc = resources.characters.juanAdolorido;
      } else if (dialog.options) {
        imgSrc = resources.characters.juanPregunta || imgSrc;
      } else if (dialog.text && dialog.text.endsWith("?")) {
        imgSrc = resources.characters.juanPregunta || imgSrc;
      } else if (dialog.text) {
        imgSrc = resources.characters.juanHabla || imgSrc;
      }
      characterManager.setCharacterImage("juan", imgSrc);
    } else if (dialog.speaker.includes("Lía")) {
      characterManager.highlightCharacter("lia");
      let imgSrc = resources.characters.liaParada;
      if (dialog.options) {
        imgSrc = resources.characters.liaPregunta || imgSrc;
      } else if (dialog.text && dialog.text.endsWith("?")) {
        imgSrc = resources.characters.liaPregunta || imgSrc;
      } else if (dialog.text) {
        imgSrc = resources.characters.liaHabla || imgSrc;
      }
      characterManager.setCharacterImage("lia", imgSrc);
    } else {
      characterManager.highlightCharacter("user");
      let imgSrc = resources.characters.userParado;
      if (dialog.options) {
        imgSrc = resources.characters.userPregunta || imgSrc;
      } else if (dialog.text && dialog.text.endsWith("?")) {
        imgSrc = resources.characters.userPregunta || imgSrc;
      } else if (dialog.text) {
        imgSrc = resources.characters.userHabla || imgSrc;
      }
      characterManager.setCharacterImage("user", imgSrc);
    }

    // Manejar opciones
    if (dialog.options) {
      uiManager.showOptions(dialog.options);
    } else {
      uiManager.hideOptions();
    }

    // Reproducir audio
    audioManager.play(dialog.audio);
  }

  nextDialog() {
    if (this.justRestarted) {
      this.justRestarted = false;
      return;
    }
    if (gameState.currentDialog < this.currentScene.dialogs.length - 1) {
      gameState.currentDialog++;
      this.showDialog();
    } else {
      if (typeof this.currentScene.onComplete === "function") {
        this.currentScene.onComplete();
      } else {
        this.showEndScreen();
      }
    }
  }

  showEndScreen() {
    uiManager.updateBackground(resources.backgrounds.end);

    console.log("Mostrando pantalla final");

    // Ocultar personajes
    characterManager.displayNoneCharacter("juan");
    characterManager.displayNoneCharacter("user");
    characterManager.displayNoneCharacter("lia");

    // Mostrar mensaje final
    uiManager.elements.speakerName.textContent = "Lía la Luciérnaga";
    uiManager.elements.dialogText.innerHTML = `
        <div style="text-align: center; padding: 20px;">
          <img src="${resources.backgrounds.end}" alt="Escenario final" style="max-width: 100%; border-radius: 18px; margin-bottom: 24px; box-shadow: 0 4px 18px rgba(0,0,0,0.15);">
          <h2 style="color: #ff6b9c; margin-bottom: 20px; font-size: 32px;">¡Felicidades ${gameConfig.userName}!</h2>
          <p style="font-size: 24px; line-height: 1.6; color: #5a5a5a;">
            Hoy aprendimos a ayudar, preguntar cómo se siente alguien, 
            dar las gracias y conversar. ¡Eres un gran amigo/a!
          </p>
          <div style="margin-top: 40px;">
            <button id="restart-btn" style="background: #ff6b9c; color: white; border: none; 
              padding: 18px 50px; border-radius: 40px; font-size: 24px; 
              font-weight: bold; cursor: pointer; box-shadow: 0 6px 15px rgba(0,0,0,0.2);
              transition: all 0.3s;">
              <i class="fas fa-redo"></i> Jugar de Nuevo
            </button>
          </div>  
        </div>
      `;
    uiManager.elements.continuePrompt.style.display = "none";
    uiManager.elements.optionsContainer.style.display = "none";

    // Agregar evento al botón de reinicio
    document.getElementById("restart-btn").addEventListener("click", () => {
      characterManager.displayNormalCharacter("juan");
      characterManager.displayNormalCharacter("user");
      characterManager.displayNormalCharacter("lia");
      gameState.currentScene = 0;
      gameState.currentDialog = 0;
      this.loadScene(0);
    });
  }

  selectOption(option) {
    uiManager.disableOptions();
    uiManager.highlightOption(option);

    // Reproducir feedback de audio
    if (option.correct) {
      audioManager.play(resources.audios.correct);
    } else {
      audioManager.play(resources.audios.incorrect);
    }

    // Avanzar después de un retraso
    setTimeout(() => {
      this.nextDialog();
    }, 1500);
  }
}

const sceneManager = new SceneManager();
