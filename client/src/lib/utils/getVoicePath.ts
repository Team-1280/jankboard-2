import { get } from 'svelte/store'
import { settingsStore } from '../stores/settingsStore'

/**
 * Retrieves the voice audio path for the given audio file.
 *
 * @param audio - the id of the voice audio file requested (see the readout)
 * @param lang - the language of the audio
 * @return the path of the audio file
 */
type SupportedLanguage = 'en-US' | 'en-RU'

export default function getVoicePath(audio: string, lang?: SupportedLanguage) {
  console.log(get(settingsStore).voiceLang)
  if (!lang) {
    return `/static/voices/${get(settingsStore).voiceLang}/${audio}.wav`
  }

  return `/static/voices/${lang}/${audio}.wav`
}
