/* 
Define various sequences to play out in this file.
For example, we can define an initialization sequence that
plays out some series of notifications, and call it whenever we need it,
or a sequence to change the screen color and play some audio queues 
after a crash

These sequences should be self contained and not rely on any external state
so that they can be invoked from anywhere. In the event that you need some 
persistent variable (eg. a variable that saves whether or not a sequence has
already been played or a counter variable), add an entry to and use sequenceStore

Sequences should be either event-driven or periodic. In the case of periodic 
sequences, invoke them in the periodicSequence function 
*/

import { Notifications } from '../Notifications/notifications'
import { sequenceStore } from '../stores/sequenceStore'
import { settingsStore } from '../stores/settingsStore'
import { get } from 'svelte/store'
import getVoicePath from '../utils/getVoicePath'
import { tick } from 'svelte'

// await a "tick" (a svelte update frame) at the start of every sequence so that
// state is synced and no weird side effects occur

export const initializationSequence = async () => {
  await tick()
  Notifications.info('Jankboard initialized!', {
    withAudio: true,
    src: getVoicePath('jankboard-initialized', 'en'),
  })
  setTimeout(() => {
    if (get(settingsStore).goWoke) return
    Notifications.success('LittenOS is online', {
      withAudio: true,
      src: getVoicePath('littenos-is-online', 'en'),
    })
    setTimeout(() => {
      Notifications.warn('Breaching Monte Vista codebase', {
        withAudio: true,
        src: getVoicePath('breaching-monte-vista', 'en'),
      })
      setTimeout(() => {
        Notifications.playAudio(
          getVoicePath('hello-virtual-assistant', 'en'),
          () => {
            sequenceStore.update('initializationComplete', true)
            periodicSequence()
          }
        )
      }, 3000)
    }, 3000)
  }, 3000)
}

let counter = 1
/**
 * Special sequence that plays invokes itself periodically, started automatically
 * at the end of the initializationSequence
 *
 * @param seconds - the interval in seconds
 * @param callback - the function to call
 * @return void
 */
const periodicSequence = async () => {
  await tick()

  /**
   * Returns either true or false based on the provided probability
   *
   * @param probability - The probability value between 0 and 1
   * @return The result of the probability test
   */
  const chance = (probability: number) => {
    if (probability < 0 || probability > 1) {
      throw new Error('Probability must be between 0 and 1')
    }

    return Math.random() < probability * get(settingsStore).randomWeight
  }

  /**
   * Calls a callback function at regular intervals.
   *
   * @param seconds - the interval in seconds
   * @param callback - the function to call
   */
  const every = (seconds: number, callback: () => void) => {
    if (counter % seconds === 0) callback()
  }

  // add your periodic sequences here
  every(15, () => {
    if (chance(0.2)) breaching1323Sequence()
    else if (chance(0.2)) breaching254Sequence()
  })
  every(25, () => {
    if (chance(0.05)) bullyingRohanSequence()
    else if (chance(0.1)) bypassCoprocessorRestrictionsSequence()
  })

  // Dont touch
  counter++
  setTimeout(periodicSequence, 1000)
}
export const criticalFailureIminentSequence = async () => {
  await tick()
  Notifications.error('Critical robot failure imminent', {
    withAudio: true,
    src: getVoicePath('critical-robot-failure', 'en'),
  })
}

export const collisionDetectedSequence = async () => {
  await tick()
  Notifications.error('Collision detected', {
    withAudio: true,
    src: getVoicePath('collision-detected', 'en'),
  })
}

export const collisionImminentSequence = async () => {
  await tick()
  Notifications.error('Collision imminent', {
    withAudio: true,
    src: getVoicePath('collision-imminent', 'en'),
  })
}

export const cruiseControlEngagedSequence = async () => {
  if (get(settingsStore).disableAnnoyances) return
  await tick()
  Notifications.success('Cruise control engaged', {
    withAudio: true,
    src: getVoicePath('cruise-control-engaged', 'en'),
  })
}

export const retardSequence = async () => {
  if (get(settingsStore).goWoke) return
  await tick()
  Notifications.warn('Retard', {
    withAudio: true,
    src: getVoicePath('retard', 'en'),
  })
}

const breaching254Sequence = async () => {
  if (get(settingsStore).disableAnnoyances) return
  await tick()
  Notifications.warn('Breaching 254 mainframe', {
    withAudio: true,
    src: getVoicePath('breaching-254-mainframe', 'en'),
  })
}

const breaching1323Sequence = async () => {
  if (get(settingsStore).disableAnnoyances) return
  await tick()
  Notifications.warn('Breaching 1323 mainframe', {
    withAudio: true,
    src: getVoicePath('breaching-1323-mainframe', 'en'),
  })
}

const bullyingRohanSequence = async () => {
  if (get(settingsStore).disableAnnoyances) return
  await tick()
  Notifications.info('Bullying Rohan', {
    withAudio: true,
    src: getVoicePath('bullying-rohan', 'en'),
  })
}

export const userErrorDetectedSequence = async () => {
  await tick()
  Notifications.error('User error detected', {
    withAudio: true,
    src: getVoicePath('user-error-detected', 'en'),
  })
}

// hacky way to prevent duplicate infotainment bootups
let infotainmentStarted = false
export const infotainmentBootupSequence = async () => {
  if (
    get(sequenceStore).infotainmentStartedFirstTime ||
    get(settingsStore).disableAnnoyances ||
    infotainmentStarted
  )
    return

  infotainmentStarted = true
  await tick()

  const sequence = () => {
    Notifications.info('Infotainment system buffering', {
      withAudio: true,
      src: getVoicePath('infotainment-system-buffering', 'en'),
    })
    setTimeout(() => {
      Notifications.success('Infotainment system online', {
        withAudio: true,
        src: getVoicePath('infotainment-system-online', 'en'),
        onComplete: () => {
          sequenceStore.update('infotainmentStartedFirstTime', true)
        },
      })
    }, 3000)
  }

  if (!get(sequenceStore).initializationComplete) {
    const unsubscribe = sequenceStore.subscribe(data => {
      if (data.initializationComplete) {
        sequence()
        unsubscribe()
      }
    })
  } else {
    sequence()
  }
}

/**
 * Waits for the infotainment system to boot up before executing the given sequence.
 * Designed to be used by apps who want to play a bootup sequence but not overlap with the default one.
 * If it's already booted, the sequence will be executed immediately.
 *
 * @param sequence - The sequence to execute after infotainment bootup, or immediately it already booted.
 */
const waitForInfotainmentBootup = (sequence: () => void) => {
  if (!get(sequenceStore).infotainmentStartedFirstTime) {
    const unsubscribe = sequenceStore.subscribe(data => {
      if (data.infotainmentStartedFirstTime) {
        sequence()
        unsubscribe()
      }
    })
  } else {
    sequence()
  }
}

export const musicPlayerBootupSequence = async () => {
  if (
    get(sequenceStore).musicStartedFirstTime ||
    get(settingsStore).disableAnnoyances
  )
    return

  await tick()

  sequenceStore.update('musicStartedFirstTime', true)

  waitForInfotainmentBootup(() => {
    Notifications.info('Downloading copyrighted music...', {
      withAudio: true,
      src: getVoicePath('downloading-copyrighted-music', 'en'),
    })
  })
}

export const gbaEmulatorBootupSequence = async () => {
  if (
    get(sequenceStore).gbaEmulatorStartedFirstTime ||
    get(settingsStore).disableAnnoyances
  )
    return

  await tick()
  sequenceStore.update('gbaEmulatorStartedFirstTime', true)

  waitForInfotainmentBootup(() => {
    Notifications.info('Loading pirated Nintendo ROMs', {
      withAudio: true,
      src: getVoicePath('loading-pirated-nintendo', 'en'),
    })
  })
}

export const doomBootupSequence = async () => {
  if (
    get(sequenceStore).doomStartedFirstTime ||
    get(settingsStore).disableAnnoyances
  )
    return

  await tick()
  sequenceStore.update('doomStartedFirstTime', true)

  waitForInfotainmentBootup(() => {
    Notifications.success('Doom Engaged', {
      withAudio: true,
      src: getVoicePath('doom-engaged', 'en'),
    })
  })
}

const bypassCoprocessorRestrictionsSequence = async () => {
  if (get(settingsStore).disableAnnoyances) return
  await tick()
  Notifications.warn('Bypassing coprocessor restrictions', {
    withAudio: true,
    src: getVoicePath('bypassing-coprocessor-restrictions', 'en'),
  })
}
