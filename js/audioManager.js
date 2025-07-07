class AudioManager {
  constructor() {
    this.audioCache = {};
  }

  preloadAudio(audioPath) {
    if (!this.audioCache[audioPath]) {
      this.audioCache[audioPath] = new Audio(audioPath);
    }
  }

  play(audioPath) {
    if (!this.audioCache[audioPath]) {
      this.audioCache[audioPath] = new Audio(audioPath);
    }
    this.audioCache[audioPath].currentTime = 0;
    this.audioCache[audioPath]
      .play()
      .catch((e) => console.log("Audio play failed:", e));
  }

  stop(audioPath) {
    if (this.audioCache[audioPath]) {
      this.audioCache[audioPath].pause();
      this.audioCache[audioPath].currentTime = 0;
    }
  }

  preloadAll() {
    // Precargar todos los audios de la configuración
    Object.values(resources.audios).forEach((audioPath) => {
      this.preloadAudio(audioPath);
    });
  }
}

const audioManager = new AudioManager();
