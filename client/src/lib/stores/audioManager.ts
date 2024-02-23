export class AudioPlayer {
  private audio: HTMLAudioElement
  private currentUrl: string | null = null
  private isPlaying: boolean = false
  public length: number = 0

  constructor() {
    this.audio = new Audio()
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false
      const ended = new CustomEvent('ended', {
        detail: this.currentUrl,
        bubbles: true,
      })
      document.dispatchEvent(ended)
    })

    this.audio.onloadedmetadata = () => {
      this.length = this.audio.duration
    }
  }

  // Getter for playing state
  get playing(): boolean {
    return this.isPlaying
  }

  // Method to play audio from a URL
  play(url: string): void {
    this.audio.src = url
    this.currentUrl = url
    this.audio.play().catch(e => console.error('Error playing audio:', e))
    this.isPlaying = true
  }

  // Method to pause audio playback
  pause(): void {
    if (this.isPlaying) {
      this.audio.pause()
      this.isPlaying = false
    }
  }

  // Method to unpause (resume) audio playback
  unpause(): void {
    if (!this.isPlaying && this.currentUrl) {
      this.audio.play().catch(e => console.error('Error playing audio:', e))
      this.isPlaying = true
    }
  }
}
