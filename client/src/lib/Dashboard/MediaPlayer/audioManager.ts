export class AudioManager {
  private audioContext: AudioContext | null = null
  private currentSource: AudioBufferSourceNode | null = null
  private currentBuffer: AudioBuffer | null = null // Stores the current audio buffer
  private startTime: number = 0 // When the current playback started
  private pauseTime: number = 0 // Track where we paused
  private currentToken: number = 0 // Unique token for each play request
  private isPaused: boolean = false

  constructor() {
    this.initAudioContext()
  }

  private async initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext()
    }
  }

  public async playAudio(url: string): Promise<void> {
    if (this.isPaused && this.currentBuffer) {
      // If paused, resume instead of reloading
      this.resume()
      return
    }

    this.pauseTime = 0 // Reset pause time for a new track
    const playToken = ++this.currentToken // Update the token for this request
    await this.initAudioContext()

    if (this.audioContext) {
      this.stopAudio() // Stop any currently playing audio

      try {
        const response = await fetch(url)
        const arrayBuffer = await response.arrayBuffer()
        if (this.currentToken !== playToken) {
          return // Abort if a newer request has been made
        }
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
        this.currentBuffer = audioBuffer // Save the buffer for potential pausing/resuming

        this.startPlayback(audioBuffer, 0) // Start playback from the beginning
      } catch (error) {
        console.error('Error playing audio:', error)
      }
    }
  }

  private startPlayback(buffer: AudioBuffer, offset: number) {
    const source = this.audioContext!.createBufferSource()
    source.buffer = buffer
    source.connect(this.audioContext!.destination)
    source.start(0, offset)
    this.startTime = this.audioContext!.currentTime - offset
    this.currentSource = source
    this.isPaused = false

    source.onended = () => {
      if (!this.isPaused) {
        this.currentBuffer = null // Clear the buffer if playback finishes normally
      }
    }
  }

  public pause() {
    if (!this.isPaused && this.currentSource && this.audioContext) {
      this.pauseTime = this.audioContext.currentTime - this.startTime
      this.currentSource.stop()
      this.isPaused = true
    }
  }

  public resume() {
    if (this.isPaused && this.currentBuffer) {
      this.startPlayback(this.currentBuffer, this.pauseTime)
    }
  }

  public stopAudio() {
    if (this.currentSource) {
      this.currentSource.stop()
      this.currentSource = null
      this.currentBuffer = null // Clear the current buffer
      this.isPaused = false
      this.pauseTime = 0
    }
  }
}

// Usage example:
const audioManager = new AudioManager()
const audioUrl = 'https://example.com/path/to/your/audio/file.mp3'

// To play the audio
audioManager.playAudio(audioUrl)

// To pause the audio
audioManager.pause()

// To resume the audio
audioManager.resume()
