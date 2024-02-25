import { toast } from 'svelte-french-toast'
import type { ToastOptions } from 'svelte-french-toast'
import InfoIcon from './InfoIcon.svelte'
import { Howl } from 'howler'
import WarnIcon from './WarnIcon.svelte'

interface NotificationOptions extends ToastOptions {
  withAudio?: boolean
  src?: string
}

// get colors from https://tailwindcss.com/docs/customizing-colors
export class Notifications {
  private static readonly defaultDuration = 3000

  public static success(message: string, options?: NotificationOptions) {
    if (options?.withAudio && !options.src)
      throw new Error('No audio source provided')

    const sendToast = (duration: number) => {
      toast.success(message, {
        style:
          'padding: 25px; font-size: 1.5rem; background-color: #15803d; color: #fafafa;',
        duration,
        ...options,
      })
    }

    if (options?.withAudio && options?.src) {
      let sound: Howl
      sound = new Howl({
        src: [options.src],
        preload: true,
        autoplay: true,
        onload: () => sendToast(sound.duration() * 1000),
      })
    } else {
      sendToast(this.defaultDuration)
    }
  }
  public static error(message: string, options?: NotificationOptions) {
    if (options?.withAudio && !options.src)
      throw new Error('No audio source provided')

    const sendToast = (duration: number) => {
      toast.error(message, {
        style:
          'padding: 25px; font-size: 1.5rem; background-color: #dc2626; color: #fafafa;',
        duration,
        ...options,
      })
    }

    if (options?.withAudio && options?.src) {
      let sound: Howl
      sound = new Howl({
        src: [options.src],
        preload: true,
        autoplay: true,
        onload: () => sendToast(sound.duration() * 1000),
      })
    } else {
      sendToast(this.defaultDuration)
    }
  }
  public static info(message: string, options?: NotificationOptions) {
    const sendToast = (duration: number) => {
      toast(message, {
        style: 'padding: 25px; font-size: 1.5rem;',
        icon: InfoIcon,
        duration,
        ...options,
      })
    }
    if (options?.withAudio && options?.src) {
      let sound: Howl
      sound = new Howl({
        src: [options.src],
        preload: true,
        autoplay: true,
        onload: () => sendToast(sound.duration() * 1000),
      })
    } else {
      sendToast(this.defaultDuration)
    }
  }
  public static warn(message: string, options?: NotificationOptions) {
    const sendToast = (duration: number) => {
      toast(message, {
        style:
          'padding: 25px; font-size: 1.5rem; background-color: #f59e0b; color: #fafafa;',
        icon: WarnIcon,
        duration,
        ...options,
      })
    }
    if (options?.withAudio && options?.src) {
      let sound: Howl
      sound = new Howl({
        src: [options.src],
        preload: true,
        autoplay: true,
        onload: () => sendToast(sound.duration() * 1000),
      })
    } else {
      sendToast(this.defaultDuration)
    }
  }
  public static playAudio(src: string) {
    new Howl({
      src: [src],
      preload: true,
      autoplay: true,
    })
  }
}
