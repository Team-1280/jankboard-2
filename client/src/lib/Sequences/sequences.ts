/* 
define various sequences to play out in this file
for example, we can define an initialization sequence that
plays out some series of notifications, and call it whenever we need it,
or a sequence to change the screen color and play some audio queues for a crash
*/

import { Notifications } from '../Notifications/notifications'
import getVoicePath from '../utils/getVoicePath'

export const initializationSequence = () => {
  Notifications.info('Jankboard initialized!', {
    withAudio: true,
    src: getVoicePath('jankboard-initialized', 'en'),
  })
  setTimeout(() => {
    Notifications.success('LittenOS is online.', {
      withAudio: true,
      src: getVoicePath('littenos-is-online', 'en'),
    })
    setTimeout(() => {
      Notifications.error('Breaching Monte Vista codebase.', {
        withAudio: true,
        src: getVoicePath('breaching-monte-vista', 'en'),
      })
    }, 3000)
  }, 3000)
}
