export class AudioManager {
  private audioContext: AudioContext | null = null
  private currentSource: AudioBufferSourceNode | null = null
  private currentToken: number = 0 // Unique token for each play request
  private isPlaying: boolean = false // Track whether audio is playing

  constructor() {
    this.initAudioContext()
  }

  private async initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext()
    }
  }

  public async playAudio(url: string): Promise<void> {
    const playToken = ++this.currentToken // Update the token for this request
    await this.initAudioContext()

    if (this.audioContext) {
      this.stopAudio() // Stop any currently playing audio

      try {
        const response = await fetch(url)
        const arrayBuffer = await response.arrayBuffer()
        // Before decoding, check if the token has changed
        if (this.currentToken !== playToken) {
          return // Abort this operation if a new play request has been made
        }
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)

        const source = this.audioContext.createBufferSource()
        source.buffer = audioBuffer
        source.connect(this.audioContext.destination)

        // Again check the token before starting playback
        if (this.currentToken !== playToken) {
          return // Abort if a newer request has been made
        }

        source.start(0)
        this.currentSource = source
        this.isPlaying = true // Update the playing status

        // Set the playing status to false when the audio ends
        source.onended = () => {
          if (this.currentToken === playToken) {
            // Check to avoid race conditions
            this.isPlaying = false
          }
        }
      } catch (error) {
        console.error('Error playing audio:', error)
        this.isPlaying = false // Ensure status is accurate in case of error
      }
    }
  }

  public stopAudio() {
    if (this.currentSource) {
      this.currentSource.stop()
      this.currentSource = null
      this.isPlaying = false // Update the playing status
    }
  }

  // Method to check if audio is currently playing
  public isAudioPlaying(): boolean {
    return this.isPlaying
  }
}

// Usage example
const audioManager = new AudioManager()
console.log(audioManager.isAudioPlaying()) // False, initially

// To play audio
audioManager
  .playAudio('https://example.com/path/to/your/audio/file.mp3')
  .then(() => {
    console.log(audioManager.isAudioPlaying()) // Should log true when audio starts playing
  })

// Later, you can check if audio is still playing
setTimeout(() => {
  console.log(audioManager.isAudioPlaying()) // The result depends on the audio length and timing
}, 1000)
