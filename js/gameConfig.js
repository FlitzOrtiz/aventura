// Configuración de recursos (imágenes y audios)
const resources = {
  // Rutas de imágenes de fondo
  backgrounds: {
    park: "assets/img/backgrounds/park_close.png",
    parkClose: "assets/img/backgrounds/park_close.png",
    end: "assets/img/backgrounds/sunset.png",
  },

  //actu

  // Rutas de audios
  audios: {
    lia_preocupada: "assets/audio/audios_rec/lia_preocupada.mp3",
    juan_dolor: "assets/audio/audios_rec/juan_pierna_lastimada.mp3",
    lia_pregunta1: "assets/audio/audios_rec/lia_pregunta1.mp3",
    juan_responde: "assets/audio/audios_rec/juan_le_duele.mp3",
    lia_pregunta2: "assets/audio/audios_rec/lia_pregunta2.mp3",
    lia_pregunta3: "assets/audio/audios_rec/lia_pregunta3.mp3",
    juan_invitacion: "assets/audio/audios_rec/juan_pregunta2.mp3",
    lia_pregunta4: "assets/audio/audios_rec/lia_pregunta4.mp3",
    correct: "assets/audio/correct_0.mp3",
    incorrect: "assets/audio/incorrect.mp3",
    lia_feedback_buena: "assets/audio/audios_rec/lia_buena_eleccion.mp3",
    lia_feedback_conversacion: "assets/audio/audios_rec/lia_conversacion.mp3",
    lia_feedback_triste: "assets/audio/audios_rec/lia_si.mp3",
    juan_ayuda: "assets/audio/audios_rec/juan_madre.mp3",
    juan_gracias: "assets/audio/juan_pregunta2.mp3",
    lia_buscar_ayuda: "assets/audio/audios_rec/lia_pregunta4.mp3",
    lia_que_decir: "assets/audio/lia_pregunta5.mp3",
    juan_jugar_columpios: "assets/audio/audios_rec/juan_pregunta2.mp3",
    lia_invita_jugar: "assets/audio/audios_rec/lia_pregunta5.mp3",
    juan_juego_favorito: "assets/audio/audios_rec/juan_pregunta3.mp3",
    lia_turno_hablar: "assets/audio/audios_rec/lia_pregunta6.mp3",
  },

  // Rutas de imágenes de personajes
  characters: {
    juan: "assets/img/characters/juan_parado_0.png",
    juanTriste: "assets/img/characters/juan_triste_0.png",
    juanPregunta: "assets/img/characters/juan_pregunta_0.png",
    juanHabla: "assets/img/characters/juan_habla_0.png",
    juanParado: "assets/img/characters/juan_parado_0.png",
    juanAdolorido: "assets/img/characters/juan_adolorido_0.png",
    userMasculino: "assets/img/characters/user_male_0.png",
    userMasculino_pregunta: "assets/img/characters/user_pregunta_male.png",
    userMasculino_habla: "assets/img/characters/user_habla_male.png",
    userFemenino: "assets/img/characters/user_female_0.png",
    userFemenino_pregunta: "assets/img/characters/user_pregunta_female.png",
    userFemenino_habla: "assets/img/characters/user_habla_female.png",
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
        audio: resources.audios.lia_preocupada,
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
            img: "assets/img/icons/ayuda.png", // <--- IMAGEN OPCIONAL
            feedback: {
              text: "¡Buena elección!",
              audio: resources.audios.lia_feedback_buena,
            },
          },
          {
            text: "Decir: ¡Qué divertido!",
            correct: false,
            img: "assets/img/icons/diversion.png",
          },
          {
            text: "Reírse",
            correct: false,
            img: "assets/img/icons/reirse.png",
          },
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
        adolorido: true,
        text: "Me duele un poco, pero creo que estoy bien.",
        audio: resources.audios.juan_responde,
      },
      {
        speaker: "Lía la Luciérnaga",
        adolorido: true,
        text: "Juan no parece estar bien. ¿Cómo crees que se siente Juan después de lastimarse la rodilla?",
        audio: resources.audios.lia_pregunta2,
        options: [
          {
            text: "Triste",
            correct: true,
            img: "assets/img/icons/triste.png",
            feedback: {
              text: "¡Sí! Se siente triste. A veces cuando algo nos duele, también nos ponemos tristes. ¿Qué podrías decirle para hacerlo sentir mejor?",
              audio: resources.audios.lia_pregunta3,
            },
          },
          {
            text: "Enojado",
            correct: false,
            img: "assets/img/icons/enojado.png",
          },
          { text: "Feliz", correct: false, img: "assets/img/icons/feliz.png" },
        ],
      },
      {
        speaker: "Lía la Luciérnaga",
        text: "¿Qué podrías decirle para hacerlo sentir mejor?",
        audio: resources.audios.lia_pregunta3,
        options: [
          {
            text: "¡Te lo mereces!",
            correct: false,
            img: "assets/img/icons/mal.png",
          },
          {
            text: "¿Quieres que te ayude?",
            correct: true,
            img: "assets/img/icons/ayuda.png",
          },
          {
            text: "¡Eso fue divertido!",
            correct: false,
            img: "assets/img/icons/diversion.png",
          },
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
        speaker: "Juan",
        adolorido: true,
        text: "Sí, por favor. ¿Puedes buscar a mi mamá que está aquí en el parque?",
        audio: resources.audios.juan_ayuda,
      },
      {
        speaker: "Lía la Luciérnaga",
        text: "¡Muy bien! Ahora vamos a buscar ayuda juntos. Pero antes... ¿Qué debes decir si alguien te ayuda?",
        audio: resources.audios.lia_pregunta4,
        options: [
          {
            text: "¡Gracias!",
            correct: true,
            img: "assets/img/icons/gracias.png",
          },
          {
            text: "¡Tarde!",
            correct: false,
            img: "assets/img/icons/tarde.png",
          },
          {
            text: "¡No quiero!",
            correct: false,
            img: "assets/img/icons/noquiero.png",
          },
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
          {
            text: "¡Sí, me encantaría!",
            correct: true,
            img: "assets/img/icons/si.png",
          },
          {
            text: "No me gusta estar contigo.",
            correct: false,
            img: "assets/img/icons/no.png",
          },
          {
            text: "(No decir nada)",
            correct: false,
            img: "assets/img/icons/silencio.png",
          },
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
            img: "assets/img/icons/tobogan.png",
            feedback: {
              text: "¡Muy bien! Así se mantiene una conversación.",
              audio: resources.audios.lia_feedback_conversacion,
            },
          },
          {
            text: "Ya no quiero hablar.",
            correct: false,
            img: "assets/img/icons/noquiero.png",
          },
          { text: "No sé.", correct: false, img: "assets/img/icons/nose.png" },
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
  points: 0,
};

// Estado del juego
const gameState = {
  currentScene: 0,
  currentDialog: 0,
};
