// Configuración de recursos (imágenes y audios)
const resources = {
  // Rutas de imágenes de fondo
  backgrounds: {
    park: "assets/img/backgrounds/park.png",
    parkClose: "assets/img/backgrounds/park_close.png",
    end: "assets/img/backgrounds/sunset.jpg",
  },

  // Rutas de audios
  audios: {
    narrador_escena1: "assets/audio/narrador_escena1.mp3",
    juan_dolor: "assets/audio/juan_dolor.mp3",
    lia_pregunta1: "assets/audio/lia_pregunta1.mp3",
    juan_responde: "assets/audio/juan_responde.mp3",
    lia_pregunta2: "assets/audio/lia_pregunta2.mp3",
    lia_pregunta3: "assets/audio/lia_pregunta3.mp3",
    juan_invitacion: "assets/audio/juan_invitacion.mp3",
    lia_pregunta4: "assets/audio/lia_pregunta4.mp3",
    correct: "assets/audio/correct.mp3",
    incorrect: "assets/audio/incorrect.mp3",
    lia_feedback_buena: "assets/audio/lia_feedback_buena.mp3",
    lia_feedback_conversacion: "assets/audio/lia_feedback_conversacion.mp3",
    juan_ayuda: "assets/audio/juan_ayuda.mp3",
    juan_gracias: "assets/audio/juan_gracias.mp3",
    lia_buscar_ayuda: "assets/audio/lia_buscar_ayuda.mp3",
    lia_que_decir: "assets/audio/lia_que_decir.mp3",
    juan_jugar_columpios: "assets/audio/juan_jugar_columpios.mp3",
    lia_invita_jugar: "assets/audio/lia_invita_jugar.mp3",
    juan_juego_favorito: "assets/audio/juan_juego_favorito.mp3",
    lia_turno_hablar: "assets/audio/lia_turno_hablar.mp3",
  },

  // Rutas de imágenes de personajes
  characters: {
    juan: "assets/img/characters/juan_parado_0.png",
    juanTriste: "assets/img/characters/juan_triste_0.png",
    juanPregunta: "assets/img/characters/juan_pregunta_0.png",
    juanHabla: "assets/img/characters/juan_habla_0.png",
    juanParado: "assets/img/characters/juan_parado_0.png",
    juanAdolorido: "assets/img/characters/juan_adolorido_0.png",
    userMasculino: "assets/img/characters/user.png",
    userMasculino: "assets/img/characters/user_pregunta.png",
    userMasculino: "assets/img/characters/user_habla.png",
    userMasculino: "assets/img/characters/user.png",
    userFemenino: "assets/img/characters/user.png",
    userFemenino: "assets/img/characters/user_pregunta.png",
    userFemenino: "assets/img/characters/user_habla.png",
    userFemenino: "assets/img/characters/user.png",
    lia: "assets/img/characters/Lia_parada_0.png",
    liaPregunta: "assets/img/characters/Lia_pregunta_0.png",
    liaHabla: "assets/img/characters/Lia_habla_0.png",
    liaParada: "assets/img/characters/Lia_parada_0.png",
  },
};

// Definición de las escenas
const scenesConfig = [
  // ESCENA 1: EN EL PARQUE
  {
    id: 0,
    title: "En el Parque",
    background: resources.backgrounds.parkClose,
    characters: ["juan", "lia"],
    characterState: { juan: resources.characters.juanAdolorido },
    dialogs: [
      {
        speaker: "Lía la Luciérnaga",
        text: "¡Oh no! Juan se ha caído del tobogán. ¿Estará bien? Vamos a ver qué pasó.",
        audio: resources.audios.narrador_escena1,
      },
      {
        speaker: "Juan",
        adolorido: true,
        text: "Ay... me raspé la pierna...",
        audio: resources.audios.juan_dolor,
      },
      {
        speaker: "Lía la Luciérnaga",
        text: "¿Qué podrías hacer ahora? Escoge una opción:",
        audio: resources.audios.lia_pregunta1,
        options: [
          {
            text: "Preguntarle: ¿Estás bien, Juan?",
            correct: true,
            feedback: {
              text: "¡Buena elección!",
              audio: resources.audios.lia_feedback_buena,
            },
          },
          { text: "Decir: ¡Qué divertido!", correct: false },
          { text: "Reírse", correct: false },
        ],
      },
    ],
    onComplete: () => {
      gameState.currentScene = 1;
      gameState.currentDialog = 0;
      sceneManager.loadScene(gameState.currentScene);
    },
  },

  // ESCENA 2: JUAN RESPONDE
  {
    id: 1,
    title: "Ayudando a Juan",
    background: resources.backgrounds.parkClose,
    characters: ["juan", "user", "lia"],
    characterState: { juan: resources.characters.juanAdolorido },
    dialogs: [
      {
        speaker: "Juan",
        text: "Me duele un poco, pero creo que estoy bien.",
        audio: resources.audios.juan_responde,
      },
      {
        speaker: "Lía la Luciérnaga",
        text: "Juan parece triste. ¿Cómo crees que se siente?",
        audio: resources.audios.lia_pregunta2,
        options: [
          {
            text: "Triste",
            correct: true,
            feedback: {
              text: "¡Sí! Se siente triste. A veces cuando algo nos duele, también nos ponemos tristes. ¿Qué podrías decirle para hacerlo sentir mejor?",
              audio: resources.audios.lia_pregunta3,
            },
          },
          { text: "Enojado", correct: false },
          { text: "Feliz", correct: false },
        ],
      },
      {
        speaker: "Lía la Luciérnaga",
        text: "¿Qué podrías decirle para hacerlo sentir mejor?",
        audio: resources.audios.lia_pregunta3,
        options: [
          { text: "¡Te lo mereces!", correct: false },
          { text: "¿Quieres que te ayude?", correct: true },
          { text: "¡Eso fue divertido!", correct: false },
        ],
      },
    ],
    onComplete: () => {
      gameState.currentScene = 2;
      gameState.currentDialog = 0;
      sceneManager.loadScene(gameState.currentScene);
    },
  },

  // ESCENA 3: AYUDANDO A JUAN
  {
    id: 2,
    title: "Ayudando a Juan",
    background: resources.backgrounds.parkClose,
    characters: ["user", "juan", "lia"],
    characterState: { juan: resources.characters.juanAdolorido },
    dialogs: [
      {
        speaker: "Tú",
        text: "¿Quieres que te ayude, Juan?",
        audio: resources.audios.juan_ayuda,
      },
      {
        speaker: "Juan",
        text: "Sí, por favor. ¿Puedes buscar a mi mamá que está aquí en el parque?",
        audio: resources.audios.juan_ayuda,
      },
      {
        speaker: "Lía la Luciérnaga",
        text: "¡Muy bien! Ahora vamos a buscar ayuda juntos. Pero antes... ¿Qué debes decir si alguien te ayuda?",
        audio: resources.audios.lia_que_decir,
        options: [
          { text: "¡Gracias!", correct: true },
          { text: "¡Tarde!", correct: false },
          { text: "¡No quiero!", correct: false },
        ],
      },
    ],
    onComplete: () => {
      gameState.currentScene = 3;
      gameState.currentDialog = 0;
      sceneManager.loadScene(gameState.currentScene);
    },
  },

  // ESCENA 4: DESPUÉS DE LA CAÍDA
  {
    id: 3,
    title: "Después de la Caída",
    background: resources.backgrounds.parkClose,
    characters: ["juan", "user", "lia"],
    characterState: { juan: resources.characters.juan },
    dialogs: [
      {
        speaker: "Juan",
        text: "Gracias por ayudarme. ¿Quieres jugar conmigo en los columpios?",
        audio: resources.audios.juan_jugar_columpios,
      },
      {
        speaker: "Lía la Luciérnaga",
        text: "¡Qué buena idea! Juan te está invitando a jugar. ¿Qué le puedes responder?",
        audio: resources.audios.lia_invita_jugar,
        options: [
          { text: "¡Sí, me encantaría!", correct: true },
          { text: "No me gusta estar contigo.", correct: false },
          { text: "(No decir nada)", correct: false },
        ],
      },
    ],
    onComplete: () => {
      gameState.currentScene = 4;
      gameState.currentDialog = 0;
      sceneManager.loadScene(gameState.currentScene);
    },
  },

  // ESCENA 5: EN LOS COLUMPIOS
  {
    id: 4,
    title: "En los columpios",
    background: resources.backgrounds.park,
    characters: ["juan", "user", "lia"],
    characterState: { juan: resources.characters.juan },
    dialogs: [
      {
        speaker: "Juan",
        text: "¿Cuál es tu juego favorito en el parque?",
        audio: resources.audios.juan_juego_favorito,
      },
      {
        speaker: "Lía la Luciérnaga",
        text: "¡Es tu turno de hablar! Escoge una respuesta para mantener la conversación.",
        audio: resources.audios.lia_turno_hablar,
        options: [
          {
            text: "Me gusta el tobogán. ¿Y a ti?",
            correct: true,
            feedback: {
              text: "¡Muy bien! Así se mantiene una conversación.",
              audio: resources.audios.lia_feedback_conversacion,
            },
          },
          { text: "Ya no quiero hablar.", correct: false },
          { text: "No sé.", correct: false },
        ],
      },
    ],
    onComplete: () => {
      sceneManager.showEndScreen();
    },
  },
];

// Configuración del juego
const gameConfig = {
  userName: "Tú",
  gender: 1,
};

// Estado del juego
const gameState = {
  currentScene: 0,
  currentDialog: 0,
};
