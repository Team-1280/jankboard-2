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
        Notifications.playAudio(getVoicePath('hello-virtual-assistant', 'en'))
      }, 3000)
    }, 3000)
  }, 3000)
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

export const breaching254Sequence = async () => {
  if (get(settingsStore).disableAnnoyances) return
  await tick()
  Notifications.info('Breaching 254 mainframe', {
    withAudio: true,
    src: getVoicePath('breaching-254-mainframe', 'en'),
  })
}

export const breaching1323Sequence = async () => {
  if (get(settingsStore).disableAnnoyances) return
  await tick()
  Notifications.info('Breaching 1323 mainframe', {
    withAudio: true,
    src: getVoicePath('breaching-1323-mainframe', 'en'),
  })
}

export const bullyingRohanSequence = async () => {
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

export const infotainmentBootupSequence = async () => {
  if (
    get(sequenceStore).infotainmentStartedFirstTime ||
    get(settingsStore).disableAnnoyances
  )
    return

  await tick()

  sequenceStore.update('infotainmentStartedFirstTime', true)

  Notifications.info('Infotainment system buffering', {
    withAudio: true,
    src: getVoicePath('infotainment-system-buffering', 'en'),
  })
  setTimeout(() => {
    Notifications.success('Infotainment system online', {
      withAudio: true,
      src: getVoicePath('infotainment-system-online', 'en'),
    })
  }, 3000)
}

export const musicPlayerBootupSequence = async () => {
  if (
    get(sequenceStore).musicStartedFirstTime ||
    get(settingsStore).disableAnnoyances
  )
    return

  await tick()

  sequenceStore.update('musicStartedFirstTime', true)

  Notifications.info('Downloading copyrighted music...', {
    withAudio: true,
    src: getVoicePath('downloading-copyrighted-music', 'en'),
  })
}
